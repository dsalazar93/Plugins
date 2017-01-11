;(function($, window, undefined){
	"use strict";

    $.fn.sortLetters = function(opts) {
    	var defaults = {};

        var options = $.extend({}, defaults, opts);

        // var wordSections = options.enunciate;

        return this.each(function() {
            var elemento = $(this);
            options.enunciate.forEach(function(seccion, pos){
                // console.log(seccion);

                var esquema = "<div class='lnt_section_word'>"+
                        "<h2>"+seccion.phrase+"</h2>"+
                        "<div class='boxButtons boxButtons"+pos+"'></div>"+
                        "<div class='boxLetters boxLetters"+pos+"'></div>"+
                        "<center>"+
                            "<button type='button' id='lnt_check"+pos+"' class='btn-success btn-lg'>Comprobar</button>"+
                        "</center><br><br><br><br>"+
                    "</div>";
                elemento.prepend(esquema);

                // * Se guarda la palabra en en la variable (fullWord) 
                //   para operar sobre esta.

                // * splitWord es un array donde se guarda cada letra de la palabra.

                var fullWord = seccion.word;
                var arrarWord = [];
                var splitWord = [];

                // El ciclo divide la palabra en letras y las guarda en el array splitWord.
                for (var i = 0; i < fullWord.length; i++) 
                {
                    splitWord.push(fullWord[i]);
                    arrarWord.push(fullWord[i]);
                }
                console.log(splitWord);


                // A continuación se desordena el array (splitWord) para luego
                // imprimir en el html.
                var currentIndex = splitWord.length, temporaryValue, randomIndex;
                //Mientras haya elementos, barajar...
                while (0 !== currentIndex) 
                {
                    // Escoger una pocisión del array...
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;

                    // Intercambiar con el elemento actual.
                    temporaryValue = splitWord[currentIndex];
                    splitWord[currentIndex] = splitWord[randomIndex];
                    splitWord[randomIndex] = temporaryValue;
                }
                console.log(splitWord);            

                var openButton = "<button type='button' class='btn-primary lnt_word_button lnt_word_button"+pos+"'>";
                var closeButton = "</button>";
                var letterToFill = "<div class='lnt_lettertofill lnt_lettertofill"+pos+"'></div>";

                for (var i = 0; i < splitWord.length; i++) {
                    $('.boxButtons'+pos).append(openButton + splitWord[i] + closeButton);
                    $('.boxLetters'+pos).append(letterToFill);
                }

                var elementosclicked = 0;
                var btn = $('.lnt_word_button'+pos);
                btn.on('click', function(){
                    var $this = $(this);
                    if ($this.parent(".boxButtons"+pos) && !($this.hasClass('lnt_word_button_r'+pos))) 
                    {
                        console.log("Caja de botones");
                        var primero = $('.lnt_lettertofill'+pos).first();
                        $this.addClass('lnt_word_button_r'+pos);
                        primero.replaceWith($this);
                        elementosclicked++;
                    }
                    else if ($this.parent(".boxLetters") && $this.hasClass('lnt_word_button_r'+pos))
                    {
                        console.log("caja de letras");
                        var regresaraCaja = $('.boxButtons'+pos);
                        $this.removeClass('lnt_word_button_r'+pos)
                        regresaraCaja.append($this);
                        $(".boxLetters"+pos).append(letterToFill);
                        elementosclicked--;
                    }
                });


                $('#lnt_check'+pos).on('click', function() {

                    if (elementosclicked == arrarWord.length) 
                    {
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
                            alert('Good Job!');
                        } else {
                            alert('You failed!');
                        }
                    }
                });

            });


            

        });
    }

})(jQuery, window);