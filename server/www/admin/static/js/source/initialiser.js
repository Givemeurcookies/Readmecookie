(function() {
	"use strict";

	// Get elements
	var addButt       = document.getElementsByClassName('add')[0],
		publishButts  = document.getElementsByClassName('publish')[0],
		menus         = document.getElementsByTagName('nav');
	// Attach events
	addButt.addEventListener('click', Editor.addPost);
	publishButts.addEventListener('click', Editor.publishPosts);

	console.log(sessionStorage.getItem("token"));

	for(var menukey in menus){
		var menu = menus[menukey];
		if (typeof menu === 'object'){
			var anchors = menu.getElementsByTagName('a');
			for(var anchorkey in anchors){
				var anchor = anchors[anchorkey];
				if (typeof anchor === 'object'){
					anchors[anchorkey].addEventListener('click', function(e){
						var structureName = this.hash.substring(1);
						PageManager.loadPage(structureName);
						e.preventDefault();
						return false;
					});
				}
			}
		}
	}
})();