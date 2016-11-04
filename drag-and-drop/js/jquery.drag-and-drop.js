;(function($, undefined){

	$.fn.dragAndDrop = function(opts){

		var defaults = {}

		var options = $.extend({}, defaults, opts);

		return this.each(function(){
			var $this = $(this);

			var elems = [];
			elems.container = $this.addClass('container lnt-dnd-container');
			elems.row = $('<div>', {Class: 'row'}).appendTo(elems.container);
			elems.left = $('<div>', { Class: 'col-md-6 lnt-dnd-left'}).appendTo(elems.row);
			elems.right = $('<div>', { Class: 'col-md-6 lnt-dnd-right'}).appendTo(elems.row);
			elems.ulLeft = $('<ul>').appendTo(elems.left);
			elems.ulRight = $('<ul>').appendTo(elems.right);

			options.drags.forEach(function(elem){
				var li = $('<li>', { Class: 'lnt-content-middle'})
							.appendTo(elems.ulLeft)
							.html(elem.text)
							.data('reference', elem.reference)
							.draggable({ revert: true });
			});

			options.drops.forEach(function(elem){
				var li = $('<li>', { Class: 'lnt-content-middle'})
							.appendTo(elems.ulRight)
							.html('<div>' + elem.text + '</div>')
							.droppable({
								drop: function(evt, origin) {
									var $origin = $(origin.helper);

									if ($origin.data('reference') == elem.id) {
										$origin.remove();
									}
								}
							})
			});

		});
	}

})(jQuery)