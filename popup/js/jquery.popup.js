;(function($, undefined) {
	"use strict";

	$(window).keyup(function(evt){
		if (evt.which == 27) {
			$('.lnt-popup').remove();
		}
	});

	$.popup = function(opts) {

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
			var src = 'https://www.youtube.com/embed/' + options.youtubeID + '?rel=0&autoplay=1';
			var iframe = $('<iframe>', {width: '100%', height: '400', src: src, allowfullscreen:true})
								.appendTo(elems.content);
		}		
	}

})(jQuery)