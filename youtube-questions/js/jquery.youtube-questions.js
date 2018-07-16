;(function($, window, undefined){

	window.playersCount = window.playersCount || 0;
	window.youtubeAPIReady = window.youtubeAPIReady || false;
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

	$.fn.youtubeQuestions = function(opts){

		var defaults = {
			width: '100%',
			autoplay: 1,
			fs: 1,
			start: 0,
			controls: 0,
			circle_bg_color: '#03297F',
			circleStart: true
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
				,paused = false
				,idxCQ = undefined; //Index for current question

			if ( $this.hasClass('player-instanced') ) {
				$this.data('yt').play();
				return;
			}

			$this.addClass('player-instanced')
				 .css('width', options.width)
				 .data('yt',{
				 				play: function() { if(player.playVideo) player.playVideo(); paused = false; },
				 				pause: function() {  if(player.pauseVideo) player.pauseVideo(); paused = true; },
				 				stop: function() { if(player.stopVideo) player.stopVideo(); paused = false; },
				 				seekTo: function(time) { if(player.seekTo) player.seekTo(time); player.playVideo(); paused = false; },
				 				getCurrentTime: function() { if(player.getCurrentTime) return player.getCurrentTime(); },
				 				getDuration: function() { if(player.getDuration) return player.getDuration(); },
				 			});
			
			var playerDiv = $('<div>', { Class: 'player' })
					.append('<div><div id="' + playerID + '"></div></div>')
					.prependTo($this);

			var questionsDiv = $('<div>', { Class: 'unc-wrapper-questions'}).appendTo($this);

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
								fs: options.fs,
								iv_load_policy: 0,
								start: options.start,
								controls: options.controls
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
				 * Shows a questions and pauses de video
				 * 
				 * @param Object question
				 */
				setQuestion: function(question) {
					$this.data('yt').pause();

					questionsDiv.html('');
					$('<div>', {Class: 'unc-question'}).html(question.text).appendTo(questionsDiv);

					question.answers.forEach(function(answer, idx) {
						$('<div>', {Class: 'unc-answer'})
										.html(answer.text)
										.appendTo(questionsDiv)
										.on('click', function(){
											if (answer.time) {
												$this.data('yt').seekTo(answer.time);
											
											} else if (answer.correct) {
												$this.data('yt').seekTo(options.feedback[0]);
											
											} else {
												$this.data('yt').seekTo(options.feedback[2]);
											}

											questionsDiv.hide();
										});
					});

					questionsDiv.show();

					if ($.fn.TimeCircles) {
						var timeCircles = $('<div>').data('timer', question.timer || 60)
													.appendTo(questionsDiv)
													.TimeCircles({
														start: options.circleStart,
														circle_bg_color: options.circle_bg_color,
														count_past_zero: false,
														total_duration: question.timer || 60,
														time: {
															Days: {show: false},
															Hours: {show: false},
															Minutes: {show: false}
														}
													}).addListener(function(unit, value, total) {
														if (total <= 0 && question.ontimerend)
															question.ontimerend();
													});
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
					if (currentTime == options.feedback[1]) {
						if (options.questions.length > idxCQ + 1) {
							$this.data('yt').seekTo(options.questions[idxCQ + 1].start);
						
						} else {
							$this.data('yt').seekTo(options.finish);
						}
					
					} else if (currentTime == options.feedback[3]) {
						$this.data('yt').seekTo(options.questions[idxCQ].end - 0.1);
					}
					
					options.questions.forEach(function(question, idx) {
						if (currentTime == question.end) {
							idxCQ = idx;
							_events.setQuestion(question);
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