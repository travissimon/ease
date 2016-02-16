var router = require('express').Router();
var http = require('http');
var url = require('url');

router.get('*', handleGet);

module.exports = router;

//////////////

// Find out who's who in the zoo
console.log('Loading goober service directory from localhost:7777/discover/tsimon-local');
var options = {
  host: 'localhost',
  port: 7777,
  path: '/discover/tsimon-local'
};

var discoveryJson = '';
var discovery = {};
http.get(options, function(resp) {
	resp.on('data', function(chunk) {
		discoveryJson += chunk;
	}).on('error', function(e) {
		console.log("Error with discovery: " + e.message);
	}).on('end', function() {
		discovery = JSON.parse(discoveryJson);
		console.log('Discover found: ');
		console.log(discovery);
	});
});

var alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
function getRandStr() {
}

function handleGet(req, res) {
    var path = req.path;
	if (path[0] == '/') {
		path = path.substring(1);
	}
	
	var idx = path.indexOf('/');
	var service = path.substring(0, idx);
	var destinationPath = path.substring(idx);

	var location = discovery[service];
	if (location == null) {
		res.status(404).send('Could not discover service: ' + service);
		return;
	}

	var parsedLocation = url.parse(location);
	var host = parsedLocation.hostname;
	var port = parsedLocation.port;
	console.log('proxy ' + service + ' -> host: ' + host + ', port: ' + port + ', path: ' + destinationPath);

	var options = {
		host: host,
		port: port,
		path: destinationPath
	};

	var response = '';
	http.get(options, function(resp) {
		resp.on('data', function(chunk) {
			response += chunk;
		}).on('error', function(e) {
			res.status(400).send(e.message);
		}).on('end', function() {
			res.send(response);
		});
	});

}
