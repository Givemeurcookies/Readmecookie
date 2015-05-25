var Editor;
document.designMode = "on";
(function(window) {
	"use strict";
	var isScrollShown = false,
		scrollButton  = document.getElementsByClassName('scrollToTop')[0],
		previewButton = document.getElementsByClassName('post')[1],
		idmax = 10;
		

	window.onscroll = onScroll;
	var add  = document.getElementsByClassName('add')[0],
		main = document.getElementsByClassName('main')[0];

	function onScroll(ev){
		if(window.pageYOffset>200) {
			//if (!isScrollShown) 
				// Show button
		} else {
			//if (isScrollShown) 
				// Hide button
		}
	}

	function scrollToTop(){

	}
	function createUniqueID(){
		var tries = 0;
		while(true) {
			var number = Math.floor((Math.random()*idmax));
			if (document.getElementById(number) === null){
				// Available
				console.log('Found: '+number);
				console.log('Tries: '+tries);
				console.log('Now max: '+idmax);
				return number;
			} else {
				if (tries > 10){
					idmax *= 10;
				} else if (tries > 40) {
					return false;
				}
				tries++;
			}
		}
	}
	function addTextfield(){
		console.log('added!');
		var textArea   = document.createElement('div');
		textArea.className = 'mousetrap';
		textArea.addEventListener('click', function(){
		});

		var uniqueID = createUniqueID();
		var divs = createTags([
			'newDiv',
			'deleteBlockBtn'
		], 'div');

		divs.newDiv.appendChild(textArea);

		divs.newDiv.className = 'block text';
		textArea.id = uniqueID;
		main.insertBefore(divs.newDiv,add);
		jQuery('#'+uniqueID).hallo({
			plugins: {
				'halloformat': {}
			}
		});
	}
	function createTags(array, tag){
		var object = {};
		array.forEach(function(key){
			object[key] = document.createElement(tag);
		});
		return object;
	}
	function insertAtCursor(input, tag) {

		/*var textBeforeSelection = input.value.substr(0, pos.start),
			textSave = input.value.substr(pos.start, pos.end),
			textAfterSelection = input.value.substr(pos.end, input.value.length),
			posToSet;

		console.log('textBeforeSelection: '+textBeforeSelection);
		console.log('textSave: '+textSave);
		console.log('textAfterSelection: '+textAfterSelection);

		input.value = textBeforeSelection +'<'+tag+'>'+textSave+'</'+tag+'>'+ textAfterSelection;
		input.focus();

		if ((pos.start - pos.end) === 0){
			// If text is not selected set cursor to middle of tag
			posToSet = pos.start+2+tag.length+textSave.length;
		} else {
			// If text is selected set cursor to end of tag
			posToSet = pos.start+(2+tag.length)*2+textSave.length+1;
		}
		pos = {};
		console.log(pos);
		input.setSelectionRange(posToSet, posToSet);*/
	}
	function getBlocksHTML(){
		console.log('Getting!');
		var blocks = document.getElementsByClassName('block'), html = '';
		for (var i=0, max=blocks.length; i < max; i++) {
			var block = blocks[i];
			if (hasClass(block, 'text')){
				var value = block.getElementsByTagName('textarea')[0].value;
				if (value.length > 0) html += '<p>'+value+'</p>';
			} else if (hasClass(block, 'image')) {

			}
		}
		return html;
	}
	function hasClass(element, cls) {
		return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
	}

	function preview(){
		var html = '',
			title = document.body.getElementsByClassName('title')[0].getElementsByTagName('input')[0].value;

			html = getBlocksHTML();

		// HTML replaces does what?
		var template = getPreviewHTML(title, html);

		var newWindow = window.open("data:text/html," + encodeURIComponent(template),
									"_blank", "width=800,height=500");
		newWindow.focus();
	}

	function addBtnClick(){
		//add.className = 'add hidden';
		addTextfield();
	}
	add.addEventListener("click", addTextfield, false);/*
	previewButton.addEventListener('click', preview, false);

	Mousetrap.bind(['command+b', 'ctrl+b'], function(e) {
		editor.insertTag('b');
		return false;
	});
	Mousetrap.bind(['command+i', 'ctrl+i'], function(e) {
		editor.insertTag('i');
		return false;
	});
	Mousetrap.bind(['command+z', 'ctrl+z'], function(e) {
		editor.undo();
		return false;
	});
	Mousetrap.bind(['command+y', 'ctrl+y'], function(e) {
		editor.redo();
		return false;
	});
	Mousetrap.bind(['command+h', 'ctrl+h'], function(e) {
		editor.help();
		return false;
	});
	Mousetrap.bind(['shift 2'], function(e) {
		editor.insertTxt('"');
		return false;
	});*/
	Mousetrap.bind(['command+s'], function(e) {
		console.log(Editor);
		return false;
	});
}(window));
JQuery().hallo();