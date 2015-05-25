/*jslint node: true */
"use strict";
var Utils = {
	getTime : function(){
		var date = new Date();
		var time = {
			hours   : date.getHours(),
			minutes : date.getMinutes(),
			seconds : date.getSeconds()
		};

		// Populate object, temporary fix
		if (time.hours < 10) time.hours = '0'+time.hours;
		if (time.minutes < 10) time.minutes = '0'+time.minutes;
		if (time.seconds < 10) time.seconds = '0'+time.seconds;
		
		return '[\x1B[32m'+time.hours+':'+time.minutes+':'+time.seconds+'\x1B[0m'+']';
	},
	err    : function(msg){
		console.log(this.getTime()+' \x1B[31m'+msg+'\x1B[0m');
	},
	log    : function(msg){
		console.log(this.getTime()+' '+msg);
	},
	unserialize: function (query) {
		var pair, params = {};
		query = query.replace(/^\?/, '').split(/&/);
		for (pair in query) {
			pair = query[pair].split('=');
			params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
		}
		return params;
    }
};

module.exports = Utils;