(()=>{"use strict";var n={729:(n,r,e)=>{e.d(r,{Z:()=>s});var t=e(81),o=e.n(t),a=e(645),i=e.n(a)()(o());i.push([n.id,'.container {\r\n    display: grid;\r\n    grid-template-columns: 1fr;\r\n    grid-template-rows: 1fr;\r\n    gap: 0px 0px;\r\n    grid-auto-flow: row;\r\n    justify-content: center;\r\n    align-content: center;\r\n    justify-items: stretch;\r\n    align-items: stretch;\r\n    grid-template-areas:\r\n        "consultInfo";\r\n}\r\n\r\n.consultInfo {\r\n    grid-area: consultInfo;\r\n}\r\n\r\n.arrow {\r\n    position: absolute;\r\n    bottom: 15%;\r\n    right: 5%;\r\n    transform: translate(-50%, -50%);\r\n    transform: rotate(0deg);\r\n    cursor: pointer;\r\n}\r\n\r\n.arrow span {\r\n    display: block;\r\n    width: 1.5vw;\r\n    height: 1.5vw;\r\n    border-bottom: 5px solid var(--purple);\r\n    border-right: 5px solid var(--purple);\r\n    transform: rotate(45deg);\r\n    margin: -10px;\r\n    animation: animate 2s infinite;\r\n}\r\n\r\n.arrow span:nth-child(2) {\r\n    animation-delay: -0.2s;\r\n}\r\n\r\n.arrow span:nth-child(3) {\r\n    animation-delay: -0.4s;\r\n}\r\n\r\n@keyframes animate {\r\n    0% {\r\n        opacity: 0;\r\n        transform: rotate(45deg) translate(-20px, -20px);\r\n    }\r\n    50% {\r\n        opacity: 1;\r\n    }\r\n    100% {\r\n        opacity: 0;\r\n        transform: rotate(45deg) translate(20px, 20px);\r\n    }\r\n}',""]);const s=i},150:(n,r,e)=>{e.d(r,{Z:()=>s});var t=e(81),o=e.n(t),a=e(645),i=e.n(a)()(o());i.push([n.id,":root {\r\n    /* Setup some variables for the colour palette */\r\n    --green: rgb(159, 214, 224);\r\n    --purple: rgb(206, 202, 230);\r\n    --navy: rgb(78, 109, 179);\r\n    --grey: rgb(219, 231, 242);\r\n    --white: rgb(250, 250, 250);\r\n    --black: rgb(20, 20, 20);\r\n\r\n    /* Setup some faded versions of the colour pallete  */\r\n    --green-fade: rgba(159, 214, 224, 0.3);\r\n    --purple-fade: rgba(206, 202, 230, 0.3);\r\n    --navy-fade: rgba(78, 109, 179, 0.3);\r\n    --grey-fade: rgba(219, 231, 242, 0.3);\r\n    --white-fade: rgba(250, 250, 250, 0.3);\r\n    --black-fade: rgba(20, 20, 20, 0.3);\r\n}\r\n\r\nhtml,\r\nbody {\r\n    width: 100%;\r\n    height: 100%;\r\n}\r\n\r\n#loadOverlay {\r\n    overflow: hidden;\r\n    display: none;\r\n}\r\n\r\nbody {\r\n    background-color: var(--white);\r\n    overflow-x: hidden;\r\n    font-family: 'Open Sans', sans-serif;\r\n    font-size: 17px;\r\n    font-size: 2vh;\r\n    line-height: 2;\r\n}\r\n\r\n.dropShadow {\r\n    -webkit-box-shadow: 0px 0px 12px 0px var(--purple-fade);\r\n    box-shadow: 0px 0px 12px 0px var(--purple-fade);\r\n}\r\n\r\n.consultLists {\r\n    color: var(--navy);\r\n    font-size: 1.4em;\r\n}\r\n\r\n\r\n/* Add a black background color to the top navigation */\r\n.topnav {\r\n    position: fixed;\r\n    left: 0;\r\n    top: 0;\r\n    /* backdrop-filter: blur(25px); */\r\n    background: var(--white);\r\n    width: 100%;\r\n    display: flex;\r\n    justify-content: space-evenly;\r\n    flex-wrap: wrap;\r\n    -webkit-box-shadow: 0px 0px 12px 0px var(--purple-fade);\r\n    box-shadow: 0px 0px 12px 0px var(--purple-fade);\r\n    border: 1px solid var(--purple-fade);\r\n}\r\n\r\n/* Style the links inside the navigation bar */\r\n.topnav a {\r\n    float: left;\r\n    color: var(--black);\r\n    text-align: center;\r\n    padding: 14px 16px;\r\n    text-decoration: none;\r\n    font-size: 1em;\r\n    margin-left: 2%;\r\n    transition: 0.4s;\r\n}\r\n\r\n/* Change the color of links on hover */\r\n.topnav a:hover {\r\n    color: var(--navy);\r\n    translate: 0px 2px;\r\n    transition: 0.2s;\r\n}\r\n\r\n/* Add a color to the active/current link */\r\n.topnav a.active {\r\n    color: var(--navy);\r\n}\r\n\r\n/* Generic minimal line */\r\n.slimBorder {\r\n    border: 1px solid var(--purple-fade);\r\n    border-style: solid solid solid solid;\r\n}\r\n\r\n/* Purple line spacer to use inbetween text blocks */\r\n.purpleLine {\r\n    border: 1px solid var(--purple-fade);\r\n    border-style: solid;\r\n    width: 100%;\r\n    /* filter: drop-shadow(1px 1px 1px var(--green)); */\r\n    border-radius: 32px;\r\n    margin-bottom: 2%;\r\n    \r\n}\r\n\r\n.hidden {\r\n    display: none;\r\n}\r\n\r\n/* add a footer */\r\nfooter {\r\n    position: fixed;\r\n    left: 0;\r\n    bottom: 0;\r\n    width: 100%;\r\n    background-color: var(--white);\r\n    color: var(--white);\r\n    text-align: center;\r\n    border: 1px solid var(--purple-fade);\r\n    -webkit-box-shadow: 0px 0px 12px 0px var(--purple-fade);\r\n    box-shadow: 0px 0px 12px 0px var(--purple-fade);\r\n}\r\n\r\na {\r\n    color: var(--black);\r\n    font-weight: bold;\r\n}\r\n\r\nul {\r\n    list-style: none;\r\n    padding-inline-start: 10px;\r\n}\r\n\r\nul li::before {\r\n    /* Add content: \\2022 is the CSS Code/unicode for a bullet */\r\n    content: \"\\2022\";\r\n    color: var(--green);\r\n    display: inline-block;\r\n    font-weight: bolder;\r\n    font-size: 2vh;\r\n    /* Needed to add space between the bullet and the text */\r\n    width: 1em;\r\n    /* Also needed for space (tweak if needed) */\r\n    margin-left: -1em;\r\n    /* Also needed for space (tweak if needed) */\r\n}\r\n\r\n.collapsable {\r\n    display: block;\r\n}\r\n\r\n.arrow {\r\n    pointer-events: none;\r\n}\r\n\r\n\r\nh1, h2, h3 {\r\ncolor: var(--navy);    \r\n}\r\n\r\n.navSpacer {\r\n    transition: 0.5s;\r\n}\r\n\r\n/* ========== MOBILE ======= */\r\n@media screen and (max-width: 760px) {\r\n    .topnav a {\r\n        float: none;\r\n        display: none;\r\n        text-align: left;\r\n    }\r\n\r\n    .navSpacer {\r\n        height: 10vh;\r\n    }\r\n\r\n    .defaultMargin {\r\n        margin-left: 7%;\r\n        margin-right: 7%;\r\n        margin-top: 1%;\r\n    }\r\n\r\n    .material-symbols-outlined {\r\n        font-variation-settings:\r\n            'FILL'0,\r\n            'wght'700,\r\n            'GRAD'200,\r\n            'opsz'48;\r\n        /* display: none; */\r\n        float: left;\r\n        color: var(--black);\r\n        text-align: center;\r\n        padding: 14px 16px;\r\n        text-decoration: none;\r\n        margin-left: 2%;\r\n        display: block;\r\n        font-size: 2em;\r\n    }\r\n\r\n    .material-symbols-outlined:hover {\r\n        color: var(--navy);\r\n        translate: 0px 2px;\r\n        transition: 0.1s;\r\n    }\r\n    .center {\r\n        text-align: center;\r\n    }\r\n    \r\n}\r\n\r\n/* ========== TABLET ======= */\r\n@media screen and (min-width: 761px) and (max-width: 1200px) {\r\n    .topnav a {\r\n        float: none;\r\n        display: block;\r\n        text-align: left;\r\n    }\r\n\r\n    .navSpacer {\r\n        height: 15vh;\r\n    }\r\n\r\n    .defaultMargin {\r\n        margin-left: 20%;\r\n        margin-right: 20%;\r\n        margin-top: 1%;\r\n    }\r\n\r\n    .material-symbols-outlined {\r\n        display: none;\r\n    }\r\n    .center {\r\n        text-align: center;\r\n    }\r\n    \r\n}\r\n\r\n/* ========== DESKTOP ======= */\r\n@media screen and (min-width: 1201px) {\r\n    .navSpacer {\r\n        width: 100%;\r\n        height: 10vh;\r\n    }\r\n\r\n    .defaultMargin {\r\n        margin-left: 25%;\r\n        margin-right: 25%;\r\n        margin-top: 1%;\r\n    }\r\n\r\n    .material-symbols-outlined {\r\n        display: none;\r\n    }\r\n    .center {\r\n        text-align: center;\r\n    }\r\n    \r\n}",""]);const s=i},24:(n,r,e)=>{e.d(r,{Z:()=>s});var t=e(81),o=e.n(t),a=e(645),i=e.n(a)()(o());i.push([n.id,'/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\r\n\r\n/* Document\r\n   ========================================================================== */\r\n\r\n/**\r\n * 1. Correct the line height in all browsers.\r\n * 2. Prevent adjustments of font size after orientation changes in iOS.\r\n */\r\n\r\nhtml {\r\n  line-height: 1.15; /* 1 */\r\n  -webkit-text-size-adjust: 100%; /* 2 */\r\n}\r\n\r\n/* Sections\r\n   ========================================================================== */\r\n\r\n/**\r\n * Remove the margin in all browsers.\r\n */\r\n\r\nbody {\r\n  margin: 0;\r\n}\r\n\r\n/**\r\n * Render the `main` element consistently in IE.\r\n */\r\n\r\nmain {\r\n  display: block;\r\n}\r\n\r\n/**\r\n * Correct the font size and margin on `h1` elements within `section` and\r\n * `article` contexts in Chrome, Firefox, and Safari.\r\n */\r\n\r\nh1 {\r\n  font-size: 2em;\r\n  margin: 0.67em 0;\r\n}\r\n\r\n/* Grouping content\r\n   ========================================================================== */\r\n\r\n/**\r\n * 1. Add the correct box sizing in Firefox.\r\n * 2. Show the overflow in Edge and IE.\r\n */\r\n\r\nhr {\r\n  box-sizing: content-box; /* 1 */\r\n  height: 0; /* 1 */\r\n  overflow: visible; /* 2 */\r\n}\r\n\r\n/**\r\n * 1. Correct the inheritance and scaling of font size in all browsers.\r\n * 2. Correct the odd `em` font sizing in all browsers.\r\n */\r\n\r\npre {\r\n  font-family: monospace, monospace; /* 1 */\r\n  font-size: 1em; /* 2 */\r\n}\r\n\r\n/* Text-level semantics\r\n   ========================================================================== */\r\n\r\n/**\r\n * Remove the gray background on active links in IE 10.\r\n */\r\n\r\na {\r\n  background-color: transparent;\r\n}\r\n\r\n/**\r\n * 1. Remove the bottom border in Chrome 57-\r\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\r\n */\r\n\r\nabbr[title] {\r\n  border-bottom: none; /* 1 */\r\n  text-decoration: underline; /* 2 */\r\n  text-decoration: underline dotted; /* 2 */\r\n}\r\n\r\n/**\r\n * Add the correct font weight in Chrome, Edge, and Safari.\r\n */\r\n\r\nb,\r\nstrong {\r\n  font-weight: bolder;\r\n}\r\n\r\n/**\r\n * 1. Correct the inheritance and scaling of font size in all browsers.\r\n * 2. Correct the odd `em` font sizing in all browsers.\r\n */\r\n\r\ncode,\r\nkbd,\r\nsamp {\r\n  font-family: monospace, monospace; /* 1 */\r\n  font-size: 1em; /* 2 */\r\n}\r\n\r\n/**\r\n * Add the correct font size in all browsers.\r\n */\r\n\r\nsmall {\r\n  font-size: 80%;\r\n}\r\n\r\n/**\r\n * Prevent `sub` and `sup` elements from affecting the line height in\r\n * all browsers.\r\n */\r\n\r\nsub,\r\nsup {\r\n  font-size: 75%;\r\n  line-height: 0;\r\n  position: relative;\r\n  vertical-align: baseline;\r\n}\r\n\r\nsub {\r\n  bottom: -0.25em;\r\n}\r\n\r\nsup {\r\n  top: -0.5em;\r\n}\r\n\r\n/* Embedded content\r\n   ========================================================================== */\r\n\r\n/**\r\n * Remove the border on images inside links in IE 10.\r\n */\r\n\r\nimg {\r\n  border-style: none;\r\n}\r\n\r\n/* Forms\r\n   ========================================================================== */\r\n\r\n/**\r\n * 1. Change the font styles in all browsers.\r\n * 2. Remove the margin in Firefox and Safari.\r\n */\r\n\r\nbutton,\r\ninput,\r\noptgroup,\r\nselect,\r\ntextarea {\r\n  font-family: inherit; /* 1 */\r\n  font-size: 100%; /* 1 */\r\n  line-height: 1.15; /* 1 */\r\n  margin: 0; /* 2 */\r\n}\r\n\r\n/**\r\n * Show the overflow in IE.\r\n * 1. Show the overflow in Edge.\r\n */\r\n\r\nbutton,\r\ninput { /* 1 */\r\n  overflow: visible;\r\n}\r\n\r\n/**\r\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\r\n * 1. Remove the inheritance of text transform in Firefox.\r\n */\r\n\r\nbutton,\r\nselect { /* 1 */\r\n  text-transform: none;\r\n}\r\n\r\n/**\r\n * Correct the inability to style clickable types in iOS and Safari.\r\n */\r\n\r\nbutton,\r\n[type="button"],\r\n[type="reset"],\r\n[type="submit"] {\r\n  -webkit-appearance: button;\r\n}\r\n\r\n/**\r\n * Remove the inner border and padding in Firefox.\r\n */\r\n\r\nbutton::-moz-focus-inner,\r\n[type="button"]::-moz-focus-inner,\r\n[type="reset"]::-moz-focus-inner,\r\n[type="submit"]::-moz-focus-inner {\r\n  border-style: none;\r\n  padding: 0;\r\n}\r\n\r\n/**\r\n * Restore the focus styles unset by the previous rule.\r\n */\r\n\r\nbutton:-moz-focusring,\r\n[type="button"]:-moz-focusring,\r\n[type="reset"]:-moz-focusring,\r\n[type="submit"]:-moz-focusring {\r\n  outline: 1px dotted ButtonText;\r\n}\r\n\r\n/**\r\n * Correct the padding in Firefox.\r\n */\r\n\r\nfieldset {\r\n  padding: 0.35em 0.75em 0.625em;\r\n}\r\n\r\n/**\r\n * 1. Correct the text wrapping in Edge and IE.\r\n * 2. Correct the color inheritance from `fieldset` elements in IE.\r\n * 3. Remove the padding so developers are not caught out when they zero out\r\n *    `fieldset` elements in all browsers.\r\n */\r\n\r\nlegend {\r\n  box-sizing: border-box; /* 1 */\r\n  color: inherit; /* 2 */\r\n  display: table; /* 1 */\r\n  max-width: 100%; /* 1 */\r\n  padding: 0; /* 3 */\r\n  white-space: normal; /* 1 */\r\n}\r\n\r\n/**\r\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\r\n */\r\n\r\nprogress {\r\n  vertical-align: baseline;\r\n}\r\n\r\n/**\r\n * Remove the default vertical scrollbar in IE 10+.\r\n */\r\n\r\ntextarea {\r\n  overflow: auto;\r\n}\r\n\r\n/**\r\n * 1. Add the correct box sizing in IE 10.\r\n * 2. Remove the padding in IE 10.\r\n */\r\n\r\n[type="checkbox"],\r\n[type="radio"] {\r\n  box-sizing: border-box; /* 1 */\r\n  padding: 0; /* 2 */\r\n}\r\n\r\n/**\r\n * Correct the cursor style of increment and decrement buttons in Chrome.\r\n */\r\n\r\n[type="number"]::-webkit-inner-spin-button,\r\n[type="number"]::-webkit-outer-spin-button {\r\n  height: auto;\r\n}\r\n\r\n/**\r\n * 1. Correct the odd appearance in Chrome and Safari.\r\n * 2. Correct the outline style in Safari.\r\n */\r\n\r\n[type="search"] {\r\n  -webkit-appearance: textfield; /* 1 */\r\n  outline-offset: -2px; /* 2 */\r\n}\r\n\r\n/**\r\n * Remove the inner padding in Chrome and Safari on macOS.\r\n */\r\n\r\n[type="search"]::-webkit-search-decoration {\r\n  -webkit-appearance: none;\r\n}\r\n\r\n/**\r\n * 1. Correct the inability to style clickable types in iOS and Safari.\r\n * 2. Change font properties to `inherit` in Safari.\r\n */\r\n\r\n::-webkit-file-upload-button {\r\n  -webkit-appearance: button; /* 1 */\r\n  font: inherit; /* 2 */\r\n}\r\n\r\n/* Interactive\r\n   ========================================================================== */\r\n\r\n/*\r\n * Add the correct display in Edge, IE 10+, and Firefox.\r\n */\r\n\r\ndetails {\r\n  display: block;\r\n}\r\n\r\n/*\r\n * Add the correct display in all browsers.\r\n */\r\n\r\nsummary {\r\n  display: list-item;\r\n}\r\n\r\n/* Misc\r\n   ========================================================================== */\r\n\r\n/**\r\n * Add the correct display in IE 10+.\r\n */\r\n\r\ntemplate {\r\n  display: none;\r\n}\r\n\r\n/**\r\n * Add the correct display in IE 10.\r\n */\r\n\r\n[hidden] {\r\n  display: none;\r\n}',""]);const s=i},645:n=>{n.exports=function(n){var r=[];return r.toString=function(){return this.map((function(r){var e="",t=void 0!==r[5];return r[4]&&(e+="@supports (".concat(r[4],") {")),r[2]&&(e+="@media ".concat(r[2]," {")),t&&(e+="@layer".concat(r[5].length>0?" ".concat(r[5]):""," {")),e+=n(r),t&&(e+="}"),r[2]&&(e+="}"),r[4]&&(e+="}"),e})).join("")},r.i=function(n,e,t,o,a){"string"==typeof n&&(n=[[null,n,void 0]]);var i={};if(t)for(var s=0;s<this.length;s++){var l=this[s][0];null!=l&&(i[l]=!0)}for(var d=0;d<n.length;d++){var c=[].concat(n[d]);t&&i[c[0]]||(void 0!==a&&(void 0===c[5]||(c[1]="@layer".concat(c[5].length>0?" ".concat(c[5]):""," {").concat(c[1],"}")),c[5]=a),e&&(c[2]?(c[1]="@media ".concat(c[2]," {").concat(c[1],"}"),c[2]=e):c[2]=e),o&&(c[4]?(c[1]="@supports (".concat(c[4],") {").concat(c[1],"}"),c[4]=o):c[4]="".concat(o)),r.push(c))}},r}},81:n=>{n.exports=function(n){return n[1]}},379:n=>{var r=[];function e(n){for(var e=-1,t=0;t<r.length;t++)if(r[t].identifier===n){e=t;break}return e}function t(n,t){for(var a={},i=[],s=0;s<n.length;s++){var l=n[s],d=t.base?l[0]+t.base:l[0],c=a[d]||0,p="".concat(d," ").concat(c);a[d]=c+1;var f=e(p),h={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==f)r[f].references++,r[f].updater(h);else{var u=o(h,t);t.byIndex=s,r.splice(s,0,{identifier:p,updater:u,references:1})}i.push(p)}return i}function o(n,r){var e=r.domAPI(r);return e.update(n),function(r){if(r){if(r.css===n.css&&r.media===n.media&&r.sourceMap===n.sourceMap&&r.supports===n.supports&&r.layer===n.layer)return;e.update(n=r)}else e.remove()}}n.exports=function(n,o){var a=t(n=n||[],o=o||{});return function(n){n=n||[];for(var i=0;i<a.length;i++){var s=e(a[i]);r[s].references--}for(var l=t(n,o),d=0;d<a.length;d++){var c=e(a[d]);0===r[c].references&&(r[c].updater(),r.splice(c,1))}a=l}}},569:n=>{var r={};n.exports=function(n,e){var t=function(n){if(void 0===r[n]){var e=document.querySelector(n);if(window.HTMLIFrameElement&&e instanceof window.HTMLIFrameElement)try{e=e.contentDocument.head}catch(n){e=null}r[n]=e}return r[n]}(n);if(!t)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");t.appendChild(e)}},216:n=>{n.exports=function(n){var r=document.createElement("style");return n.setAttributes(r,n.attributes),n.insert(r,n.options),r}},565:(n,r,e)=>{n.exports=function(n){var r=e.nc;r&&n.setAttribute("nonce",r)}},795:n=>{n.exports=function(n){var r=n.insertStyleElement(n);return{update:function(e){!function(n,r,e){var t="";e.supports&&(t+="@supports (".concat(e.supports,") {")),e.media&&(t+="@media ".concat(e.media," {"));var o=void 0!==e.layer;o&&(t+="@layer".concat(e.layer.length>0?" ".concat(e.layer):""," {")),t+=e.css,o&&(t+="}"),e.media&&(t+="}"),e.supports&&(t+="}");var a=e.sourceMap;a&&"undefined"!=typeof btoa&&(t+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),r.styleTagTransform(t,n,r.options)}(r,n,e)},remove:function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(r)}}}},589:n=>{n.exports=function(n,r){if(r.styleSheet)r.styleSheet.cssText=n;else{for(;r.firstChild;)r.removeChild(r.firstChild);r.appendChild(document.createTextNode(n))}}}},r={};function e(t){var o=r[t];if(void 0!==o)return o.exports;var a=r[t]={id:t,exports:{}};return n[t](a,a.exports,e),a.exports}e.n=n=>{var r=n&&n.__esModule?()=>n.default:()=>n;return e.d(r,{a:r}),r},e.d=(n,r)=>{for(var t in r)e.o(r,t)&&!e.o(n,t)&&Object.defineProperty(n,t,{enumerable:!0,get:r[t]})},e.o=(n,r)=>Object.prototype.hasOwnProperty.call(n,r),e.nc=void 0,(()=>{var n=e(379),r=e.n(n),t=e(795),o=e.n(t),a=e(569),i=e.n(a),s=e(565),l=e.n(s),d=e(216),c=e.n(d),p=e(589),f=e.n(p),h=e(24),u={};u.styleTagTransform=f(),u.setAttributes=l(),u.insert=i().bind(null,"head"),u.domAPI=o(),u.insertStyleElement=c(),r()(h.Z,u),h.Z&&h.Z.locals&&h.Z.locals;var m=e(150),b={};b.styleTagTransform=f(),b.setAttributes=l(),b.insert=i().bind(null,"head"),b.domAPI=o(),b.insertStyleElement=c(),r()(m.Z,b),m.Z&&m.Z.locals&&m.Z.locals;var g=e(729),v={};v.styleTagTransform=f(),v.setAttributes=l(),v.insert=i().bind(null,"head"),v.domAPI=o(),v.insertStyleElement=c(),r()(g.Z,v),g.Z&&g.Z.locals&&g.Z.locals;var y=document.getElementsByClassName("collapsable"),x=document.getElementsByClassName("navSpacer")[0];function w(){if("block"===y[0].style.display)for(var n=0;n<y.length;n++)y[n].style.display="none",x.style.height="10vh";else for(n=0;n<y.length;n++)y[n].style.display="block",x.style.height="25vh"}window.navMenuMover=w,document.getElementById("burger").addEventListener("click",w),window.addEventListener("resize",(function(n){if(window.innerWidth>600)for(var r=0;r<y.length;r++)y[r].style.display="block"})),console.log("Welcome curious developer and web aficionado. This website was created by Henry James. https://henryjames.space");var k=document.getElementById("arrow");document.addEventListener("scroll",(function(n){k.style.display="none"}))})()})();