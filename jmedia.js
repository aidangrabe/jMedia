(function($) {
    var $body = $('body');
    var lastWidth = document.width;
    var breakPoints = [
        //{class: 'mobile', width: 480},
        //{class: 'tablet', width: 720}
    ];

    var oldWindowResize = function(){};
    if (typeof window.onresize === "function") {
        oldWindowResize = window.onresize;
    }
    window.onresize = function() {
        // call the original event
        oldWindowResize();

        var w = document.width;
        var newWidth  = 0;
        var newClass = '';

        for (var key in breakPoints) {
            var breakPoint = breakPoints[key];
            if (newWidth == 0 && w < breakPoint.width) {
                newWidth = breakPoint.width;
                newClass = breakPoint.class;
                if (lastWidth == newWidth) return;
            }
            $body.removeClass(breakPoint.class);
        }

        $body.addClass(newClass);
        lastWidth = newWidth;
        window.jmedia.onresize(newClass);
    };

    window.jmedia = {
        addBreakPoint: function(c, w) {
            breakPoints.push({class: c, width: w});
            breakPoints = breakPoints.sort(function(a, b) {
                return a.width - b.width
            });
        },
        onresize: function() {},
        resize: window.onresize
    };

    $(window).ready(function() {
        $body = $('body');
        window.onresize();
    });
})(jQuery);

