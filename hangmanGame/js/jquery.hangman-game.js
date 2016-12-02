;(function($, window, undefined){

	$.fn.hangmanGame = function(opts) {



var defaults = {
// // Compatibilidad con PageTransitions
// page: { setTimeout: function(callback, delay) { setTimeout(callback, delay); } },
}
var options = $.extend({}, defaults, opts);

//init: function

return this.each(function() {
			var $this = $(this);

			var elems = [];
			elems.container = $this.addClass('container lnt-dnd-container');
			elems.row = $('<div>', {Class: 'row'}).appendTo(elems.container);
			
			elems.left = $('<div>', { Class: 'col-md-3 lnt-dnd-left'}).appendTo(elems.row);
			elems.right = $('<div>', { Class: 'col-md-9 lnt-dnd-right'}).appendTo(elems.row);
			
			elems.ulLeft = $('<ul>').appendTo(elems.left).sortable({ revert: true });
			elems.ulRight = $('<ul>').appendTo(elems.right);

			elems.buttons = $('<div>', {Class: 'buttons'}).appendTo(elems.container);




		});
	}
})(jQuery, window);