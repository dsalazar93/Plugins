;(function($, undefined) {
	"use strict";

	$.popup = function(opts) {
		if (typeof opts == 'string')
			opts = {content: opts};

		var defaults = {
			width: 800
		}

		var options = $.extend({}, defaults, opts);

		var elems = [];
		elems.popup = 	$('<div>', {Class: 'lnt-popup'}).appendTo( $('body') );
		elems.close = 	$('<div>', {Class: 'icon-cross'}).appendTo(elems.popup);
		elems.wrapper = $('<div>', {Class: 'lnt-popup-wrapper'}).appendTo(elems.popup);
		elems.content = $('<div>', {Class: 'lnt-popup-content'}).appendTo(elems.wrapper);

		elems.popup.on('click', function(){
			if (options.onClose) options.onClose(elems);
			elems.popup.remove();
		});

		elems.close.on('click', function(){
			if (options.onClose) options.onClose(elems);
			elems.popup.remove();
		});

		elems.wrapper.on('click', function(evt){
			evt.stopPropagation();
		}).css('width', options.width);

		if (options.youtubeID) {
			elems.content.css('padding', 0);
			elems.video = $('<div>', {Class: 'lnt-video'}).appendTo(elems.content);
			var src = 'https://www.youtube.com/embed/' + options.youtubeID + '?autoplay=1&amp;rel=0&amp;showinfo=0';
			var iframe = $('<iframe>', {width: '100%', height: '100%', src: src, allowfullscreen: true})
								.appendTo(elems.video);
		
		} else if (options.id) {
			elems.content.html( $('#' + options.id).html() );
			elems.popup.attr('id', options.id);

		} else if (options.content) {
			elems.content.html(options.content);
		}

		elems.wrapper.fadeIn(250);

		// Calling onLoad Function
		if (options.onLoad) options.onLoad(elems);

		$(window).keyup(function(evt){
			if (evt.which == 27) {
				if (options.onClose) options.onClose(elems);
				elems.popup.remove();
			}
		});
	}

})(jQuery)