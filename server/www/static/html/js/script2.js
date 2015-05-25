(function(window) {
	"use strict";
	var idIncrement = 0;

	var add   = document.getElementsByClassName('add')[0],
		main  = document.getElementsByClassName('main')[0],
		posts = document.getElementsByClassName('posts')[0];


	var yes       = document.getElementsByClassName('yes')[0],
		no        = document.getElementsByClassName('no')[0],
		prompt    = document.getElementsByClassName('prompt')[0],
		container = prompt.getElementsByClassName('container')[0],
		overlay   = document.getElementsByClassName('overlay')[0],
		question  = prompt.getElementsByClassName('question')[0];

	function addPost(){
		var uuid = idIncrement+1;
		// 
		var structure = toHTMLNodes([{
			type  : 'article',
			class : 'post',
			id    : uuid,
			children : [
				{
					type     : 'header',
					children : [
						{
							type : 'div',
							class: 'date'
						},
						{
							type : 'h2',
							editable : true,
						},
						{
							type : 'div',
							class: 'meta'
						}
					]
				},
				{
					type  : 'div',
					class : 'content',
					children : [{
						type : 'p',
						editable : true
					}]
				}
			]
		}]);
		structure[0].addEventListener('keydown',function(e){
			this.classList.add('changed');

			var defined = false;
			if (e.metaKey && e.keyCode === 66){
				console.log('Bold!');
				doRichEditCommand('bold');
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

		cssAnimate(structure[0], 'slideDown', null, true);
		structure[0].id = uuid;

		// Insert element to the document
		posts.insertBefore(structure[0], posts.getElementsByClassName('clear')[0]);

		// set idIncrement
		idIncrement = uuid;
	}
	// Element, 
	// type of animation, 
	// class to add after animation,
	// Should the animation be removed
	function cssAnimate (el, animation, finalClass, remove){
		var original = el.className, time = 0;
		if (typeof finalClass != 'string') finalClass = original;
		if (typeof time != 'string') time = '200';
		if (typeof remove != 'boolean') remove = false;

		if (animation === 'slideDown' || animation === 'slideUp') {
			time = 1000;
		} else if (animation === 'fadeOut'){
			time = 200;
		} else {
			console.warn("Animation failed, type of animation not found: "+animation);
			return false;
		}

		el.className = original+' '+animation;
		setTimeout(function(){
			if (remove) {
				console.log('should be removed');
				document.removeChild(el);
			} else {
				el.className = finalClass;
			}
		}, time);
		return true;
	}
	function toHTMLNodes(obj){
		var ToReturn = [];
		for(var key in obj){
			if (obj.hasOwnProperty(key)){
				var value = obj[key];
				if (typeof value === 'object'){
					// Defines type, this is obligatory
					if (typeof value.type !== 'undefined'){
						var repeat = value.repeat || 1;
						for(var i = 0; i < repeat; i++){
							var node = document.createElement(value.type);
							if (typeof value.class === 'string'){
								node.className = value.class;
							}
							if (typeof value.id === 'string'){
								node.id = value.id;
							}
							if (value.editable === true){
								node.contentEditable = "true";
							}
							if (typeof value.text === 'string'){
								node.innerHTML = value.text;
							}
							if (typeof value.children === 'array' || typeof value.children === 'object'){
								var children = toHTMLNodes(value.children);
								for(var objects in children){
									node.appendChild(children[objects]);
								}
							}
							if (repeat > 0) {
								ToReturn[ToReturn.length] = node;
							} else {
								ToReturn[key]= node;
							}
						}
					} else {
						console.warn('Invalid structure setup!');
					}
				}
			}
		}
		return ToReturn;
	}
	// Should be moved to it's own class
	function doRichEditCommand(aName, aArg){
		document.execCommand(aName,false, aArg);
	}

	function hasClass(element, cls) {
		return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
	}
	function publishPosts(){
		console.log('Publishing!');
	}
	function calculateElWidth(el){
		return el.offsetWidth;
	}
	function calculateElHeight(el){
		return el.offsetHeight;
	}
	function showPrompt(func, msg){
		
		var yes       = document.getElementsByClassName('yes')[0],
			no        = document.getElementsByClassName('no')[0],
			prompt    = document.getElementsByClassName('prompt')[0],
			container = prompt.getElementsByClassName('container')[0],
			overlay   = document.getElementsByClassName('overlay')[0],
			question  = prompt.getElementsByClassName('question')[0];

		// Add events
		no.addEventListener('click', function(){
			prompt.classList.remove('active');
			overlay.classList.remove('active');
		});
		yes.addEventListener('click', function(){
			func();
		});

		// Append message to prompt
		question.innerHTML = '';
		question.appendChild(msg);

		// Append events to generated content

		// Center prompt
		var elWidth  = calculateElWidth(prompt.getElementsByClassName('container')[0]),
			elHeight = calculateElHeight(prompt.getElementsByClassName('container')[0]);

		container.setAttribute('style', 'margin-top:-'+(elHeight/2)+'px'+'; margin-left:-'+(elWidth/2)+'px');

		// Show prompt
		prompt.classList.add('active');
		overlay.classList.add('active');


	}
	var publish = document.getElementsByClassName('publish')[0];
	publish.addEventListener('click', function(e){
		// Get changed elements
		showPrompt(publishPosts, toHTMLNodes([{
			type : 'p',
			text : 'Are you sure you want to publish the changes to these posts',
			children : [{
				type     :'ul',
				children : [
					{
						type:'li',
						children : [{
							type:'p',
							text:'Money keys'
						},
						{
							type  :'span',
							class :'revert',
							text  :'revert'
						}]
					}
				]
			}]
		}])[0]);
	});
	add.addEventListener("click", addPost);
	document.addEventListener('keydown', function(e){

		var defined = false;

		if (e.metaKey && e.keyCode === 83){
			console.log('Save!');
			doRichEditCommand('bold');
			defined = true;
		}

		if (defined){
			e.preventDefault();
			e.stopPropagation();
		}
	});
	Element.prototype.remove = function() {
		this.parentElement.removeChild(this);
	};
	NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
		for(var i = 0, len = this.length; i < len; i++) {
			if(this[i] && this[i].parentElement) {
				this[i].parentElement.removeChild(this[i]);
			}
		}
	};
}(window));