var editor = (function(window){
	"use strict";
	var history = [],
		redoHistory = [];
	// Private
	var functions = {
		help : function(msg){
			console.log(msg);
		},
		insertTagAtSelection : function(tag){
			// We just get the active element first
			var active = document.activeElement;
			if (active.className === 'mousetrap'){
				var selection = functions.getSelection(),
					htmlToInsert = '',
					div       = {
						value : active.innerHTML
					};

				htmlToInsert = div.value;

				if (selection.end - selection.start <= 0){
					console.log('Empty selection!');
				} else {
					htmlToInsert = functions.insertTextAt(selection.start, div.value, '<b>');
					htmlToInsert = functions.insertTextAt(selection.end+3, htmlToInsert, '</b>');
					console.log(htmlToInsert);
				}
				//active.innerHTML = htmlToInsert;
			}
			/*functions.saveHistory();

			var sel = rangy.getSelection();
			console.log('selection:');
			console.log(sel);
			var value = input.innerHTML,
			posToSet,
			pos = {
				start : input.selectionStart,
				end   : input.selectionEnd
			};

			input.focus();

			if ((pos.start - pos.end) === 0){
				// If text is not selected set cursor to middle of tag
				posToSet = pos.start+2+tag.length;
			} else {
				// If text is selected set cursor to end of tag
				posToSet = pos.start+5+(tag.length*2)+(pos.end-pos.start);
			}

			var text;
			text = functions.insertTextAt(pos.end, value, '</'+tag+'>');
			text = functions.insertTextAt(pos.start, text, '<'+tag+'>');*/

			//input.innerHTML = text;

			//input.setSelectionRange(posToSet, posToSet);
		},
		insertTextAtSelection : function(tag){
			console.log('message');
			functions.saveHistory();
			var input = document.activeElement;
			var value = input.value,
			posToSet,
			pos = {
				start : input.selectionStart,
				end   : input.selectionEnd
			};

			input.focus();

			if ((pos.start - pos.end) === 0){
				// If text is not selected set cursor to middle of tag
				posToSet = pos.start+tag.length;
			} else {
				// If text is selected set cursor to end of tag
				posToSet = pos.start+(tag.length*2)+(pos.end-pos.start);
			}

			var text;
			text = functions.insertTextAt(pos.end, value, tag);
			text = functions.insertTextAt(pos.start, text, tag);

			input.value = text;

			input.setSelectionRange(posToSet, posToSet);
		},
		saveHistory          : function(){
			var input = document.activeElement;
			var theID = input.id;
			//console.log(theID);
			//console.log(input);
			if (typeof history[theID] === 'undefined') {
				history[theID] = [];
				history[theID].push(input);
			}
			console.log(history);
			if (history.length > 100) {
				history[theID].shift();
			}

			redoHistory[theID] = [];
			history[theID].push({
				'value'   : input.value,
				'cursor'  : {
					'start' : input.selectionStart,
					'end'   : input.selectionEnd
				}
			});
		},
		undoHistory        : function(){
			var input = document.activeElement;
			var theID = input.id;
			if (typeof history[theID] !== 'undefined'){
				var obj = history[theID].pop();
				if (typeof obj !== 'undefined'){
					console.log(obj);
					redoHistory[theID].push(obj);

					input.value = obj.value;
					input.setSelectionRange(obj.cursor.start, obj.cursor.end);
				}
			}
			console.log(history);
		},
		//Doesn't work properly yet!
		redoHistory          : function(){
			var obj = redoHistory.pop();

			if (typeof obj !== "undefined"){
				history.push(obj);

				var input = document.activeElement;
				input.value = obj.value;
				input.setSelectionRange(obj.cursor.start, obj.cursor.end);
			}
		},
		insertTextAt         : function(pos, text, toInsert){
			return [text.slice(0, pos), toInsert, text.slice(pos)].join('');
		},
		getSelection    : function(){
			var caretPos = window.getSelection().getRangeAt(0);
			console.log(caretPos);
			return {
				text  : caretPos.toString(),
				start : caretPos.startOffset,
				end   : caretPos.endOffset
			};
		}
	};

	// Public
	return {
		help      : functions.help,
		insertTag : functions.insertTagAtSelection,
		insertTxt : functions.insertTextAtSelection,
		undo      : functions.undoHistory,
		redo      : functions.redoHistory,
		save      : functions.saveHistory
	};
})(window);