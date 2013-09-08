(function($) {
    var $body = $('body');
    var lastWidth = document.width;
    var breakPoints = [];

    // assign any window resize function to a variable so as not to override
    // any previous functionality
    var oldWindowResize = (typeof window.onresize == "function")
        ? window.onresize : function() {};

    window.onresize = function() {
        // call the original event
        oldWindowResize();

        var w = document.width;
        var newWidth  = 0;
        var newClass = '';

        // loop through the break points to check which one the current width
        // falls into
        for (var key in breakPoints) {
            var breakPoint = breakPoints[key];
            if (newWidth == 0 && w < breakPoint.width) {
                newWidth = breakPoint.width;
                newClass = breakPoint.class;
                // if we are in the same breakpoint as the last check, don't
                // change the class of any elements, and only run the onresize
                // method, not the onchange method
                if (lastWidth == newWidth) {
                    window.jmedia.onresize(newClass);
                    return;
                }
            }
            // essentially removes all breakpoint classes from the body
            $body.removeClass(breakPoint.class);
        }

        // add the new breakpoint class to the body
        $body.addClass(newClass);
        // update the last check width
        lastWidth = newWidth;

        // execute both methods as the window has been resized + the breakpoint
        // class has changed
        window.jmedia.onresize(newClass);
        window.jmedia.onchange(newClass);
    };

    window.jmedia = {
        /**
         * add a breakpoint to jmedia. A breakpoint is similar to a media query
         * in CSS.
         * @param String c the name of the breakpoint. eg. 'mobile', 'tablet'
         *      etc.
         * @param int w the width upto which this breakpoint will be active.
         *      eg. 480 means this breakpoint will be activated when the width
         *      of the window is LESS than or equal to 480.
         * @return jmedia current object, allows for chaining
         * eg.
         *      jmedia
         *          .addBreakPoint('mobile', 480)
         *          .addBreakPoint('tablet', 800);
         * if the window is smaller than 480, the 'body' tag will have a class
         * of 'mobile', if the window is smaller than 800 but greater than 480,
         * the body tag will have a class of 'tablet'.
         * when the window is resized, and chages from one breakpoint to
         * another, the jmedia.onchange(c) callback is executed.
         * when the window is resized, but the breakpoint does not change, the
         * jmedia.onresize(c) callback is executed.
         * both callbacks get the current breakpoint name passed in as an
         * argument: c.
         */
        addBreakPoint: function(c, w) {
            breakPoints.push({class: c, width: w});
            breakPoints = breakPoints.sort(function(a, b) {
                return a.width - b.width
            });
            return this;
        },
        /**
         * @callback
         * called when the window is resized and the breakpoin is changed. the
         * breakpoint name is passed in as c
         */
        onchange: function(c) {},
        /**
         * @callback
         * called when the window is resized but the breakpoint stays the same
         * breakpoint name is passed in as c
         */
        onresize: function(c) {},
        /**
         * manually check if a breakpoint has changed
         */
        resize: window.onresize
    };

    $(window).ready(function() {
        $body = $('body');
        window.onresize();
    });
})(jQuery);

