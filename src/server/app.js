/*jshint node:true*/
'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');
var port = process.env.PORT || 8001;
var four0four = require('./utils/404')();
var http = require('http');

var environment = process.env.NODE_ENV;

app.use(favicon(__dirname + '/favicon.ico'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use('/proxy/', require('./routes'));

console.log('Starting node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

switch (environment){
    case 'build':
        console.log('Starting BUILD server');
        app.use('/', express.static('./build/'));
        break;
    default:
        console.log('Starting DEV server');
        app.use(express.static('./src/client/'));
        app.use(express.static('./'));

        // Any invalid calls for templateUrls are under app/* and should return 404
        app.use('/app/*', function(req, res, next) {
            four0four.send404(req, res);
        });

        // should not use /static/
        app.use('/static/*', function(req, res, next) {
            four0four.send404(req, res);
        });

        app.use('/styles/', express.static('src/client/app/styles/'));
        app.use('/images/', express.static('src/client/app/images/'));
        break;
}

app.listen(port, function() {
    console.log('Express server listening on port ' + port);
    console.log('Serving from directory: ' + process.cwd());
});
