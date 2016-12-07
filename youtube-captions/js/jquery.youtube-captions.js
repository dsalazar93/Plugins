;(function($, window, undefined){

	window.playersCount = window.playersCount || 0;
	window.youtubeAPIReady = false;
	window.onYouTubeIframeAPIReady = function() {
		window.youtubeAPIReady = true;
	}

	// Agregando el script del API
	if (!$('#youtubeAPI').length) {
		var tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		tag.id = 'youtubeAPI'
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}

	$.fn.youtubeCaptions = function(opts){

		var defaults = {
			width: '100%',
			autoplay: 1,
			fs: 1
		}

		var options = $.extend({}, defaults, opts);

		return this.each(function(){
			var $this = $(this)
				,player
				,playlist = undefined
				,videoTime = 0
				,timeUpdater		
				,playerID = 'player-' + window.playersCount++
				,captions = $this.find('li')
				,paused = false;

			if ( $this.hasClass('player-instanced') ) {
				$this.data('yt').play();
				return;
			}

			$this.addClass('player-instanced')
				 .css('width', options.width)
				 .data('yt',{
				 				play: function() { if(player.playVideo) player.playVideo(); paused = false; },
				 				pause: function() {  if(player.pauseVideo) player.pauseVideo(); paused = true; },
				 				stop: function() { if(player.stopVideo) plater.stopVideo(); }
				 			});
			
			var playerDiv = $('<div>', { Class: 'player' })
					.append('<div><div id="' + playerID + '"></div></div>')
					.prependTo($this);

			captions.each(function(){
				var $this = $(this);
				$this.on('click', function(){
					player.seekTo( $this.data('time') );
				});
			});

			// Eventos necesarios para el API.
			var _events = {

				init: function() {
					if (window.youtubeAPIReady) {
						player = new YT.Player(playerID, {
							height: '100%',
							width: '100%',
							videoId: $this.data('id'),
							playerVars: {
								showinfo: 0,
								rel: 0,
								autoplay: options.autoplay,
								fs: options.fs
							},
							events: {
								'onReady': _events.onPlayerReady,
								'onStateChange': _events.onPlayerStateChange,
							}
						});
					} else {
						setTimeout(_events.init, 1000);
					}
				},

				/**
				 * The API will call this function when the video player is ready.
				 */
				onPlayerReady: function(event) {
					if (event.target && options.autoplay)
						event.target.playVideo();

					if (paused)
						event.target.pauseVideo();

					if (options.height) {
						playlist = $this.find('.lnt-youtube-panel')
							 .height( typeof options.height == 'number' ? options.height : playerDiv.height() )
							 .find('.lnt-youtube-playlist')
							 .jScrollPane({ contentWidth: '0px' });

						$(window).on('resize', function(){
							$this.find('.lnt-youtube-panel')
								 .height( typeof options.height == 'number' ? options.height : playerDiv.height() );
							playlist.data('jsp').reinitialise();
						});
					}
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
					captions.each(function(){
						var $this = $(this);
						if ($this.data('time') < currentTime && !$this.hasClass('fadeInRight')) {
							$this.addClass('lnt-caps-actived');
							
							if (playlist) 
								playlist.data('jsp').scrollToElement($this);

						} else if ($this.data('time') > currentTime) {
							$this.removeClass('lnt-caps-actived');
						}
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

					 if (event.data == YT.PlayerState.ENDED) {
					 	if (options.onended) options.onended();
					 }
				}
			}

			_events.init();
		});
	}
})(jQuery, window);