var router = require('express').Router();
var http = require('http');
var url = require('url');
var crypto = require('crypto');
var os = require('os');

router.all('*', proxy);

module.exports = router;

//////////////

// Find out who's who in the zoo
var discoverOptions = {
  host: 'localhost',
  port: 7777,
  path: '/v1/discover/tsimon-local'
};

function getRandStr() {
	return crypto.randomBytes(20).toString('hex');
}

function getTimestamp() {
	return new Date(Date.now()).toISOString();
}

// marshal into a remnant friendly format
function headerToKeyVals(headers) {
	var keyVals = [];
	for (var key in headers) {
		keyVals.push({
			key: key,
			value: headers[key].toString()
		});
	}
	return keyVals;
}

function proxy(req, res) {
    var path = req.path;
	if (path[0] == '/') {
		path = path.substring(1);
	}

	console.log('Received request for: ' + path);

	var idx = path.indexOf('/');
	var service = path.substring(0, idx);
	var destinationPath = path.substring(idx);

	// for now, do service lookup on every request to catch new services
	// performance implications should be negligible in dev
	var discoveryJson = '';
	var discovery = {};
	http.get(discoverOptions, function(discoveryResp) {
		discoveryResp.on('data', function(chunk) {
			discoveryJson += chunk;
		}).on('error', function(e) {
			console.log("Error with discovery: " + e.message);
		}).on('end', function() {
			discovery = JSON.parse(discoveryJson);

			var location = discovery[service];
			if (location == null) {
				res.status(404).send('Could not discover service \'' + service + '\'');
				return;
			}

			var parsedLocation = url.parse(location);
			var host = parsedLocation.hostname;
			var port = parsedLocation.port;

			var span = null;
			var spanId = '-';
			if (discovery['remnant'] != null) {
				// remnant is a combined observability/logging framework
				// We use spans to trace our proxied call throughout the service network
				spanId = getRandStr();
				span = {
					traceId: spanId,
					id: spanId,
					host: os.hostname(),
					url: req.path,
					headers: headerToKeyVals(req.headers),
					method: req.method,
					parentId: spanId,
					clientStart: null,
					clientEnd: null,
					remoteStart: getTimestamp(),
					remoteEnd: '',
					responseCode: 0
				};
			}

			var proxyOptions = {
				host: host,
				port: port,
				path: destinationPath,
				method: req.method,
				headers: {
					"Remnant-Trace-Id": spanId,
					"Remnant-Span-Id": spanId,
					"Remnant-Parent-Span-Id": spanId
				}
			};

			var proxyResponse = '';
			var proxyReq = http.request(proxyOptions, function(proxyResp) {
				proxyResp.on('data', function(chunk) {
					proxyResponse += chunk;
				}).on('error', function(e) {
					res.status(400).send(e.message);
				}).on('end', function() {
					var remnantLocation = discovery['remnant'];
					if (remnantLocation != null) {
						// let the client know that we've profiled this request
						res.setHeader('Remnant-Trace-Id', spanId);

						// observability using remnant service
						span.remoteEnd = getTimestamp();
						span.responseCode = proxyResp.statusCode;
						var spanJson = JSON.stringify(span);

						parsedLocation = url.parse(remnantLocation);

						var remnantOpts = {
							host: parsedLocation.hostname,
							port: parsedLocation.port,
							path: '/v1/client-span',
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
								'Content-Length': spanJson.length
							}
						};

						// async post to create remnant span
						var remnantReq = http.request(remnantOpts, function (remnantResp) {
							remnantResp.on('data', function(chunk) {
								console.log('From remnant: ' + chunk);
							}).on('error', function(e) {
								console.log('Remnant error: ' + e);
							});
						});
						remnantReq.write(spanJson);
						remnantReq.end();
						
					}
					res.status(proxyResp.statusCode);
					res.send(proxyResponse);
				});
			});

			proxyReq.write(JSON.stringify(req.body));
			proxyReq.end();
		});
	});
}
