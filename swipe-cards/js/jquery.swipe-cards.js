;(function($, window, undefined){
	"use strict";

	$.fn.swipeCards = function(opts) {

		var defaults = {
			finished: function(questions){ console.log(questions); },
			bgImage: 'linear-gradient(#2196F3,#00BCD4)',		
			emptyText: 'No hay mas cartas'
		};

		var options = $.extend({}, defaults, opts);

		return this.each(function(){
			var $this = $(this).css('background-image', options.bgImage);

			$this.html('<span class="unc-empty-text">' + options.emptyText + '</span>');

			options.questions.reverse().forEach(function(question, idx){
				question.elems = [];
				question.elems.card = $('<div>', {Class: 'unc-swipe-card animated'})
											.appendTo($this)
											.data('question', question)
											.css('background-image', options.bgImage);

				question.elems.title = $('<div>', {Class: 'unc-card-title'}).html(options.title).appendTo(question.elems.card);
				question.elems.left = $('<div>', {Class: 'unc-swipe-left'}).html('A').appendTo(question.elems.card);
				question.elems.right = $('<div>', {Class: 'unc-swipe-right'}).html('B').appendTo(question.elems.card);
				question.elems.question = $('<div>', {Class: 'unc-card-question'}).appendTo(question.elems.card);
				question.elems.leftImage = $('<img>', {Class: 'unc-card-left-image', src: question.leftImage}).appendTo(question.elems.question);
				question.elems.content = $('<div>', {Class: 'unc-card-content'}).html(question.question).appendTo(question.elems.question);
				
				question.elems.answers = $('<div>', {Class: 'unc-card-answers'}).html('<div><span class="unc-card-letter">A</span>' 
														+ '<span class="unc-card-answer">' + question.left +'</span></div><div><span class="unc-card-letter">B</span>' 
														+ '<span class="unc-card-answer">' + question.right +'</span></div>').appendTo(question.elems.card);
 
				question.idx = idx;

				question.elems.left.on('click', function() {
					question.elems.card.addClass('fadeOutLeft');
					
					if (question.correct == 'left') {
						question.result = 1;
					} else {
						question.result = 0;
					}

					if (question.idx == 0) {
						options.finished(options.questions);
					}

					console.log(options.questions)
				});

				question.elems.right.on('click', function() {
					question.elems.card.addClass('fadeOutRight');
					
					if (question.correct == 'right') {
						question.result = 1;
					} else {
						question.result = 0;
					}

					if (question.idx == 0) {
						options.finished(options.questions);
					}
				});
			});
		})
	}

})(jQuery, window)