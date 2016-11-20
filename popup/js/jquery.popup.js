;(function($, undefined) {
	"use strict";

	$(window).keyup(function(evt){
		if (evt.which == 27) {
			$('.lnt-popup').remove();
		}
	});

	$.popup = function(opts) {

		if (typeof opts == 'string')
			opts = {content: opts};

		var defaults = {}

		var options = $.extend({}, defaults, opts);

		var elems = [];
		elems.popup = 	$('<div>', {Class: 'lnt-popup'}).appendTo( $('body') );
		elems.wrapper = $('<div>', {Class: 'lnt-popup-wrapper'}).appendTo(elems.popup);
		elems.close = 	$('<div>', {Class: 'icon-cross'}).appendTo(elems.wrapper);
		elems.content = $('<div>', {Class: 'lnt-popup-content'}).appendTo(elems.wrapper);

		elems.popup.on('click', function(){
			elems.popup.remove();
		});

		elems.close.on('click', function(){
			elems.popup.remove();
		});

		elems.wrapper.on('click', function(evt){
			evt.stopPropagation();
		});

		if (options.youtubeID) {
			elems.content.css('padding', '0');
			elems.video = $('<div>', {Class: 'lnt-video'}).appendTo(elems.content);
			var src = 'https://www.youtube.com/embed/' + options.youtubeID + '?autoplay=1&amp;rel=0&amp;showinfo=0';
			var iframe = $('<iframe>', {width: '100%', height: '100%', src: src, allowfullscreen:true})
								.appendTo(elems.video);
		}

		if (options.id) {
			elems.content.html( $('#' + options.id).html() );
		}

		if (options.content) {
			elems.content.html(options.content);
		}

		elems.wrapper.fadeIn(250);
	}

})(jQuery)