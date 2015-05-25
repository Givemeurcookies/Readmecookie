/*
** Created by Jon Brede Skaug.
**
** Goal of script is to handle animations
**
*/
(function(window) {
	"use strict";

	var animate = {
		css : function(el, animation, callback, finalClass){
			var original = el.className, time = 0;
			if (typeof finalClass != 'string') finalClass = original;
			if (typeof time != 'string') time = '200';

			if (animation === 'slideDown' || animation === 'slideUp') {
				time = 1000;
			} else if (animation === 'fadeOut' || animation === 'fadeIn'){
				time = 200;
			} else {
				console.warn("Animation failed, type of animation not found: "+animation);
				return false;
			}

			el.className = original+' '+animation;
			setTimeout(function(){
				el.className = finalClass;
				if (typeof callback === 'function') {
					// Needs more work!	
					callback(el);
				}
			}, time);
			return true;
		}
	};
	window.Animate = animate;

})(window);