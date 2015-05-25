(function(w){
	"strict";

	// This will communicate and handle all connections
	var backend = {
		reportError : function(error){
			// Send error to server
			// Pass auth.
			// api.readmecookie.com/report/error
		}
	};

	var ajax = {
		upload : function(files){
			console.log('sending file');
			this.sendFile(files.files[0]);
		},
		ajax   : function(url, callback, method){
			method = method || 'get';


			var oReq = new XMLHttpRequest();
			oReq.open("POST", url, true);
			oReq.addEventListener('progress', null, false);
			//oReq.responseType = "arraybuffer";

			oReq.onload = callback;
				/*var arrayBuffer = oReq.response; // Note: not oReq.responseText
				if (arrayBuffer) {
					var byteArray = new Uint8Array(arrayBuffer);
					for (var i = 0; i < byteArray.byteLength; i++) {
						// do something with each byte in the array
					}
				}*/


			oReq.open(method, url, false);

			oReq.send(null);
		},
		sendFile : function(file) {
			var uri = "http://localhost:2444";
			var xhr = new XMLHttpRequest();
			var fd = new FormData();
			
			xhr.open("POST", uri, true);
			xhr.addEventListener('progress', this.updateProgress, false);
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4 && xhr.status == 200) {
					// Handle response.
					console.log('hi');
					alert(xhr.responseText); // handle response.
				}
			};
			fd.append('myFile', file);
			// Initiate a multipart/form-data upload
			xhr.send(fd);
		},
		updateProgress: function(e){
			console.log(e);
		}
	};


	w.ajax = ajax;
})(window);

(function(window){
	function utils(){


	}

	utils.prototype = {
		getEl : function(){
			return document.getElementsByClassName();
		}
	};


	window.Utils = utils;
})(window);
























