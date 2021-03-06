;(function($, undefined){
    "use strict";

    $.fn.memoryGame = function(opts) {

        var defaults = {};
        var options = $.extend({}, defaults, opts);
        var cards = options;

        return this.each(function() {
            var $this = $(this);

            var _events = {

                /**
                 * Inicio de funcion para llamar desde el dom
                 * 
                 * @param  {[type]} cards [description]
                 * @return {[type]}       [description]
                 */
                init: function(cards){
                    this.$game = $(".memory-grid");
                    this.cardsArray = $.merge(cards, cards);
                    this.shuffleCards(this.cardsArray);
                    this.$cards = $(this.shuffle(this.cardsArray));
                    this.setup();
                    this.timeMemory();
                },


                /**
                 * [shuffleCards description]
                 * @param  {[type]} cardsArray [description]
                 * @return {[type]}            [description]
                 */
                shuffleCards: function(cardsArray){
                    this.$cards = $(this.shuffle(this.cardsArray));
                },


                /**
                 * [setup description]
                 * @return {[type]} [description]
                 */
                setup: function(){
                    this.html = this.buildHTML();            
                    this.$game.html(this.html);
                    this.$memoryCards = $(".card");
                    this.binding();
                    this.paused = false;
                    this.guess = null;
                },


                /**
                 * [binding description]
                 * @return {[type]} [description]
                 */
                binding: function(){
                    this.$memoryCards.on("click", this.cardClicked);
                    console.log('prueba 4');
                },


                /**
                 * [cardClicked description]
                 * @return {[type]} [description]
                 */
                cardClicked: function(){
                    var $card = $(this);
                    if(!_events.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
                        $card.find(".inside").addClass("picked");
                        if(!_events.guess){
                            _events.guess = $(this).attr("data-id");
                        } else if(_events.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
                            $(".picked").addClass("matched");
                            _events.guess = null;
                            console.log('acerto');

                            options.cardClicked ? options.cardClicked() : _events.cardClicked();

                        } else {
                            _events.guess = null;
                            _events.paused = true;
                            setTimeout(function(){
                                $(".picked").removeClass("picked");
                                _events.paused = false;
                                console.log('fallo');
                            }, 600);
                        }
                        if($(".matched").length == $(".card").length){
                            options.win ? options.win() : _events.win();
                        }
                        console.log('clicks');
                    }
                },




                /**
                 * [win description]
                 * @param  {[type]} event_ [description]
                 * @return {[type]}        [description]
                 */
                win: function(event_){
                    this.paused = true;
                    console.log('Ganar');
                },


                /**
                 * [reset description]
                 * @return {[type]} [description]
                 */
                reset: function(){
                    this.hideModal();
                    this.shuffleCards(this.cardsArray);
                    this.setup();
                    this.$game.show("slow");
                    console.log('Resetiar');
                },


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
                 * [buildHTML description]
                 * @return {[type]} [description]
                 */
                buildHTML: function(){
                    var frag = '';
                    this.$cards.each(function(k, v){
                        frag += '<div class="card" data-id="'+ v.id +'"><div class="inside"><div class="front"><img src="'+ v.img +'" alt="'+ v.name +'" /></div> <div class="back"><img src="'+ v.backgroundImg +'" alt="img" /></div></div> </div>';
                    });
                    return frag;
                },



                //Funcion perteneciente al reloj de tiempo
                timeMemory: function(){
                    var interval = setInterval(function() {
                        var timer = $('span').html();
                        timer = timer.split(':');
                        var minutes = parseInt(timer[0], 10);
                        var seconds = parseInt(timer[1], 10);
                        options.timeMemory ? options.timeMemory() : _events.timeMemory();

                        seconds -= 1;
                        if (minutes < 0)
                            return clearInterval(interval);
                        if (minutes < 10 && minutes.length != 2)
                            minutes = '0' + minutes;
                        if (seconds < 0 && minutes != 0) {
                            minutes -= 1;
                            seconds = 59;
                        }
                        else if (seconds < 10 && length.seconds != 2) seconds = '0' + seconds;
                        $('span').html(minutes + ':' + seconds);

                        if (minutes == 0 && seconds == 0) {
                            clearInterval(interval);
                        }

                    }, 1000);
                }

            };

            //Llama la var Memory y dentro de las options guardamos cards para llamarlo en el script
            _events.init(options.cards);
        });
    }
})(jQuery);