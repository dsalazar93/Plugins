;(function($, window, undefined){

	$.fn.quiz = function(opts) {

		var defaults = {};
		var options = $.extend({}, defaults, opts);

		return this.each(function(){
			var $this = $(this);

			$this.addClass('lnt-evaluation')
				 .append('<h1>' + options.title + '</h1>');

			
			var fieldset = $('<fieldset>').appendTo($this)
				,buttons = $('<div>', {Class: 'lnt-evaluation-buttons'})
				,reset = $('<button>', {Class: 'btn btn-primary', type: 'reset'})
								.html('Limpiar evaluación')
								.appendTo(buttons)
								.on('click', function(){
									fieldset.find('input[type=radio]').prop('disabled', false);
									fieldset.find('.lnt-feedback, div.good, div.bad').css('display', 'none');
								});

			options.questions.forEach(function(question, idx_question) {
				var $quest = $('<div>', {Class: 'lnt-question'})
						.html('Pregunta ' + (idx_question+1) + '<br>' + question.question)
						.appendTo(fieldset);

				question.answers.forEach(function(answer, idx_answer) {

					var div = $('<div>').appendTo($quest)
						,input = $('<input>', {type: 'radio', name: (idx_question+1), id: 'A' + (idx_question+1) + (idx_answer+1) })
									.appendTo(div)
						,label = $('<label>', {for: 'A' + (idx_question+1) + (idx_answer+1) })
									.html('<span><div></div></span>' + answer.text).appendTo(div);

					if (answer.correct) {
						input.addClass('good');
						label.addClass('good');
					}
					
					input.on('change', function(){
						if ($(this).hasClass('good'))
							good.css('display', 'block');
						else	
							bad.css('display', 'block');

						feedback.css('display', 'block');
						$quest.find('input[type=radio]').prop('disabled', 'disabled');
					})
				});

				var feedback = $('<div>', {Class: 'lnt-feedback'}).appendTo($quest)
						,good = $('<div>', {Class: 'good'}).html(question.feedback.good).appendTo(feedback)
						,bad = $('<div>', {Class: 'bad'}).html(question.feedback.bad).appendTo(feedback);
			});

			buttons.appendTo(fieldset);
		});
	}

})(jQuery, window);