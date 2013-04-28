// Author: Jon Brede Skaug aka. MrGemeco
// The class conversion of form.js

(function(window, document) {
	"use strict";
	var Neko = function() {
		if ( Neko.prototype._singletonInstance ) {
			return Neko.prototype._singletonInstance;
		}
		Neko.prototype._singletonInstance = this;

		this.valForm = function() {
			var valid = true;
			for (var key in form)
			{
				var value = form[key].value;
				if (compareObjWithParam(key, value) === false) {
					form[key].className = "error";
					valid = false;
				} else if(form[key].className == "error") {
					form[key].className = "";
				}
			}
			return valid;
		}

		this.Ajax = function(callback){
			var xmlhttp;
			var params = "";
			var array = this.array;

			if (window.XMLHttpRequest) xmlhttp=new XMLHttpRequest();
			else xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");

			xmlhttp.onreadystatechange=function(){
				if (xmlhttp.readyState==4 && xmlhttp.status==200)
				{
					var JSONResponse = xmlhttp.responseText;
					var response = JSON.parse(JSONResponse);
					callback.call(response);
				}
			}
			for (var key in array) {
				params += key+"="+array[key].value+"&";
			}
			params = params.substring(0, params.length -1);

			xmlhttp.open("POST","php/updatePosts.php",true);
			xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
			xmlhttp.send(params);
		}

		this.checkIfParmIsSame = function(){
			
		}

		this.checkParm = function(array){

		}

		this.addClass = function(id, classname) {
			inputfield.className = "error";
			return true;
		}
		this.removeCLass = function(id, classname) {
			inputfield.className = "";
			return true;
		}
	}

	function insertPost(){
		var neko = new Neko;
		var form={
				"title":     document.getElementById("title"),
				"permalink": document.getElementById("permalink"),
				"content":   document.getElementById("content"),
				"category":  document.getElementById("category")
		};
		var NoErrors = valForm(form);
		if (NoErrors === true) {
			neko.Ajax(form);
		}
		if (response['status'] == 0){
			// Error handling
			// Case 62 = Duplicate
			// Add more cases here

			switch(response['error']) {
				case 62: addError(array["permalink"]); break;
			}
		} else {
			// If success
		}
		return false;
	}

	function getPosts() {}
	function login() {}
}(window, document));