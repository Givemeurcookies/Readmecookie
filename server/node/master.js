/* jslint node: true */
"use strict";
// Get the config files and utils
var config    = require('./undisclosed/config.js');

// If maintainance is going on we don't want to run the same code (for example let people access API)
if (config.maintainance.status === true) {
	var Utils = require('./disclosed/utils.js'),
		http      = require('http'),
		swig      = require('swig');

	var template = {
		down   : swig.compileFile('./_templates/down.template.html')
	};

	// MAIN
	http.createServer(function (request, response){
		Utils.log('Request (503) sent to: '+request.headers['x-forwarded-for']);
		response.writeHead(503, {'Content-Type': 'text/html'});
		response.write(template.down({
			'staticdomain' : config.www.static_host,
			'status' : config.maintainance.message
		}));
		response.end();
	}).listen(config.www.master_port, config.www.host);

	// API
	http.createServer(function (request, response) {
		response.writeHead(503, {'Content-Type': 'application/json'});
		response.end('API unavailable (Website under maintainance)');
	}).listen(config.www.api_port, config.www.host);
	Utils.log('Maintainance server running at http://'+config.www.host+':'+config.www.master_port+'/');
} else {
	var db           = require("mongojs").connect(config.db.url, config.db.collections),
		Utils        = require('./disclosed/utils.js'),
		http         = require('http'),
		swig         = require('swig'),
		path         = require('path'),
		crypto       = require('crypto'),
		userSessions = {};

	var	template = {
		main   : swig.compileFile('./_templates/main.template.html'),
		update : swig.compileFile('./_templates/update.template.html'),
	};

	// MAIN
	http.createServer(function (request, response) {
		var normalizedUrl = path.normalize(request.url),
			start = +new Date();
			
			if (normalizedUrl === '/'){
				db.posts.find(function(err, posts){
					if (!err){
						// Write headers
						response.writeHead(200, {'Content-Type': 'text/html'});

						// Write main content
						response.write(template.main({
							'posts'         : posts,
							'staticdomain'  : config.www.static_host,
							'apidomain'     : config.www.api_host
						}));

						// End request
						response.end();
						var end = +new Date();
						Utils.log('Request sent to: '+request.headers['X-Forwarded-For']+', execution time: '+(end-start)+'ms');
					} else
						gotError(response, err);
				});
			} else if (normalizedUrl === '/upload/')  {
				// We got a request for the HTML
				console.log(parseCookies(request));
				response.writeHead(200, {'Content-Type':'text/html'});
				response.end('Cookie is... '+parseCookies(request));
			} else if (normalizedUrl === '/setcookie/'){
				// To Write a Cookie
				response.writeHead(200, {
					'Set-Cookie': 'mycookie=test; Expires=Wed, 09 Jun 2021 10:18:14 GMT; Path=/',
					'Content-Type': 'text/plain'
				});
				response.end('Cookie set (I thinks)');
			} else {
				Utils.log('Nonsense request (404) sent to: '+request.headers['X-Forwarded-For']+', for: '+normalizedUrl);
				response.writeHead(404, {'Content-Type': 'text/html'});
				response.end("There's nothing here.");
			}
	}).listen(config.www.master_port, config.www.host);

	Utils.log('Master running at http://'+config.www.master_host+':'+config.www.master_port+'/');
}
function gotError(response, err){
	response.writeHead(503, {'Content-Type': 'text/html'});
	response.write('503: Service unavailable. <br> We have logged this error and it will be fixed soon.');
	Utils.err('Sent a 503 request, db got an error: '+err);
	response.end();
}
// Error

//
// Is this needed?
function parseCookies (request) {
	var list = {},
		rc = request.headers.cookie;

	rc && rc.split(';').forEach(function( cookie ) {
		var parts = cookie.split('=');
		list[parts.shift().trim()] = decodeURI(parts.join('='));
	});

	return list;
}