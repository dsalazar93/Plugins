;(function($, window, undefined){
	"use strict";

    $.fn.relateWords = function(opts) {

    	var defaults = {};
        var options = $.extend({}, defaults, opts);

        return this.each(function() {            
            var container = $(this);
            var wordClass = "cont_" + $(this).attr('class');
            var wordBtnClass =  "button_" + $(this).attr('class');
            var spaceWords = ""+
                "<div class='row'>"+
                    "<div class='"+wordClass+" col-md-8 col-sm-8 col-xs-8 col-md-offset-2 col-sm-offset-2 col-xs-offset-2 lnt_relateword_box_border lnt_relateword_boxRow "+wordClass+"'>"+
                    "</div>"+
                "</div>"; 

            var wordOneArray = [];
            var wordTwoArray = [];
            options.groups.forEach(function(group, pos){
                wordOneArray.push(group.wordOne);
                wordTwoArray.push(group.wordTwo);
            });
            console.log(wordOneArray);
            console.log(wordTwoArray);

            container.append(spaceWords);

            var wordFullArray = [];
            for (var i = 0; i < (wordOneArray.length); i++) 
            {
                wordFullArray.push(wordOneArray[i]);
                wordFullArray.push(wordTwoArray[i]);                
            }
            wordFullArray = ShuffleArray(wordFullArray);
            console.log(wordFullArray);

            var wordHtml;
            for (var i = 0; i < wordFullArray.length; i++) 
            {
                var textToHtml = ""+ 
                    "<div class='col-xs-4 col-sm-4 col-md-4'>"+
                        "<center>"+
                            "<button type='button' class='"+wordBtnClass+" btn btn-default btn-lg lnt_relateword_button'>"+wordFullArray[i]+"</button>"+
                        "</center>"+
                    "</div>";
                var objectWord = $("."+wordClass+"");
                objectWord.append(textToHtml);
            }

            var wordBtn = $('.'+wordBtnClass+'');
            var elementsClicked = 0;
            var wordSelected = [];
            var wordSavePos = [];
            wordBtn.on('click', function() {
                var $this = $(this);
                var twoWords = 0;
                if (elementsClicked < 2 && !($($this).hasClass('btn-warning')))
                {
                    $this.addClass('btn-warning').removeClass('btn-default');
                    wordSelected.push($this.text());
                    elementsClicked++;
                }              
                
                if (elementsClicked == 2) 
                {
                    console.log(wordSelected);
                    for (var i = 0; i < wordSelected.length; i++) 
                    {
                        for (var j = 0; j < wordOneArray.length; j++) {
                            if (wordSelected[i] == wordOneArray[j]) 
                            {
                                wordSavePos.push(j);
                            }
                            else if (wordSelected[i] == wordTwoArray[j])
                            {
                                wordSavePos.push(j);
                            }
                        } 
                    }
                    if (wordSavePos[0] == wordSavePos[1]) 
                    {
                        $("."+wordBtnClass+"").each(function(index, el) {
                            if ($(el).hasClass('btn-warning')) 
                            {
                                $(el).removeClass('btn-warning').addClass('btn-success disabled animated zoomIn');
                                $(el).prop('disabled', true);
                            }
                        });
                        elementsClicked = 0;
                        wordSavePos = [];
                        wordSelected = [];
                    }
                    else
                    {
                        setTimeout(function(){
                            $("."+wordBtnClass+"").each(function(index, el) {
                                if ($(el).hasClass('btn-warning')) 
                                {
                                    $(el).removeClass('btn-warning').addClass('btn-default animated shake');
                                }
                                setTimeout(function(){$(el).removeClass('animated shake')}, 300);
                            });
                        }, 300);
                        elementsClicked = 0;
                        wordSavePos = [];
                        wordSelected = [];
                    }                   
                }
            });

            ;

                

            function ShuffleArray(wordArray)
            {
                var currentIndex = wordArray.length, temporaryValue, randomIndex;
                //Mientras haya elementos, barajar...
                while (0 !== currentIndex) 
                {
                    // Escoger una pocisión del array...
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;

                    // Intercambiar con el elemento actual.
                    temporaryValue = wordArray[currentIndex];
                    wordArray[currentIndex] = wordArray[randomIndex];
                    wordArray[randomIndex] = temporaryValue;
                }

                return wordArray;

            }
           


        });
    }

})(jQuery, window);