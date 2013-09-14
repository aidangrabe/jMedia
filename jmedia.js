(function($) {
    var $body = $('body');
    var lastClass = "none";
    var breakPoints = [];

    // assign any window resize function to a variable so as not to override
    // any previous functionality
    var oldWindowResize = (typeof window.onresize == "function")
        ? window.onresize : function() {};

    window.onresize = function() {
        // call the original event
        oldWindowResize();

        var newClass = '';

        // loop through the break points to check which one the current width
        // falls into
        for (var key in breakPoints) {
            var breakPoint = breakPoints[key];
            if (document.width < breakPoint.width) {
                newClass = breakPoint.class;
            }
            // essentially removes all breakpoint classes from the body
            $body.removeClass(breakPoint.class);
        }
        // default class
        if (newClass == "")
            newClass = breakPoints[0].class;

        // add the new breakpoint class to the body
        $body.addClass(newClass);

        // if the breakpoint hasn't changed, return here and call the onresize
        // callback
        if (newClass == lastClass) {
            window.jmedia.onresize(newClass);
            lastClass = newClass;
            return;
        }
        // execute both methods as the window has been resized + the breakpoint
        // class has changed
        window.jmedia.onresize(newClass);
        window.jmedia.onchange(lastClass, newClass);
        lastClass = newClass;
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
                return b.width - a.width
            });
            return this;
        },
        /**
         * @callback
         * called when the window is resized and the breakpoin is changed. the
         * breakpoint name is passed in as c
         */
        onchange: function(oldClass, newClass) {},
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

