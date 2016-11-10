;(function($, undefined){
	"use strict";

	if (!$.popup) {
		alert('jQuery Popup is not defined');
		$.popup = function(){};
	}

	$.fn.memoryGame = function(opts){

		var defaults = {}

		var options = $.extend({}, defaults, opts);

		return this.each(function(){
			var $this = $(this);

			var elems = [];
			elems.container = $this.addClass('container lnt-dnd-container');
			elems.row = $('<div>', {Class: 'row'}).appendTo(elems.container);
			
			elems.right = $('<div>', { Class: 'col-md-12 lnt-dnd-right'}).appendTo(elems.row);
			elems.left = $('<div>', { Class: 'col-md-12 lnt-dnd-left'}).appendTo(elems.row);
			
			elems.ulRight = $('<ul>', { Class: 'col-md-12'}).appendTo(elems.right);
			elems.ulLeft = $('<ul>', { Class: 'col-md-12'}).appendTo(elems.left);




			options.game.forEach(function(elem){
				var li = $('<li>', { Class: 'lnt-content-middle col-md-2 col-md-offset-1'})
							.appendTo(elems.ulRight)
							.html('<div>' + elem.text + '</div>')
							.droppable({
								drop: function(evt, origin) {
									var $origin = $(origin.helper);
									if ($origin.data('reference') == elem.id) {
										$origin.remove();

										if(elem.popupID)
											$.popup({ id: elem.popupID});

										if(elem.popuptext)
											$.popup(elem.popuptext);
									}
								}
							})
			});

		});
	}




function initGame(){

  var error = 0;
    
    $('.panel').each(function(index, element) {
          $(this).removeClass('flip animated zoomOut');
      });

    console.log('Juego inicializado');
    var firstObj = new Object();
    var secontObj = new Object();
    var count = 0;
    var selected = [];  

    $('.panel').click(function(){
      if( $.inArray($(this).prop('id'),selected) !== -1 ) 
      {
        console.log("El elemento ya fue seleccionado previamente por el usuario");
        return;
      }
      if( !firstObj.id )
      {
        firstObj.id = $(this).prop('id');
        firstObj.key = $(this).attr('key');
        $(this).addClass('flip');
        console.log({FirstID: firstObj.id, FirstKEY: firstObj.key});  
      }
      else
      {
        secontObj.id = $(this).prop('id');
        secontObj.key = $(this).attr('key');
        $(this).addClass('flip');
        console.log({SecontID: secontObj.id, SecontKEY: secontObj.key});
        if( firstObj.id != secontObj.id )
        {
          if( firstObj.key == secontObj.key )
          {
            setTimeout(function()
            {
              console.log('El usuario encontro una pareja');
              //sg.sound('success-low');
              count++;
              $('#'+firstObj.id).addClass('animated zoomOut');
              $('#'+secontObj.id).addClass('animated zoomOut');
              selected.push(firstObj.id,secontObj.id);
              firstObj.id  = undefined;
              secontObj.id = undefined;
              if( count == 5 )
              {//numero de parejas
                setTimeout(function()
                {
                  var sound = new Howl({urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/win.mp3']}).play();
                  console.log('El usuario completo el juego');
                  $(".pop-good").trigger('click');
                },1000)
              }
              console.log({Aciertos:count,ElementosSeleccionados:selected});
            },500)          
          }
          else
          {
            setTimeout(function()
            {
              error++;
              if (error==3){window.location.reload();}
              console.log('El usuario no encontro una pareja');
              $('#'+firstObj.id).removeClass('flip');
              $('#'+secontObj.id).removeClass('flip');
              firstObj.id  = undefined;
              secontObj.id = undefined; 
            },500)
          }
        }
        else
        {
          console.log('El usuario selecciono el mismo obj');
          $('#'+firstObj.id).removeClass('flip');
          firstObj.id  = undefined;
          secontObj.id = undefined;
        } 
      }   
    });
  }


function comprobar()
{
  var ok=false;
  var fin=true;
  var i;
  var anterior;
  if (letra.value!="")
  {
     anterior=estado.value;
     estado.value="";
     for(i=0; i<n; i++)
        if(peliculas[peli].charAt(i).toUpperCase()==letra.value.toUpperCase())
        {
           ok=true;
           estado.value=estado.value + peliculas[peli].charAt(i);
        }
        else
           estado.value=estado.value + anterior.charAt(i);
     usadas.value=usadas.value + letra.value + " ";
     if (!ok)
     {
        fallos++;
        switch (fallos)
        {
           case 1:
              imagen0.addClass('none');
              imagen1.removeClass('none');
              break;
           case 2:
              imagen1.addClass('none');
              imagen2.removeClass('none');
              break;
           case 3:
              imagen2.addClass('none');
              imagen3.removeClass('none');
              break;
           case 4:
              imagen3.addClass('none');
              imagen4.removeClass('none');
              break;
           case 5:
              imagen4.addClass('none');
              imagen5.removeClass('none');
              break;
           case 6:
              imagen5.addClass('none');
              imagen6.removeClass('none');
              var sound = new Howl({urls: ['sound/wrong.mp3']}).play();
              $('.pop-bad').trigger('click');
        }
     }
  }
  i=0;
  while (i<n && fin)
     if(estado.value.charAt(i)=="-")
        fin=false;
     else
        i++;
  if (fin){
    pg++;
    if (pg==7){
      $('.pop-good').trigger('click');
      var sound = new Howl({urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/win.mp3']}).play();
    }
    reiniciar();
    var sound = new Howl({urls: ['sound/success.mp3']}).play();
    $('.btn-next').trigger('click');
    progress();
  }

  letra.value="";
  letra.focus();
}

function reiniciar()
         {
            var i;
            fallos=0;
            imagen0.removeClass('none');
            imagen1.addClass('none');
            imagen2.addClass('none');
            imagen3.addClass('none');
            imagen4.addClass('none');
            imagen5.addClass('none');
            imagen6.addClass('none');
            estado.value="";
            usadas.value="";
            peli=pg;
            n=peliculas[peli].length;
            for(i=0; i<n; i++)
               if (peliculas[peli].charAt(i)==" ")
                  estado.value=estado.value + " ";
               else
                  estado.value=estado.value + "-";
            letra.focus();   
         }









})(jQuery)




