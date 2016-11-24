;(function($, window, undefined){

	$.fn.audioCaptions = function(opts) {

		if (typeof opts == 'string') {
			var temp = {};
			temp[opts] = true;
			opts = temp;
		}
		
		var defaults = {
			// Compatibilidad con PageTransitions
			page: { setTimeout: function(callback, delay) { setTimeout(callback, delay); } },
		}

		var options = $.extend({}, defaults, opts);

		// Destroying object
		if (options.destroy) {
			return this.each(function(){
				var $this = $(this)
					,effect = $this.data('animated') || 'fadeInRight';

				$this.css('display', 'none').removeClass(effect);
				$this.find('[data-start]').each(function(){
					var $this = $(this)
						,effect = $this.data('animated') || 'bounceInRight';
					$this.removeClass(effect);
				});
				
				$this.find('audio').remove();
			});
		}

		return this.each(function() {
			var $this = $(this)
				,start = $this.data('start')*1000 || 0
				,end = $this.data('end')*1000
				,effect = $this.data('animated') || 'fadeInRight'
				,audioStart = $this.data('audio-start')*1000 || 0
				,audioSrc = options.audioSrc || $this.data('src')
			
				,$source = $('<source>', { type: 'audio/mpeg', src: audioSrc })
				,$audio = $('<audio>', {controls: true}).append($source).appendTo($this)
				,audio = $audio.get(0)


			options.page.setTimeout(function(){
				audio.play();
			}, audioStart);

			options.page.setTimeout(function(){
				$this.css('display', 'block').addClass(effect);
			}, start);

			if (end)
				options.page.setTimeout(function(){
					$this.css('display', 'none')
						 .removeClass(effect);

					if (callback) callback();
				}, end);


			var caps = $this.find('[data-start]');

			var _events = {

				/**
				 * This function is called when the current playback position has changet¿d
				 */
				ontimeupdate: function() {
					caps.each(function(){
						
						var $this = $(this)
							,start = $this.data('start')*1000
							,end = $this.data('end')*1000
							,effect = $this.data('animated') || 'bounceInRight';

						if (start <= parseInt(audio.currentTime)*1000) {
							$this.addClass(effect);
						} else {
							$this.removeClass(effect);
						}

						if (end && end <= parseInt(audio.currentTime)*1000)
							$this.css('display', 'none').removeClass(effect);
					});
				},

				/**
				 * This function is called when the current playlist is ended.
				 */
				onended: function() {
					
				}
			}

			// Audio Events
			audio.ontimeupdate = _events.ontimeupdate;
			audio.onended = _events.onended;
		});
	}
})(jQuery, window);