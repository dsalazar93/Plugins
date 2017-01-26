;(function($, window, undefined){
	"use strict";

    $.fn.wordswithtopics = function(opts) {

    	var defaults = {};
        var options = $.extend({}, defaults, opts);

        return this.each(function() {  
            var wordsByGroup = Object.keys(options.groups[0]).length;          
            var container = $(this);
            var wordClass = "cont_" + $(this).attr('class');
            var wordBtnClass =  "button_" + $(this).attr('class');
            var spaceWords = ""+
                "<div class='row'>"+
                    "<div class='"+wordClass+" col-md-8 col-sm-8 col-xs-8 col-md-offset-2 col-sm-offset-2 col-xs-offset-2 lnt_wordswithtopics_box_border lnt_wordswithtopics_boxRow "+wordClass+"'>"+
                    "</div>"+
                "</div>";
            var spaceTopics = ""+
                "<div class='row'>"+
                    "<div class='col-md-8 col-sm-8 col-xs-8 col-md-offset-2 col-sm-offset-2 col-xs-offset-2' id='sectionTopics'>"+
                    "</div>"+
                "</div>";


            var wordArray1 = [];
            var wordArray2 = [];
            var wordArray3 = [];
            var wordArray4 = [];
            var wordArray5 = [];
            var wordArray6 = [];
            options.groups.forEach(function(group, pos){
                wordArray1.push(group.wordOne);
                wordArray2.push(group.wordTwo);
                wordArray3.push(group.wordThree);
                wordArray4.push(group.wordFour);
                wordArray5.push(group.wordFive);
                wordArray6.push(group.wordSix);
            });

            container.append(spaceWords);
            container.append(spaceTopics);

            var wordFullArray = [];
            for (var i = 0; i < (wordArray1.length); i++) 
            {
                wordFullArray.push(wordArray1[i]);
                wordFullArray.push(wordArray2[i]);
                wordFullArray.push(wordArray3[i]);
                wordFullArray.push(wordArray4[i]);
                wordFullArray.push(wordArray5[i]);
                wordFullArray.push(wordArray6[i]);                
            }

            for (var i = 0; i < options.randomWords.length; i++) {
                wordFullArray.push(options.randomWords[i]);
            }

            wordFullArray = ShuffleArray(wordFullArray);
            console.log(wordFullArray);

            var wordHtml;
            for (var i = 0; i < wordFullArray.length; i++) 
            {
                var textToHtml = ""+ 
                    "<div class='col-xs-4 col-sm-4 col-md-4'>"+
                        "<center>"+
                            "<button type='button' class='"+wordBtnClass+" btn btn-default btn-lg lnt_wordswithtopics_button'>"+wordFullArray[i]+"</button>"+
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
                if (elementsClicked < wordsByGroup && !($($this).hasClass('btn-warning')))
                {
                    $this.addClass('btn-warning').removeClass('btn-default');
                    wordSelected.push($this.text());
                    elementsClicked++;
                }
                else if ($($this).hasClass('btn-warning')) 
                {
                    $this.addClass('btn-default').removeClass('btn-warning');
                    elementsClicked--;
                }         
                
                if (elementsClicked == wordsByGroup) 
                {
                    console.log(wordSelected);
                    for (var i = 0; i < wordSelected.length; i++) 
                    {
                        for (var j = 0; j < wordArray1.length; j++) {
                            if (wordSelected[i] == wordArray1[j]) 
                            {
                                wordSavePos.push(j);
                            }
                            if (wordSelected[i] == wordArray2[j])
                            {
                                wordSavePos.push(j);
                            }
                            if (wordSelected[i] == wordArray3[j]) 
                            {
                                wordSavePos.push(j);
                            }
                            if (wordSelected[i] == wordArray4[j])
                            {
                                wordSavePos.push(j);
                            }
                            if (wordSelected[i] == wordArray5[j]) 
                            {
                                wordSavePos.push(j);
                            }
                            if (wordSelected[i] == wordArray6[j])
                            {
                                wordSavePos.push(j);
                            }
                        } 
                    }

                    if (wordSavePos.length == wordsByGroup)
                    {
                        var wordsSelectedEqual = wordSavePos.allValuesSame();
                    }
                    else
                    {
                        console.log("No");
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


                    if (wordsSelectedEqual) 
                    {
                        console.log("Si");
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
                        $('.pop-good').trigger('click');
                    }
                    else
                    {
                        console.log("No");
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

            Array.prototype.allValuesSame = function() {

                for(var i = 1; i < this.length; i++)
                {
                    if(this[i] !== this[0])
                        return false;
                }

                return true;
            }
           


        });
    }

})(jQuery, window);