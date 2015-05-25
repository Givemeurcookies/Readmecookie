/*
**
** Created by Jon Brede Skaug.
**
** Goal of script:
**		- Load webpages
**
*/

(function(window){
	"strict";

	var mainContainer = document.getElementsByClassName('main')[0];

	var pageManager = {
		loadHtml : function(name, options, callback){
			
			options = {
				controlboard : options.controlboard || false
			};

			// Cache
			if (Structure.patternExists(name) === true) {
				// The structure already exists
				console.log('Pattern already found: '+name);
				pageManager.appendHtml(name, options, callback);
			} else {
				// The structure does not exist, need to call AJAX
				ajax.ajax('json/'+name+'.json', function(){
					if (this.status == 200){
						console.log('Regisering pattern: '+name);
						Structure.addPattern(name, JSON.parse(this.response));
						pageManager.appendHtml(name, options, callback);

					} else {
						var status = this.status;
						switch(status){
							case 404:
								console.warn(name+' File not found');
							break;
							case 502:
								console.warn('Internal server error (Ajax)');
							break;
						}
					}
				});
			}
		},
		appendHtml  : function(name, options, callback){
			var htmlDom = Structure.getStructure(name);
			Animate.css(mainContainer, 'fadeOut', function(){
					mainContainer.innerHTML = null;
					mainContainer.appendChild(htmlDom);
					if (options.controlboard === false) {
						Animate.css(document.getElementsByClassName('control')[0],'fadeOut', function(el){
							el.style.display = 'none';
						});
					}
					callback();
			});
		},
		loadPage : function(name){
			if (name === 'statistics') {
				pageManager.loadHtml(name, {}, function(){
					var tLabels = [];
					for (var i = 31; i > 0; i--){
						tLabels.push({x:(i),y:(Math.round((Math.sin(i+1)*0.3+Math.random()+1)*1000))});
					}
					tLabels.reverse();
					console.log(document.getElementsByClassName("pageviews-chart")[0].getElementsByTagName('div')[0]);
					var graph = new Rickshaw.Graph({
						element: document.getElementsByClassName("pageviews-chart")[0].getElementsByTagName('div')[0],
						renderer: 'bar',
						series: [{
							data: tLabels,
							color: 'black'
						}]
					});
					var hoverDetail = new Rickshaw.Graph.HoverDetail( {
						graph: graph,
						xFormatter : function(x) { return x + " days ago"; },
						yFormatter : function(y) { return y + " views"; }
					});
					graph.render();
				});
			} else if (name === 'newfile'){
				pageManager.loadHtml(name, {}, function(){
					console.log('hi');
					document.getElementsByClassName('add')[0].addEventListener('click', Editor.addPost);
				});
			}
		}
	};

	window.PageManager = pageManager;

})(window);