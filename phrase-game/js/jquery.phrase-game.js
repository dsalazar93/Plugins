;(function($, window, undefined){
    "use strict";

    $.fn.phraseGame = function(opts) {
        var defaults = {
           
        };

        var options = $.extend({}, defaults, opts);
        

        return this.each(function() {
            var elems = $(this);
            elems.html(

            "<div class='lnt_letter_button'></div>"+
            "<div class='printButtom lnt_word_button2'></div>"+
            "<center>"+
            "<button type='button' id='check' class='btn-success'>Comprobar</button>"+
            "</center>");

            var str = options.phrase;
            var words = [];
            words = str.split(" ");
            console.log(words);

            var values = words;
            var btnClic = "<button type='button' class='lnt-boton'>";
            var closeBtnClic = "</button>";
            var correct = [];
            var span_lnt = '<span class="lnt_word_button">'
            

            for (var i = 0; i < values.length; i++) {
                correct.push(values[i]);
            }

            var currentIndex = values.length,
                temporaryValue, randomIndex;
            //Mientras haya elementos, barajar...
            while (0 !== currentIndex) {
                // Escoger una pocisión del array...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // Intercambiar con el elemento actual.
                temporaryValue = values[currentIndex];
                values[currentIndex] = values[randomIndex];
                values[randomIndex] = temporaryValue;
            }

            // console.log(correct);
            // console.log(values);

            var openButton = "<button type='button' class='btn-primary lnt_word_button'>";
            var closeButton = "</button>";
            var letterToFill = "<div class='lnt_lettertofill'></div>";
            
            for (var i = 0; i < values.length; i++) {
                $(".lnt_letter_button").append(span_lnt);
                $(".printButtom").append(btnClic + values[i] + closeBtnClic);
            }


            var elementosclicked = 0;
            var btn = $('.lnt_word_button');
            btn.on('click', function(){
                var $this = $(this);
                if ($this.parent(".printButtom") && !($this.hasClass('lnt_word_button2'))) 
                {
                    console.log("Caja de botones");
                    var primero = $('.lnt_lettertofill').first();
                    $this.addClass('lnt_word_button2');
                    primero.replaceWith($this);
                    elementosclicked++;
                }
                else if ($this.parent(".lnt_letter_button") && $this.hasClass('lnt_word_button2'))
                {
                    console.log("caja de letras");
                    var regresaraCaja = $('.printButtom');
                    $this.removeClass('lnt_word_button2')
                    regresaraCaja.append($this);
                    $(".printButtom").append(letterToFill);
                    elementosclicked--;
                }
            });



            // Recuperamos el historial almacenado en local 
            var history = JSON.parse(localStorage.getItem('history'));

            // Si no existe historial, creamos un array sin contenido
            if (history === null) {} else {
                // Como existe historial, lo recorremos para mostrar por pantalla
                // cada elemento del historial en la zona correcta del HTML.
                $.each(history, function(key, value) {
                    $("#history").append(value);
                });
            }

            // Contenido que se ejecuta al clicar en "comprobar"
            $('#check').click(function() {

                var checked = 0;
                var right = 0;
                var text = '';

                // Recorremos cada span del texto para compararlo con su valor.
                $(".lnt_letter_button span").each(function() {
                    // Si la palabra es correcta, sumamos 1 a right.
                    if ($(this).text() == correct[checked]) {
                        right += 1;
                    }
                    // Sumamos 1 a la variable de "spans comprobados".
                    checked += 1;
                });

                // Incorporamos el texto al array que almacenaremos en local.
                history.push(text);

                // Incorporamos el texto al historial por pantalla.
                $("#history").append(text);

                // Guardamos en local (localStorage) el array history
                localStorage.setItem('history', JSON.stringify(history));

                if (right == checked) {
                    alert('Good Job!');
                } else {
                    alert('You failed!');
                }
            });


            var btn = $('.lnt-boton');
            btn.click(function() {

                var text = $(this).text();
                var primero = $('.lnt_word_button').first();
                primero.text(text).removeClass('lnt_word_button');
                $(this).attr('true');
                $(this).remove();
            });




        });
    }

})(jQuery, window);