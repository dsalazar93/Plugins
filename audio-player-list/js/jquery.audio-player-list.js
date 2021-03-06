;(function($, window, undefined){

	$.fn.audioPlayerList = function(opts) {

		var defaults = {}

		var options = $.extend({}, defaults, opts);

		return this.each(function() {
			var $this = $(this)

			var elems = [];
			elems.headerBG = $this.find('.unc-header-bg')
			elems.title = $this.find('.unc-header-title')
			elems.play = $this.find('.unc-player-play')
			elems.next = $this.find('.unc-player-next')
			elems.back = $this.find('.unc-player-back')
			elems.pause = $this.find('.unc-player-pause')
			elems.volume = $this.find('.unc-player-volume')
			elems.mute = $this.find('.unc-player-mute')
			elems.progressbar = $this.find('.unc-player-progressbar')
			elems.playlist = $this.find('.unc-player-list')

			elems.headerBG.css('background-image', 'url(' + elems.headerBG.data('url') + ')');

			$this.data('audio', new Audio(options.audios[0].file));
			var audio = $this.data('audio')
			audio.file = options.audios[0].file;

			elems.play.on('click', function(){
				elems.pause.show();
				elems.play.hide();
				audio .play();
			});

			elems.pause.on('click', function(){
				elems.play.show();
				elems.pause.hide();
				audio.pause()
			});

			elems.volume.on('click', function(){
				elems.mute.show();
				elems.volume.hide();
				audio.muted = true;
			});

			elems.mute.on('click', function(){
				elems.volume.show();
				elems.mute.hide();
				audio.muted = false;
			});

			elems.next.on('click', function(){
				var _idx = 0;
				$this.find('.unc-list-item').each(function(idx){
					if ($(this).hasClass('active'))
						_idx = idx
				});

				$this.find('.unc-list-item').eq(_idx + 1).click();
			});

			elems.back.on('click', function(){
				var _idx = 0;
				$this.find('.unc-list-item').each(function(idx){
					if ($(this).hasClass('active'))
						_idx = idx
				});

				$this.find('.unc-list-item').eq(_idx - 1).click();
			});

			elems.progressbar.on('click', function(e){
				var $this = $(this);
				var pos = (e.pageX - $this.offset().left) / $this.width();
				audio.currentTime = audio.duration * pos;
			});

			options.audios.forEach(function(item){
				elems.playlist.append('<h4 class="unc-audio-title">' + item.title + '</h4>');

				item.captions.forEach(function(caption){
					var listitem = $('<div>', { Class: 'unc-list-item'}).html(
							'<div class="unc-list-title">' + caption.title + '</div>'
						)

					listitem.attr('data-file', item.file);
					listitem.attr('data-start', caption.start);
					listitem.attr('data-end', caption.end);
					listitem.attr('data-audio', item.title);
					listitem.attr('data-title', caption.title);

					elems.playlist.append(listitem);

					listitem.on('click', function(){
						$this.find('.unc-list-item').removeClass('active')
						$(this).addClass('active');

						if (audio.file != item.file) {
							audio.file = item.file;
							audio.src = item.file;
						}
						audio.currentTime = caption.start
						elems.title.html(caption.title + '<small>' + item.title + '</small>')
						elems.play.click();
					});
				});
			});

			setInterval(function(){
				if (audio && !audio.paused) {
					var ct = audio.currentTime
						,duration = audio.duration

					var pos = ct / duration * 100
					elems.progressbar.find('span').css('margin-left', pos + '%');
					
					$this.find('.unc-list-item[data-file="' + audio.file + '"]').each(function(){
						
						var _$this = $(this);
						if (ct >= _$this.data('start') && ct <= _$this.data('end') && !_$this.hasClass('active')) {
							$this.find('.unc-list-item').removeClass('active')
							_$this.addClass('active');
							elems.title.html(_$this.data('title') + '<small>' + _$this.data('audio') + '</small>')
						}
						
					})
				}
			},200);
		});
	}
})(jQuery, window);