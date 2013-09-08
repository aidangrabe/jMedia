jMedia
======

jQuery media query library

jMedia is a library that emulates CSS media queries using JavaScript and
jQuery. It also adds the ability to execute JavaScript for each media
query using callbacks.

#### Scripting
This is useful for example, if we wanted to show a hamburger menu on mobile
devices instead of the regular navigation menu on tablet and desktop devices.

In this case we would create a breakpoint for mobile and add the hamburger
menu code to this breakpoint.
We would then create a breakpoint for tablet (maybe 800px?) and clear the
effects of the hamburger menu code in this breakpoint.

#### Styling
jMedia also allows you to style your page for different screen sizes on older
browsers that don't support media queries.

Once you have created the breakpoints, your CSS might look like this:
```
.mobile nav li {
    display: block;
}

.tablet nav li {
    display: inline;
}

.tablet nav li a {
    float: right;
}
```

## Dependancies
- jQuery

## Usage

```javascript
// create the breakpoints
window.jmedia
    .addBreakPoint('mobile', 480)
    .addBreakPoint('tablet', 800);

// do stuff in the callback funtion
window.jmedia.onchange = function(c) {
    switch (c) {
    case 'mobile':
        createHamburgerMenu();
        break;
    case 'tablet':
        hideHamburgerMenu();
        break;
    }
};
```

