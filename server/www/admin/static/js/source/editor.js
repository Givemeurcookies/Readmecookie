/*
**
** Created by Jon Brede Skaug.
**
** Goal of this script is:
**	- Control and manage the posting system
**	- Post and prompt execution
**
*/

(function(window) {
	"use strict";

	var increment = 0,
		mainDiv   = document.getElementsByClassName('main')[0],
		postsDiv  = mainDiv.getElementsByClassName('posts')[0];


	var editor = {
		addPost : function(){
			// Get structure and add events
			var postStructure = Structure.getStructure('post');
			editor.addEvents(postStructure);

			// Set increment
			postStructure.id = increment;
			increment++;
			// Insert element to the document
			postsDiv.insertBefore(postStructure, postsDiv.getElementsByClassName('clear')[0]);

			// Animate
			Animate.css(postStructure, 'slideDown', null);
		},
		// In work
		addEvents : function(el){
			el.addEventListener('keydown',function(e){
				this.classList.add('changed');

				var defined = false;
				if (e.metaKey && e.keyCode === 66){
					console.log('Bold!');
					editor.doRichEditCommand('bold');
					defined = true;
				} else if (e.keyCode == 9) {
					// Tab key
					doRichEditCommand('indent');
					defined = true;
				}
				if (defined){
					e.preventDefault();
					e.stopPropagation();
				}
			});
		},
		// Not started
		publishPosts : function(){
			console.log('publishing posddd d!');
			editor.getChangedPosts();
		},
		// In work
		getChangedPosts : function(){
			console.log(mainDiv.getElementsByClassName('post changed'));
		},
		doRichEditCommand: function(aName, aArg){
			document.execCommand(aName,false, aArg);
		}
	};

	window.Editor = editor;

})(window);