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
				console.log('Pattern already found');
				pageManager.unNamed(name, options, callback);
			} else {
				// The structure does not exist, need to call AJAX
				ajax.ajax('json/'+name+'.json', function(){
					if (this.status == 200){
						console.log('Regisering pattern');
						Structure.addPattern(name, JSON.parse(this.response));
						pageManager.unNamed(name, options, callback);

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
		unNamed  : function(name, options, callback){
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
			pageManager.loadHtml(name, {}, function(){
				if (name === 'statistics') {

					var data = {
						labels : ["January","February","March","April","May","June","July"],
						datasets : [
							{
								fillColor : "rgba(0,0,0, 0.75)",
								strokeColor : "rgba(55, 55, 55, 1)",
								pointColor : "rgba(220,220,220,1)",
								pointStrokeColor : "#fff",
								data : [65,59,150,81,56,55,40]
							}
						]
					};
					var ctx = document.getElementsByClassName("pageviews-chart")[0].getElementsByTagName('canvas')[0].getContext("2d");
					var myNewChart = new Chart(ctx).Line(data, {
						scaleShowGridLines : false
					});
				}
			});
		}
	};

	window.PageManager = pageManager;

})(window);