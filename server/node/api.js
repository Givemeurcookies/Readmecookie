"use strict"
var config    = require('./undisclosed/config.js');

if (config.maintainance.status === true) {

} else {
	// API
	var db           = require("mongojs").connect(config.db.url, config.db.collections),
		Utils        = require('./disclosed/utils.js'),
		http         = require('http'),
		path         = require('path'),
		crypto       = require('crypto'),
		userSessions = {};

	// HTTP
	http.createServer(function (request, response) {
		Utils.log('Got an api request on: '+request.url);
		// Normalize URL
		var splitUrl = request.url.split('/');
		// Needs to be changed
		response.setHeader('Access-Control-Allow-Origin', '*');
		response.setHeader('Content-Type', 'application/json');
		response.setHeader('Allow', 'GET, HEAD');


		response.writeJSON = function(obj){
			response.write(JSON.stringify(obj));
		};
		response.sendError = function(errMsg, errCode){
			errCode = errCode || 400;
			response.writeHead(errCode);
			response.writeJSON({
				status : 0,
				err    : errMsg
			});
			response.end();
		} 
		if(splitUrl[1] == 'posts'){
			// Get posts
			if (request.method == 'GET' || request.method == 'HEAD') {
				// Find post
				if (typeof splitUrl[2] === 'string' && splitUrl[2] != ''){
					console.log('OK');
					db.posts.find(Utils.unserialize(splitUrl[2]), function(err, posts){
						if ( err || !posts || posts.length == 0){
							if (!posts || posts.length == 0) {
								response.sendError('No posts exist with those parameters', 404);
							} else {
								Utils.err('Database error: '+err);
								response.sendError('The database returned an error, this has been logged', 500);
							}
						} else {
							response.writeHead(200);
							// Why not populate an array?
							posts.forEach(function(post){
								Utils.log('Returned request: (OK) '+splitUrl[2]);
								if (request.method == 'GET') response.write(JSON.stringify(post));
							});
						}
						Utils.log('Returned request: '+splitUrl[2]+', posts:'+posts.length);
						response.end();
					});
				} else {
					response.sendError("The feature 'show all posts' is not implemented yet", 501);
				}
			} else if(request.method == 'POST' || request.method == 'PUT' || request.method == 'DELETE'){
				response.sendError('Method not allowed over http', 405)
			} else {
				// Method not allowed!
				response.sendError('Method not allowed', 405);
			}
		} else if (splitUrl[1] == 'auth'){
			response.sendError('Not allowed over http', 403)
		} else {
			Utils.log('Unknown request: '+splitUrl[1]);
			// Bad request
			response.sendError('Feature does not exist');
		}
	}).listen(config.www.api_port_http, config.www.api_host_http);
	// HTTPS
	http.createServer(function (request, response) {
		Utils.log('Got an api request on: '+request.url);
		// Normalize URL
		var splitUrl = request.url.split('/');
		// Needs to be changed
		response.setHeader('Access-Control-Allow-Origin', '*');
		response.setHeader('Content-Type', 'application/json');
		response.setHeader('Allow', 'GET, HEAD, POST, PUT');

		response.writeJSON = function(obj){
			response.write(JSON.stringify(obj));
		};
		response.sendError = function(errMsg, errCode){
			errCode = errCode || 400;
			response.writeHead(errCode);
			response.writeJSON({
				status : 0,
				err    : errMsg
			});
			response.end();
		} 
		if(splitUrl[1] == 'posts'){
			// Get posts
			if (request.method == 'GET' || request.method == 'HEAD') {
				// Find post
				if (typeof splitUrl[2] === 'string' && splitUrl[2] != ''){
					db.posts.find(Utils.unserialize(splitUrl[2]), function(err, posts){
						if ( err || !posts || posts.length == 0){
							if (!posts || posts.length == 0) {
								response.sendError('No posts exist with those parameters', 404);
							} else {
								Utils.err('Database error: '+err);
								response.sendError('The database returned an error, this has been logged', 500);
							}
						} else {

							// Why not populate an array?
							if (request.method == 'HEAD'){
								response.end();
							}
							var toWrite = [];
							posts.forEach(function(post){
								Utils.log('Returned request: (OK) '+splitUrl[2]);
								if (request.method == 'GET') toWrite.push(post);
								
								console.log(request.headers);
							});
							var expires = new Date(),
							 	now     = new Date();

							 	expires.setHours(expires.getHours()+1);

							var mostRecentDate = null;
							for (var i = 0, l = posts.length; i < l; i++){
								var postDate;
								if (posts[i].date.update === null) postDate = posts[i].date.post;
								else postDate = posts[i].date.update;

								if (i === 0) {
									mostRecentDate = new Date(postDate);
								} else {
									var date = new Date(postDate);
									if (mostRecentDate < date) mostRecentDate = date;
								}
							}
							console.log(mostRecentDate);

							if (request.headers['if-modified-since'] == mostRecentDate) {
								response.writeHead(304, {
									'Cache-Control'  : 'public, max-age=86400',
									'Last-Modified'  : mostRecentDate,
									'Expires'        : expires.toUTCString()
								});
							} else {
								var toWriteString = JSON.stringify(toWrite);
								response.writeHead(200, {
									'Content-Length' : toWriteString.length,
									'Cache-Control'  : 'public, max-age=86400',
									'Last-Modified'  : mostRecentDate,
									'Expires'        : expires.toUTCString()
								});
								response.write(toWriteString);
								/*db.author.findOne({ author: username }, function(err, res){
									if (err) return false;
									toWrite.author = res;
									response.write(JSON.stringify(toWrite));
									response.end();
								)};*/
							}
						}
						Utils.log('Returned request: '+splitUrl[2]+', posts:'+posts.length);
						response.end();
					});
				} else {
					db.posts.find({}, function(err, posts){
						if (err) {
							Utils.err('Database error: '+err);
							response.sendError('The database returned an error, this has been logged', 500);
						}
						var toWrite = [];
						posts.forEach(function(post){
							Utils.log('Returned request: (OK) '+splitUrl[2]);
							if (request.method == 'GET') toWrite.push(post);

						});
						var mostRecentDate = null;
						for (var i = 0, l = posts.length; i < l; i++){
							var postDate;
							if (posts[i].date.update === null) postDate = posts[i].date.post;
							else postDate = posts[i].date.update;
							if (i == 0) mostRecentDate = new Date(postDate);
							else {
								var date = new Date(postDate);
								if (mostRecentDate < date) mostRecentDate = date;
							}
						}
						var expires = new Date(),
						 	now     = new Date();

							expires.setHours(expires.getHours()+1);
						if (request.headers['if-modified-since'] == mostRecentDate) {
							response.writeHead(304, {
								'Cache-Control'  : 'public, max-age=86400',
								'Last-Modified'  : mostRecentDate,
								'Expires'        : expires.toUTCString()
							});
						} else {
							var toWriteString = JSON.stringify(toWrite);
							response.writeHead(200, {
								'Content-Length' : toWriteString.length,
								'Cache-Control'  : 'public, max-age=86400',
								'Last-Modified'  : mostRecentDate,
								'Expires'        : expires.toUTCString()
							});
							response.write(toWriteString);
							/*db.author.findOne({ author: username }, function(err, res){
								if (err) return false;
								toWrite.author = res;
								response.write(JSON.stringify(toWrite));
								response.end();
							)};*/
							
						}
						response.end();
					});
				}
			} else if(request.method == 'POST' || request.method == 'PUT' || request.method == 'DELETE'){
				request.content = '';
				request.on('data', function(chunk){
					request.content += chunk;
				});
				request.on('end', function(){
					// Do content check here pls
					console.log(typeof request.content);
					try {
						var dataObj = JSON.parse(request.content);

						// Check authorization of user
						console.log(dataObj);
						if (compareValues(userSessions, dataObj.token)) {
							if (request.method == 'POST') {
								// Post a new post
								// Should set a 201 header (Created)
								var date = new Date(),
									formattedDate = date.toUTCString();

								var user = getUser(userSessions, dataObj.token);
								console.log(splitUrl[2]);
								db.posts.insert({
									title    : dataObj.data[0].title,
									slug     : splitUrl[2].toLowerCase(),
									category : dataObj.data[0].category,
									version  : dataObj.data[0].version,
									date     : {
										post    : formattedDate,
										update  : formattedDate
									},
									author   : user,
									content : dataObj.data[0].content
								}, function(err){
									if (err) {
										response.writeHead(200);
										response.writeJSON({
											status : 0,
											err    : err
										});
									}
									response.end();
								});
								console.log(dataObj.data);
							} else if (request.method == 'PUT') {
								// Update an existing post
								// Should use a 200 header (OK)
								response.sendError('Feature not implemented yet', 501);
							} else if (request.method == 'DELETE') {
								// Delete an existing post
								// Should use a 204 header (No content)
								response.sendError('Feature not implemented yet', 501);
							}
						} else if (typeof dataObj.token === 'undefined') {
							// Token is not passed (Unprocessable entity)
							console.log(dataObj);
							response.sendError('Correct parameters not passed', 422);
						} else {
							// Token is invalid (Unauth)
							response.sendError('Token is invalid (login required)', 401);
						}
					} catch(e){
						Utils.log(e);
						response.sendError(e, 400);
					}
				});
			} else {
				// Method not allowed!
				response.sendError('Method not allowed', 405);
			}
		} else if (splitUrl[1] == 'auth'){
			// Renew token
			if (request.method == 'POST'){
				request.content = '';
				request.on('data', function(chunk){
					request.content += chunk;
				});
				request.on('end', function(){
					if (splitUrl[2] == 'renewToken') {
						// Feature not implemented!
						response.sendError('Feature not implemented yet', 501);

					} else if (splitUrl[2] == 'login') {
						// Authorization of users
						var userObj = JSON.parse(request.content);
						if (userObj.user === 'Neko' && userObj.pass === 'nigga') {
							// Hash password here
							// Create token
							crypto.randomBytes(64, function(ex, buf) {
								if (ex) throw ex;
								var token = buf.toString('base64');
								userSessions = {'Neko':token};
								response.writeJSON({
									status : 1,
									text   : 'Authenticated',
									token  : token
								});
								response.end();
							});
						} else {
							// Unauth
							response.sendError('Invalid username or not right parameters passed', 401);
						}
					} else if(splitUrl[2] == 'validateToken'){
						// Validate tokens
						var userObj = JSON.parse(request.content);
						if (compareValues(userSessions, userObj.token)){
							response.writeJSON({
								status : 1,
								text   : 'Token is valid'
							});
							response.end();
						} else {
							// Unauth
							response.sendError('Token is not valid', 401);					
						}
					} else {
						// Bad request
						response.sendError('Feature does not exist');
					}
				});
			} else {
				// Method not allowed
				response.sendError('Method not allowed', 405)
			}
		} else {
			Utils.log('Unknown request: '+splitUrl[1]);
			// Bad request
			response.sendError('Feature does not exist');
		}
	}).listen(config.www.api_port_https, config.www.api_host_https);

}

function compareValues (obj, valueToCompare){
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			if (obj[key] == valueToCompare) return true;
		}
	}
	return false;
}
function getUser (obj, valueToGet){
	for (var key in obj) {
		if(obj.hasOwnProperty(key)) {
			if (obj[key] == valueToGet) return key;
		}
	}
}







