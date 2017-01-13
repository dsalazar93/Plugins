;(function($, undefined){
	"use strict";

	$.fn.hangmanGame = function(opts){

		if (typeof opts == 'string')
			opts = { word : opts };

		var defaults = {
			words : 'juego del ahorcado'
		}

		var options = $.extend({}, defaults, opts);

		 // if (!options.cards) options.cards = options.lsgwoerter;

		return this.each(function(){
			var $this = $(this);

			options.words = options.words.toUpperCase()

			// var lsgwoerter = [
			// 	["J", "A", "P", "O", "N"],
			// ]

        	// options.words.forEach(function(elem) {
        	// 	elem.paragraph = elem;
        	// });


			// var random = Math.floor((Math.random()*(lsgwoerter.length-1))); 
			// var lsgword = lsgwoerter[random]; //La palabra para adivinar será elegida de la matriz anterior
			// var ratewort = new Array(lsgword.length);
			// var error = 0;

			var _events = {
				init: function() {
				   var letterfield = $("#letterfield"), text = ''; 
				   for (var i = 0; i < ratewort.length; i++){
					   text += ratewort[i];
				   }
				   letterfield.text(text);
				}
		  	};


			var elems = [];
			elems.container = $this.addClass('hangman-game');
			elems.form = $('<form>', { Class: 'formulario', name: 'letterform'}).appendTo(elems.container);
			elems.img = $('<img>', { Id: 'hangman', src: 'img/aho0.png'}).appendTo(elems.form);
			elems.inputLetter = $('<input>', { Class: 'inputLetter', name: 'lettercharacter', type:'text'}).appendTo(elems.form);
			elems.inputButton = $('<input>', { Class: 'buttonLetter', name: 'ratebutton', type:'button', value: 'Guess'}).appendTo(elems.form);
			elems.paragraph = $('<p>', {Id: 'letterfield'}).appendTo(elems.form);
			elems.campus = $('<p>', { Id: 'gerateneBuchstaben'}).appendTo(elems.form);




			//Comprueba si la letra proporcionada por el usuario coincide con una o más de las letras de la palabra
			elems.inputButton.on('click', function(){
					   var f = document.letterform; 
					   var b = f.elements["lettercharacter"]; 
					   var character = b.value; // La carta proporcionada por el usuario
					   character = character.toUpperCase();
					   for (var i = 0; i < lsgword.length; i++){
					      if(lsgword[i] === character){
					         ratewort[i] = character + " ";
					         var treffer = true;
					      }
					   	b.value = "";
				   		}




				   //Elimina el campo de predicción y lo reemplaza con el nuevo
				   var letterfield = $("#letterfield");
				   letterfield.innerHTML=""; 
				   _events.init();




				   // Si una letra adivinada no está en la palabra, la letra será puesta en las "letras equivocadas" -list y el verdugo crece
				   if(!treffer){
						var gerateneBuchstaben = $("#gerateneBuchstaben");
						var buchstabe = document.createTextNode(" " + character);
						var hangman = $("#hangman");

						gerateneBuchstaben[0].appendChild(buchstabe); 
						hangman.attr('src', "img/aho" + error + ".png");
						error++;
				   }
				   
				   //Comprueba si se han encontrado todas las letras
				   var fertig = true;
				   for (var i = 0; i < ratewort.length; i++){
				      if(ratewort[i] === "_ "){
				         fertig = false;
				      }
				   }
				   if(fertig){
				      window.alert("You win!");
				   }

			});
			// Cada letra de la palabra está simbolizada por un guión bajo en el campo de adivinación
			for (var i = 0; i < ratewort.length; i++){
			   ratewort[i] = "_ ";
			}
	
			_events.init();

		});
	}
})(jQuery);








