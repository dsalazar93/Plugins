;(function($, undefined){
	"use strict";

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

			elems.buttons = $('<div>', {Class: 'buttons'}).appendTo(elems.container);

			elems.btnReset = $('<button>', {Class: 'btn btn-primary'})
								.html('Limpiar respuesta')
								.appendTo(elems.buttons)
								.on('click', function(){
												elems.ulLeft.find('.dropped').removeClass();
												elems.ulRight.find('.dropped')
															 .removeClass('dropped')
															 .data('reference', null)
															 .find('div').removeClass();
											 });

			elems.btnCheck = $('<button>', {Class: 'btn btn-success'})
								.html('Verificar respuesta')
								.appendTo(elems.buttons)
								.on('click', function(){
												var data = {};
												
												elems.ulRight.find('li').each(function(){
													var $this = $(this);
													data[$this.data('id')] = $this.data('reference');
												});

												if (options.onCheck)
													options.onCheck(data);
											 });

			options.drags.forEach(function(elem){
				var li = $('<li>', { Class: 'draggable'})
							.data('reference', elem.reference)
							.html('<div></div>' + elem.text);

				// Ordenar aleatoriamente
				if (Math.random() < 0.5)
					li.appendTo(elems.ulLeft);
				else
					li.prependTo(elems.ulLeft);

				li.find('div').addClass(elem.reference);

			});

			options.drops.forEach(function(elem){
				var li = $('<li>')							
							.html('<div></div><span>' + elem.text + '</span>')
							.data('id', elem.id)
							.droppable({
								hoverClass: "ui-drop-hover",
								over: function(evt, origin) {
									var $origin = $(origin.helper)
										,$this = $(this);

									if ($origin.hasClass('dropped')
											|| $this.hasClass('dropped')) return;

									$this.find('div')
										 .addClass($origin.data('reference'));

								},

								out: function(evt, origin) {
									var $origin = $(origin.helper)
										,$this = $(this);

									if ($origin.hasClass('dropped')
											|| $this.hasClass('dropped')) return;

									$this.find('div').removeClass();
								},

								drop: function(evt, origin) {
									var $origin = $(origin.helper)
										,$this = $(this);

									if ($origin.hasClass('dropped')
											|| $this.hasClass('dropped')) return;

									$origin.addClass('dropped');
									$this.addClass('dropped')
										 .data('reference', $origin.data('reference'));
								}
							});

				// Ordenar aleatoriamente
				if (Math.random() < 0.5)
					li.appendTo(elems.ulRight);
				else
					li.prependTo(elems.ulRight);


			});
		});
	}

})(jQuery);