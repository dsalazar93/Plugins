;(function($, undefined){
	"use strict";

	if (!$.popup) {
		alert('jQuery Popup is not defined');
		$.popup = function(){};
	}

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
			
			elems.ulLeft = $('<ul>').appendTo(elems.left).sortable({ revert: true });
			elems.ulRight = $('<ul>').appendTo(elems.right);

			options.drags.forEach(function(elem){
				var li = $('<li>', { Class: 'lnt-content-middle draggable'})  
							.appendTo(elems.ulLeft)
							.html(elem.text)
							.data('reference', elem.reference);
			});

			options.drops.forEach(function(elem){
				var li = $('<li>', { Class: 'lnt-content-middle'})
							.appendTo(elems.ulRight)
							.html('<div>' + elem.text + '</div>')
							.droppable({
								hoverClass: "ui-drop-hover",
								drop: function(evt, origin) {
									var $origin = $(origin.helper)
										,$this = $(this);

										$origin.clone()
											   .removeClass('draggable')
											   .removeClass('ui-sortable-helper')
											   .css({
													left : '1em',
													top: '1em',
													display: 'inline-block',
													width: 'auto',
													padding: '1em'
												})
											.appendTo($this)

										$origin.css('display', 'none');
								}
							})
			});

		});
	}

})(jQuery)