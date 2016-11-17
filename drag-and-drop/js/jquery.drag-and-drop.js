;(function($, undefined){
	"use strict";

	if (!$.popup) {
		alert('jQuery Popup is not defined');
		$.popup = function(){};
	}

	$.fn.dragAndDrop = function(opts){

		var defaults = {}

		var options = $.extend({}, defaults, opts);

		var flag = true;

		return this.each(function(){
			var $this = $(this);

			var elems = [];
			elems.container = $this.addClass('container lnt-dnd-container');
			elems.row = $('<div>', {Class: 'row'}).appendTo(elems.container);
			
			elems.left = $('<div>', { Class: 'col-md-3 lnt-dnd-left'}).appendTo(elems.row);
			elems.right = $('<div>', { Class: 'col-md-9 lnt-dnd-right'}).appendTo(elems.row);
			
			elems.ulLeft = $('<ul>').appendTo(elems.left).sortable({ revert: flag });
			elems.ulRight = $('<ul>').appendTo(elems.right);

			options.drags.forEach(function(elem){
				var li = $('<li>', { Class: 'lnt-content-middle draggable'})  
							.appendTo(elems.ulLeft)
							.html(elem.text)
							.data('reference', elem.reference)
							// .draggable( {revert: true } );
														
			});

			options.drops.forEach(function(elem){
				var li = $('<li>', { Class: 'lnt-content-middle droppable'})
							.appendTo(elems.ulRight)
							.html('<div>' + elem.text + '</div>')
							.droppable({
								hoverClass: "ui-drop-hover",
								drop: function(evt, origin) {
									flag = false;
									var $origin = $(origin.helper)
										,$this = $(this);

										if ($origin.data('clone')) {
											$this.append($origin);
											return;
										}

										$origin.clone()
											   .draggable({ revert: true })
											   .removeClass('draggable')
											   .removeClass('ui-sortable-helper')
											   .addClass('lnt-css-drag')
											 //   .css({
												// 	left : '-142px',
												// 	top: '-11px',
												// 	display: 'inline-block',
												// 	width: '100%',	
												// 	position: 'absolute',
												// 	background: '#ccc',									
												// 	padding: '8px'

												// })
												.appendTo($this)
												.on('click', function() {
													$(this).remove();
														$origin.css('display', 'block');
												})
												.data('clone', true)

										$origin.css('display', 'none')



									// if ($origin.data('reference') == elem.id) {
									// 	$origin.remove();

									// 	if(elem.popupID)
									// 		$.popup({ id: elem.popupID});

									// 	if(elem.popuptext)
									// 		$.popup(elem.popuptext);
									// }

								}
							})


			});
		});
	}

})(jQuery)

//--------------------------------------------Revertir drag and drop--------------------------------------------------//
//http://devilmaycode.altervista.org/revert-a-jquery-draggable-object-back-to-its-original-container-on-out-event-of-d/
