$(document).ready(function() {
    // Las palabras correctas por orden
    var values = ['reir', 'hoy,', 'llorar', 'mañana'];
    var btnClic = "<button type='button' class='lnt-boton'>";
    var closeBtnClic = "</button>";
    var correcto = [];
    
    for (var i = 0; i < values.length; i++) {
        correcto.push(values[i]);
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

    console.log(correcto);


    for (var i = 0; i < values.length; i++) {
        $(".printButtom").append(btnClic + values[i] + closeBtnClic);
    }

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
        $("#text span").each(function() {
            // Si la palabra es correcta, sumamos 1 a right.
            if ($(this).html() == correcto[checked]) {
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
