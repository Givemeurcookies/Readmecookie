/*
// Structures:
/*
//
// 'post'  => No variables
// 'prompt' => One var: li's to add.
// 
*/

(function(window) {
	"use strict";
	var patterns = {}, structure;

	structure = {
		getStructure : function(name, variables){
			var structureWanted = this.htmlNodes(patterns[name])[0];

			if (typeof structureWanted == 'undefined') {
				console.warn('Structure "'+name+'" not found!');
				return false;
			} else {
				var insert = structureWanted.getElementsByClassName('insert_here');
				if (insert.length === 0){
					return structureWanted;
				} else {
					var typeofVariables = typeof variables;
					if (typeofVariables === 'undefined'){
						console.warn('Structure "'+name+'" demands variables but got none recieved');
						return false;
					} else if (typeofVariables === 'string'){
						// Work here later

					} else if (typeofVariables === 'object') {
						var nodes = this.htmlNodes(variables);
						for (var key in nodes){
							insert.appendChild(nodes[key]);
						}
					}
					insert.classList.remove('insert_here');
				}
				return structureWanted;
			}
		},
		addPattern : function(name, object){
			if(typeof object !== 'object') { console.warn('Object is invalid or undefined: '+object); }
			if(typeof name !== 'string') { console.warn('Name is invalid or undefined: '+name); }
			patterns[name] = object;
		},
		patternExists : function(name) {
			if(patterns.hasOwnProperty(name)){
				return true;
			}
			return false;
		},
		htmlNodes    : function(obj){
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
								if (typeof value.height === 'string' || typeof value.height === 'number'){
									node.height = value.height;
								}
								if (typeof value.width === 'string' || typeof value.height === 'number'){
									node.width  = value.width;
								}
								if (typeof value.children === 'array' || typeof value.children === 'object'){
									var children = this.htmlNodes(value.children);
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


	};

	window.Structure = structure;
})(window);

// Precompile common templates
Structure.addPattern('post', [{
	type  : 'article',
	class : 'post',
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
Structure.addPattern('prompt', [{
	type : 'p',
	text : 'Are you sure you want to publish the changes to these posts',
	children : [{
		type     :'ul',
		children : [
			{
				type:'li',
				class: 'insert_here',
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
}]);












