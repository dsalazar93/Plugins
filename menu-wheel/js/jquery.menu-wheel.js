;(function($, undefined){

    $.fn.menuWheel = function(opt) {

        var options = {
            numBtns: 10,
            radius: 150,
            translateY: '70%'
        }

        options = $.extend({}, options, opt);

        return this.each(function(){
            var $this = $(this);

            if ($this.data('num-btns'))
                options.numBtns = $this.data('num-btns');

            if ($this.data('radius'))
                options.radius = $this.data('radius');
            
            $this.css({ 
                width: options.radius*2, 
                height: options.radius*2,
                transform: 'translateY(' + options.translateY + ')'
            });

            options.radius = parseInt($this.css('width'))/2;

            var delta = Math.PI*2/(options.numDivs ? options.numDivs : options.numBtns + 1);
            var rds = options.radius/8;

            var _events = {
                init: function() {
                    for(var i = 0; i < options.numBtns; i++) {
                        var theta = delta*i;
                        var btn = $('<div>', {Class: 'unc-menu-wheel-btn'})
                                    .html(i)
                                    .data('theta', theta)
                                    .data('idx', i)
                                    .appendTo($this)
                                    .css({
                                        width: rds*2,
                                        height: rds*2,
                                        top: 'calc(50% - ' + (options.radius-rds*1.5)*Math.sin(theta + Math.PI/2) + 'px)',
                                        left: 'calc(50% - ' + (options.radius-rds*1.5)*Math.cos(theta + Math.PI/2) + 'px)',
                                        transform: 'translate(-50%, -50%) rotate(' + (-(Math.PI/2)+theta + Math.PI/2) + 'rad)'
                                    });

                        if (options.images && options.images[i])
                            btn.css('background-image', 'url(' + options.images[i] + ')');

                        btn.on('click', function() {
                            var _$this = $(this);

                            options.btnFunctions && options.btnFunctions[_$this.data('idx')]
                                    && options.btnFunctions[_$this.data('idx')]()

                            $this.css('transform', 'translateY(' + options.translateY + ') rotate(-' + _$this.data('theta') + 'rad)');
                        })
                    }
                },
                resize: function() {
                    if (options.radius == parseInt($this.css('width'))/2) return;
                    
                    options.radius = parseInt($this.css('width'))/2;
                    var rds = options.radius/8;
                    
                    $this.find('.unc-menu-wheel-btn').each(function(i, btn){
                        var theta = delta*i;
                        
                        $(btn).css({
                            width: rds*2,
                            height: rds*2,
                            top: 'calc(50% - ' + (options.radius-rds*1.5)*Math.sin(theta + Math.PI/2) + 'px)',
                            left: 'calc(50% - ' + (options.radius-rds*1.5)*Math.cos(theta + Math.PI/2) + 'px)',
                        })
                    });
                }
            }

            _events.init();
            $(window).on('resize', _events.resize)
        });

    }

})(jQuery)