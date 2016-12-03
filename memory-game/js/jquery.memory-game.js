;(function($, window, undefined){
	"use strict";

    $.fn.memoryGame = function(opts) {
    	var defaults = {
    		backgroundImg: "img/bg.jpg",
    		cards: [],
    	};

        var options = $.extend({}, defaults, opts);
        if (!options.mirrors) options.mirrors = options.cards;

        return this.each(function() {

        	var $this = $(this).addClass('lnt-memory-grid')
        		,cardsArray = []
        		,paused = false
        		,guess = null;

        	options.cards.forEach(function(elem, idx) {
        		elem.id = idx;
        	});

            options.mirrors.forEach(function(elem, idx) {
                elem.id = idx;
            });
        		
        	$.merge(cardsArray, options.cards);
        	$.merge(cardsArray, options.mirrors);        		

        	var _events = {

        		/**
                 * [shuffle description]
                 * @param  {[type]} array [description]
                 * @return {[type]}       [description]
                 */
                shuffle: function(array){
                    var counter = array.length, temp, index;

                    while (counter > 0) {
                        index = Math.floor(Math.random() * counter);
                        counter--;
                        temp = array[counter];
                        array[counter] = array[index];
                        array[index] = temp;            
                    }

                    return array;
                },

                /**
                 * [cardClicked description]
                 * @return {[type]} [description]
                 */
                cardClicked: function(){
                    var $card = $(this);

                    if(!paused && !$card.find(".inside").hasClass("matched") 
                    				   && !$card.find(".inside").hasClass("picked")) {

                        $card.find(".inside").addClass("picked");

                    	if(!guess) {
                            guess = $card.attr("data-id");

                        } else if (guess == $card.attr("data-id")) {
                            $this.find(".picked").addClass("matched");
                            guess = null;

                        } else {
                            guess = null;
                            paused = true;

                            setTimeout(function(){
                                $this.find(".picked").removeClass("picked");
                                paused = false;
                            }, 600);
                        }

                        if ($this.find(".matched").length == $this.find(".card").length) {
                        	paused = true;
                            if (options.onwin) options.onwin();
                        }
                    }
                },
        	}        	
        	
        	var $cards = $(_events.shuffle(cardsArray));

        	$cards.each(function(k, v){
        		var $cards = $('<div>', {Class: 'card', 'data-id': v.id }).appendTo($this);

                $cards.append('<div class="inside">\
            			  		<div class="front">\
            			  			<img src="'+ v.img +'"/>\
            			  		</div>\
            			  		<div class="back">\
            			  			<img src="'+ options.backgroundImg +'" alt="img" /></div>\
                			</div>'

                	  ).on('click', _events.cardClicked)
            });

        });
    }

})(jQuery, window);