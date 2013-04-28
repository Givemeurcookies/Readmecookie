// Just for fun
if (window.addEventListener) {
	// create the keys and konami variables
	var keys = [],
		konami = "38,38,40,40,37,39,37,39,66,65",
		login =  "37,40,39,38,37,38";

	// bind the keydown event to the Konami function
	window.addEventListener("keydown", function(e){
		// push the keycode to the 'keys' array
		keys.push(e.keyCode);
		if (keys.toString().indexOf(konami) >= 0) {
			alert('Konami');
			keys = []
		} else if(keys.toString().indexOf(login) >= 0) {
			alert("Login");
			keys = []
		}
	}, true);
};