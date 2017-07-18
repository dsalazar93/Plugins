;(function($, window, undefined){
	"use strict";

    $.fn.sortLetters = function(opts) {
    	
        var defaults = {
            onClickItemBefore: function(){},
            onClickItemAfter: function(){},
            onClickCheck: function(){},
            onCorrect: function(){},
            onFailed: function(){},
            onTerminated: function(){}
        };

        var options = $.extend({}, defaults, opts);

        return this.each(function() {

            var $this = $(this);

            options.enunciate.forEach(function(section, pos) {

                var template = ""+
                    "<div class='lnt_section_word lnt_section"+pos+"'>"+
                        "<h2>"+section.phrase+"</h2>"+
                        "<div class='boxButtons boxButtons"+pos+"'></div>"+
                        "<div class='boxLetters boxLetters"+pos+"'></div>"+
                        "<button type='button' id='lnt_check"+pos+"' class='btn-success btn-lg'>Comprobar</button>"+
                    "</div>";

                $this.prepend(template);

                // * Se guarda la palabra en en la variable (fullWord) 
                //   para operar sobre esta.

                // * splitWord es un array donde se guarda cada letra de la palabra.

                var fullWord = section.word;
                var arrarWord = [];
                var splitWord = [];

                // El ciclo divide la palabra en letras y las guarda en el array splitWord.
                for (var i = 0; i < fullWord.length; i++) {
                    splitWord.push(fullWord[i]);
                    arrarWord.push(fullWord[i]);
                }

                // A continuación se desordena el array (splitWord) para luego
                // imprimir en el html.
                var currentIndex = splitWord.length, temporaryValue, randomIndex;
                
                //Mientras haya $this, barajar...
                while (0 !== currentIndex) {
                    // Escoger una pocisión del array...
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;

                    // Intercambiar con el $this actual.
                    temporaryValue = splitWord[currentIndex];
                    splitWord[currentIndex] = splitWord[randomIndex];
                    splitWord[randomIndex] = temporaryValue;
                }

                var openButton = "<button type='button' class='btn-primary lnt_word_button lnt_word_button"+pos+"'>";
                var closeButton = "</button>";
                var letterToFill = "<div class='lnt_lettertofill lnt_lettertofill"+pos+"'></div>";

                for (var i = 0; i < splitWord.length; i++) {
                    $('.boxButtons'+pos).append(openButton + splitWord[i] + closeButton);
                    $('.boxLetters'+pos).append(letterToFill);
                }

                if (pos == 0)
                    $('.lnt_section'+pos).css('display', 'block');

                var $thissclicked = 0;
                var btn = $('.lnt_word_button'+pos);

                btn.on('click', function() {
                    var $this = $(this);

                    if ($this.parent(".boxButtons"+pos) && !($this.hasClass('lnt_word_button_r'+pos))) {
                        var first = $('.lnt_lettertofill'+pos).first();
                        $this.addClass('lnt_word_button_r'+pos);
                        first.replaceWith($this);
                        $thissclicked++;
                        options.onClickItemBefore()
                    
                    } else if ($this.parent(".boxLetters") && $this.hasClass('lnt_word_button_r'+pos)) {
                        var regresaraCaja = $('.boxButtons'+pos);
                        $this.removeClass('lnt_word_button_r'+pos)
                        regresaraCaja.append($this);
                        $(".boxLetters"+pos).append(letterToFill);
                        $thissclicked--;
                        options.onClickItemAfter()
                    }
                });


                $('#lnt_check'+pos).on('click', function() {
                    options.onClickCheck()
                    if ($thissclicked == arrarWord.length) {
                        var checked = 0;
                        var right = 0;
                        var text = '';

                        // Recorremos cada span del texto para compararlo con su valor.
                        $(".lnt_word_button_r"+pos).each(function() {
                            // Si la palabra es correcta, sumamos 1 a right.
                            if ($(this).text() == arrarWord[checked]) {
                                right += 1;
                            }
                            // Sumamos 1 a la variable de "botones comprobados".
                            checked += 1;
                        });

                        if (right == checked) {
                            options.onCorrect();

                            if ( pos >= (options.enunciate.length - 1) ) {
                                options.onTerminated();
                                return;
                            }

                            $('.lnt_section'+pos).css('display', 'none');
                            $('.lnt_section'+(pos+1)).css('display', 'block');

                        } else {
                            options.onFailed();                            
                        }
                    }
                });
            });
        });
    }
})(jQuery, window);