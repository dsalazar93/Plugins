;(function($, window, undefined){

	window.playersCount = window.playersCount || 0;

	$.fn.youtubeCaptions = function(opts){

		var defaults = {};
		var options = $.extend({}, defaults, opts);

		// Agregando el script del API
		if (!$('#youtubeAPI').length) {
			var tag = document.createElement('script');
			tag.src = "https://www.youtube.com/iframe_api";
			tag.id = 'youtubeAPI'
			var firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		}

		return this.each(function(){
			var $this = $(this)
				,player
				,videoTime = 0
				,timeUpdater		
				,playerID = 'player-' + window.playersCount++
				,captions = $this.find('li');

			if ( $this.hasClass('player-instanced') ) return;

			$this.addClass('player-instanced');
			
			$('<div>', { Class: 'player' })
					.append('<div id="' + playerID + '"></div>')
					.prependTo($this);

			captions.each(function(){
				var $this = $(this);
				$this.prepend('<span class="icon-play"></span>');
				$this.on('click', function(){
					player.seekTo( $this.data('time') );
				});
			});
			
			window.onYouTubeIframeAPIReady = function() {
				console.log($this)
				player = new YT.Player(playerID, {
					height: '100%',
					width: '100%',
					videoId: $this.data('id'),
					events: {
						'onReady': _events.onPlayerReady,
						'onStateChange': _events.onPlayerStateChange
					}
				});
			}

			// Eventos necesarios para el API.
			var _events = {

				/**
				 * The API will call this function when the video player is ready.
				 */
				onPlayerReady: function(event) {
					event.target.playVideo();
				},

				/**
				 * This function is called when every second once the player
				 * is playing.
				 */
				updateTime: function() {
					var oldTime = videoTime;
					
					if(player && player.getCurrentTime) {
						videoTime = parseInt(player.getCurrentTime());
					}
					
					if (videoTime !== oldTime) {
						_events.onProgress(videoTime);
					}
				},

				/**
				 * When the time changes, this will be called.
				 */
				onProgress: function(currentTime) {
					console.log(currentTime)
					captions.each(function(){
						var $this = $(this);
						if ($this.data('time') < currentTime && !$this.hasClass('fadeInRight'))
							$this.addClass('fadeInRight');
					});
				},

				/**
				 * The API calls this function when the player's state changes.
				 * The function indicates that when playing a video (state=1),
    			 * the player should play for six seconds and then stop.
				 */
				onPlayerStateChange: function(event) {
					 if (event.data == YT.PlayerState.PLAYING) {
					 	timeUpdater = setInterval(_events.updateTime, 1000);

					 } else {
					 	clearInterval(timeUpdater);					 	
					 }
				}
			}
		});
	}
})(jQuery, window);