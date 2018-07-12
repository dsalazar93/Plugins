;(function($, window, undefined){

	$.fn.rouletteGame = function(opts){

		var defaults = {}

		var options = $.extend({}, defaults, opts);

		return this.each(function(){
			var $this = $(this)
				,row = $('<div>', {Class: 'row'}).appendTo($this)
				,left = $('<div>', {Class: 'col-sm-6'}).appendTo(row)
				,right = $('<div>', {Class: 'col-sm-6'}).appendTo(row)
				,base = $('<div>', {Class: 'unc-roulette-base'}).appendTo(right)
				,roulette = $('<div>', {Class: 'unc-roulette'}).appendTo(base)
				,pin = $('<div>', {Class: 'unc-roulette-pin'}).appendTo(base)
				,delta = 360/options.questions.length
				,deg = 0
				,rotating = false;
			
			base.css({ backgroundImage: 'url(' + options.baseImage + ')' });
			pin.css({ backgroundImage: 'url(' + options.pinImage + ')' });

			roulette.css({ backgroundImage: 'url(' + options.rouletteImage + ')' })
					.on('click', function(){
						if (rotating) return;

						rotating = true;

						left.html('')

						deg = deg + Math.round(760 * (Math.random() + 1));
						roulette.css('transform', 'rotate(-' + deg + 'deg)');

						var question = options.questions[Math.floor((deg%360)/delta)];

						setTimeout(function(){
							rotating = false;

							left.html('<h3>' + question.text +'</h3>');
							var ul = $('<ul>').appendTo(left);
							
							for(var i = 0; i < question.answers.length; i++) {
								$('<li>').html(question.answers[i].text)
										 .appendTo(ul)
										 .data('q', i)
										 .on('click', function(){
										 	var _this = $(this);

										 	if(question.answers[_this.data('q')].correct) {
										 		_this.addClass('correct');

										 	} else {
										 		_this.addClass('error');

										 		ul.find('li').filter(function(){
										 			var _this = $(this);
										 			return question.answers[_this.data('q')].correct;
										 		}).addClass('correct')
										 	}
										 });
							}

						}, 1000);
					});
				
		});
	}
})(jQuery, window);