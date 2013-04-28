// Author: Jon Brede Skaug aka. MrGemeco
// Pretty ugly code right now, currently porting it to a class

// Parameters is (can only have one): 
	// b - blank
	// e - epost
	// p - url/permalink
	var param = {
		"title":"b",
		"permalink":"b",
		"content":"b"
	}

	function sendForm(){
		var form={
			"title":document.getElementById("title"),
			"permalink":document.getElementById("permalink"),
			"content":document.getElementById("content"),
			"category":document.getElementById("category")
		};
		var NoErrors = valForm(form);
		if (NoErrors === true) {
			sendAjax(form);
		}
		return false;
	}

	function valForm(form){
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
	function addError(inputfield){
		inputfield.className = "error";
	}

	// Does NOT overwrite!
	function insertAfter(elemid, textcont) {
		var text = document.createElement("span");
		text.innerHTML = textcont;
		var reference = document.getElementById(elemid);
		reference.parentNode.insertBefore(text, reference.nextSibling);
	}

	function sendAjax(array)
	{
		var xmlhttp;
		var params = "";
		if (window.XMLHttpRequest) xmlhttp=new XMLHttpRequest();
		else xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");

		xmlhttp.onreadystatechange=function(){
			if (xmlhttp.readyState==4)
			{
				if(xmlhttp.status==200) {
					var JSONResponse=xmlhttp.responseText;
					var response = JSON.parse(JSONResponse);
					if (response['status'] == 0){
						// Error handling... Should be returned instead
						switch(response['error']) {
							case 62: addError(array["permalink"]); break;
						}
						insertAfter("thesubmit", "NOT OKAY :(");
					} else {
						// ID, TEXT
						insertAfter("thesubmit", "OK!");
					}
				} else insertAfter("thesubmit", "Blergh, seems like a server error :( Error returned: "+xmlhttp.status);
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
	// If this function returns false, it becomes an error on the valForm
	function compareObjWithParam(key, value) {
		if(key in param) {
			switch (param[key]) {
				case "b": if (value.length != 0) return true;
					break;
				case "p":
					break;
				case "e":
					break;
			}
		} else return true;
		return false;
	}