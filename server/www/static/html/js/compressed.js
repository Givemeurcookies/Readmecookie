(function(w){"strict";var backend={reportError:function(error){}};var ajax={upload:function(files){console.log("sending file");this.sendFile(files.files[0])},ajax:function(url,callback,method){method=method||"get";var oReq=new XMLHttpRequest;oReq.open("POST",url,true);oReq.addEventListener("progress",null,false);oReq.onload=callback;oReq.open(method,url,false);oReq.send(null)},sendFile:function(file){var uri="http://localhost:2444";var xhr=new XMLHttpRequest;var fd=new FormData;xhr.open("POST",uri,true);xhr.addEventListener("progress",this.updateProgress,false);xhr.onreadystatechange=function(){if(xhr.readyState==4&&xhr.status==200){console.log("hi");alert(xhr.responseText)}};fd.append("myFile",file);xhr.send(fd)},updateProgress:function(e){console.log(e)}};w.ajax=ajax})(window);(function(window){function utils(){}utils.prototype={getEl:function(){return document.getElementsByClassName()}};window.Utils=utils})(window);(function(window){"use strict";var patterns={},structure;structure={getStructure:function(name,variables){var structureWanted=this.htmlNodes(patterns[name])[0];if(typeof structureWanted=="undefined"){console.warn('Structure "'+name+'" not found!');return false}else{var insert=structureWanted.getElementsByClassName("insert_here");if(insert.length===0){return structureWanted}else{var typeofVariables=typeof variables;if(typeofVariables==="undefined"){console.warn('Structure "'+name+'" demands variables but got none recieved');return false}else if(typeofVariables==="string"){}else if(typeofVariables==="object"){var nodes=this.htmlNodes(variables);for(var key in nodes){insert.appendChild(nodes[key])}}insert.classList.remove("insert_here")}return structureWanted}},addPattern:function(name,object){if(typeof object!=="object"){console.warn("Object is invalid or undefined: "+object)}if(typeof name!=="string"){console.warn("Name is invalid or undefined: "+name)}patterns[name]=object},patternExists:function(name){if(patterns.hasOwnProperty(name)){return true}return false},htmlNodes:function(obj){var ToReturn=[];for(var key in obj){if(obj.hasOwnProperty(key)){var value=obj[key];if(typeof value==="object"){if(typeof value.type!=="undefined"){var repeat=value.repeat||1;for(var i=0;i<repeat;i++){var node=document.createElement(value.type);if(typeof value.class==="string"){node.className=value.class}if(typeof value.id==="string"){node.id=value.id}if(value.editable===true){node.contentEditable="true"}if(typeof value.text==="string"){node.innerHTML=value.text}if(typeof value.height==="string"||typeof value.height==="number"){node.height=value.height}if(typeof value.width==="string"||typeof value.height==="number"){node.width=value.width}if(typeof value.children==="array"||typeof value.children==="object"){var children=this.htmlNodes(value.children);for(var objects in children){node.appendChild(children[objects])}}if(repeat>0){ToReturn[ToReturn.length]=node}else{ToReturn[key]=node}}}else{console.warn("Invalid structure setup!")}}}}return ToReturn}};window.Structure=structure})(window);Structure.addPattern("post",[{type:"article",class:"post",children:[{type:"header",children:[{type:"div",class:"date"},{type:"h2",editable:true},{type:"div",class:"meta"}]},{type:"div",class:"content",children:[{type:"p",editable:true}]}]}]);Structure.addPattern("prompt",[{type:"p",text:"Are you sure you want to publish the changes to these posts",children:[{type:"ul",children:[{type:"li",class:"insert_here",children:[{type:"p",text:"Money keys"},{type:"span",class:"revert",text:"revert"}]}]}]}]);(function(window){"use strict";var increment=0,mainDiv=document.getElementsByClassName("main")[0],postsDiv=mainDiv.getElementsByClassName("posts")[0];var editor={addPost:function(){var postStructure=Structure.getStructure("post");editor.addEvents(postStructure);postStructure.id=increment;increment++;postsDiv.insertBefore(postStructure,postsDiv.getElementsByClassName("clear")[0]);Animate.css(postStructure,"slideDown",null)},addEvents:function(el){el.addEventListener("keydown",function(e){this.classList.add("changed");var defined=false;if(e.metaKey&&e.keyCode===66){console.log("Bold!");editor.doRichEditCommand("bold");defined=true}else if(e.keyCode==9){doRichEditCommand("indent");defined=true}if(defined){e.preventDefault();e.stopPropagation()}})},publishPosts:function(){console.log("publishing posts!")},getChangedPosts:function(){console.log(mainDiv.getElementsByClassName("post changed"))},doRichEditCommand:function(aName,aArg){document.execCommand(aName,false,aArg)}};window.Editor=editor})(window);(function(window){"strict";var mainContainer=document.getElementsByClassName("main")[0];var pageManager={loadHtml:function(name,options,callback){options={controlboard:options.controlboard||false};if(Structure.patternExists(name)===true){console.log("Pattern already found");pageManager.unNamed(name,options,callback)}else{ajax.ajax("json/"+name+".json",function(){if(this.status==200){console.log("Regisering pattern");Structure.addPattern(name,JSON.parse(this.response));pageManager.unNamed(name,options,callback)}else{var status=this.status;switch(status){case 404:console.warn(name+" File not found");break;case 502:console.warn("Internal server error (Ajax)");break}}})}},unNamed:function(name,options,callback){var htmlDom=Structure.getStructure(name);Animate.css(mainContainer,"fadeOut",function(){mainContainer.innerHTML=null;mainContainer.appendChild(htmlDom);if(options.controlboard===false){Animate.css(document.getElementsByClassName("control")[0],"fadeOut",function(el){el.style.display="none"})}callback()})},loadPage:function(name){pageManager.loadHtml(name,{},function(){if(name==="statistics"){var data={labels:["January","February","March","April","May","June","July"],datasets:[{fillColor:"rgba(0,0,0, 0.75)",strokeColor:"rgba(55, 55, 55, 1)",pointColor:"rgba(220,220,220,1)",pointStrokeColor:"#fff",data:[65,59,150,81,56,55,40]}]};var ctx=document.getElementsByClassName("pageviews-chart")[0].getElementsByTagName("canvas")[0].getContext("2d");var myNewChart=new Chart(ctx).Line(data,{scaleShowGridLines:false})}})}};window.PageManager=pageManager})(window);(function(window){"use strict";var animate={css:function(el,animation,callback,finalClass){var original=el.className,time=0;if(typeof finalClass!="string")finalClass=original;if(typeof time!="string")time="200";if(animation==="slideDown"||animation==="slideUp"){time=1e3}else if(animation==="fadeOut"||animation==="fadeIn"){time=200}else{console.warn("Animation failed, type of animation not found: "+animation);return false}el.className=original+" "+animation;setTimeout(function(){el.className=finalClass;if(typeof callback==="function"){callback(el)}},time);return true}};window.Animate=animate})(window);(function(){"use strict";var addButt=document.getElementsByClassName("add")[0],publishButts=document.getElementsByClassName("publish")[0],menus=document.getElementsByTagName("nav");addButt.addEventListener("click",Editor.addPost);publishButts.addEventListener("click",Editor.getChangedPosts);for(var menukey in menus){var menu=menus[menukey];if(typeof menu==="object"){var anchors=menu.getElementsByTagName("a");for(var anchorkey in anchors){var anchor=anchors[anchorkey];if(typeof anchor==="object"){anchors[anchorkey].addEventListener("click",function(e){var structureName=this.hash.substring(1);PageManager.loadPage(structureName);e.preventDefault();return false})}}}}})();
//# sourceMappingURL=compressed.js.map