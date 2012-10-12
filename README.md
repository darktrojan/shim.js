shim.js
=======

This is a small javascript file to bring Internet Explorer 8 & 9 up to speed with some functions I commonly use. It is not intended to be a complete implementation (or even strictly accurate) of those functions, just enough to get by in 99% of cases. To use it, add this code to your HTML's `<head>` tag:

    <!--[if IE 8]><script src="shim.js" type="text/javascript"></script><![endif]-->
    <!--[if IE 9]><script src="shim.js" type="text/javascript"></script><![endif]-->

Functions added:
----------------

* `Array.indexOf`
* `Date.now`
* `String.trim`
* `Element.classList` (only `add`, `remove` and `contains` functions) - this is the only part shim.js is required for in IE9
* `Element.textContent`
* `Element.localName`
* `addEventListener` and `removeEventListener` on `window`, `document`, and `Element`
* `document.getElementsByClassName`

It also creates one of each of the new HTML5 elements, so you can use them in your page without IE making a mess. You should add this code to your CSS if you're using the elements:

    article, aside, footer, header, hgroup, nav, section {
        display: block;
    }
