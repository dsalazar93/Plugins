;(function($, undefined) {
	"use strict";

	$.fn.hangmanGame = function(opts) {

		var defaults = {
			img_start: 0,
			img_file: 'img/aho',
			img_ext: 'png',
			letters: 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ',
			btnAgainText: 'Intenta nuevamente',
			btnNextText: 'Siguiente juego',
			btnExitText: 'Salir del juego',
			btnClass: 'btn btn-default',
			bgImage: 'linear-gradient(#2196F3,#00BCD4)',
			btnAgainCb: function() {},
			btnNextCb: function() {},
			finished: function() { console.log('Game Over!!') }
		}

		var options = $.extend({}, defaults, opts);

		return this.each(function(){
			var $this = $(this).css('background', options.bgImage).prepend('<div class="unc-hangman-title">' + options.title + '</div>')
				,imgFile = undefined
				,picture = undefined
				,_game = options.games[0]
				,btnAgain = $('<button>', {Class: options.btnClass}).html(options.btnAgainText)
				,btnNext = $('<button>', {Class: options.btnClass}).html(options.btnNextText)

			_game.idx = 0;

			var _events = {
				init: function(game) {
					$this.find('.unc-hangman-question').html(game.question);
					options.img_start = 0;
					imgFile = options.img_file + options.img_start + '.' + options.img_ext
					picture = $this.find('.unc-hangman-picture').attr('src', imgFile)
					game.answer = game.answer.toUpperCase();
					var answerArr = game.answer.split(' ');
					$('.unc-hangman-answer').html('');

					for(var i = 0; i < answerArr.length; i++) {
						var word = $('<span>', {Class: 'unc-hangman-answer-word'})

						for (var j = 0; j < answerArr[i].length; j++) {
							var letter = $('<span>', { Class: 'unc-hangman-answer-letter' })
											.html('&nbsp;')
											.data('letter', answerArr[i][j])
											.appendTo(word)
						}

						$this.find('.unc-hangman-answer')
							 .append(word)
							 .append('<span class="unc-hangman-answer-letter unc-hangman-space">&nbsp;</span>');

						$this.find('.unc-hangman-letter').removeClass('error success disabled')
					}

					btnAgain.on('click', function(){
						if (options.btnAgainCb() != false)
							_events.init(_game);
					});

					btnNext.on('click', function(){
						if (options.btnNextCb() != false) {
							var idx = _game.idx + 1;
							_game = options.games[idx];
							_game.idx = idx;
							_events.init(_game);
						}
					});
				}
			}

			// Añadiendo teclado alfabético
			for (var i = 0; i < options.letters.length; i++) {
				var letter = $('<span>', { Class: 'unc-hangman-letter' }).html(options.letters[i]);
				$this.find('.unc-hangman-letters').append(letter);

				letter.on('click', function() {
					var $letter = $(this);

					if($letter.hasClass('error') || $letter.hasClass('success') || $letter.hasClass('disabled'))
						return;

					$('.unc-hangman-answer-letter').each(function(){
						var _$this = $(this);
						if (_$this.data('letter') == $letter.html())
							_$this.html($letter.html());
					});
					
					if (_game.answer.indexOf($letter.html()) == -1) {
						$letter.addClass('error');
						options.img_start++
						imgFile = options.img_file + options.img_start + '.' + options.img_ext;
						picture.attr('src', imgFile);

						//Game Over
						if (options.img_start == 6) {
							$this.find('.unc-hangman-letter').addClass('disabled');
							$this.find('.unc-hangman-question').html(btnAgain);
						}

					
					} else {
						$letter.addClass('success');

						// Check game
						var flag = true;
						$this.find('.unc-hangman-answer .unc-hangman-answer-letter')
							 		.filter(':not(.unc-hangman-space)').each(function(){
							
							var $letter = $(this);

							if ($letter.html() == '&nbsp;')
								flag = false;
						});

						if (flag) {
							$this.find('.unc-hangman-letter').addClass('disabled');

							if (_game.idx + 1 < options.games.length)
								$this.find('.unc-hangman-question').html(btnNext);
							else {
								options.finished();
							}
						}
					}
				});
			}

			_events.init(_game);
		});
	}
})(jQuery);