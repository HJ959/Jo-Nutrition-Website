(()=>{"use strict";var n={344:(n,e,t)=>{t.d(e,{c:()=>s});var r=t(500),o=t.n(r),i=t(312),a=t.n(i)()(o());a.push([n.id,'/* Add media queries for responsiveness - when the screen is 500px wide or less, stack the links on top of each other */\n@media screen and (max-width: 1000px) {\n    .container {\n        display: grid;\n        grid-template-columns: 1fr;\n        grid-template-rows: 1fr 1fr;\n        grid-auto-columns: 1fr;\n        gap: 0px 0px;\n        grid-auto-flow: row;\n        grid-template-areas:\n        "JoImage JoImage"\n        "info info";\n        height: 10%;\n    }\n\n    .info {\n        grid-area: info;\n        padding: 6%;\n    }\n\n    .JoImage {\n        grid-area: JoImage;\n        display: flex;\n        justify-content: center;\n        padding: 2%;\n    }\n\n    .homeImage {\n        width: 70vw;\n        height: 70vw;\n        border-radius: 360px;\n    }\n    .homeMargin {\n        margin-left: 5%;\n        margin-right: 5%;\n        margin-top: 1%;\n    }\n}\n\n@media screen and (min-width: 1001px) {\n    .container {\n        display: grid;\n        grid-template-columns: 1fr 1fr;\n        grid-template-rows: 1fr;\n        grid-auto-columns: 1fr;\n        gap: 0px 0px;\n        grid-auto-flow: row;\n        justify-content: center;\n        align-content: center;\n        justify-items: center;\n        align-items: center;\n        grid-template-areas:\n            "info JoImage";\n            width: 100%;\n    }\n\n    .info {\n        grid-area: info;\n        padding: 5%;\n    }\n\n    .JoImage {\n        grid-area: JoImage;\n        display: flex;\n        justify-content: center;\n    }\n\n    .homeImage {\n        width: 40vmax;\n        height: 40vmax;\n        border-radius: 360px;\n    }\n\n    .homeMargin {\n        margin-left: 25%;\n        margin-top: 1%;\n    }\n}\n\nh2 {\n    font-size: 1em;\n    color: var(--black);\n}\n\nh1 {\n    font-size: 1.3em;\n    color: var(--navy);\n}',""]);const s=a},400:(n,e,t)=>{t.d(e,{c:()=>s});var r=t(500),o=t.n(r),i=t(312),a=t.n(i)()(o());a.push([n.id,":root {\n    /* Setup some variables for the colour palette */\n    --green: rgb(159, 214, 224);\n    --purple: rgb(206, 202, 230);\n    --navy: rgb(78, 109, 179);\n    --grey: rgb(219, 231, 242);\n    --white: rgb(250, 250, 250);\n    --black: rgb(20, 20, 20);\n\n    /* Setup some faded versions of the colour pallete  */\n    --green-fade: rgba(159, 214, 224, 0.3);\n    --purple-fade: rgba(206, 202, 230, 0.3);\n    --navy-fade: rgba(78, 109, 179, 0.3);\n    --grey-fade: rgba(219, 231, 242, 0.3);\n    --white-fade: rgba(250, 250, 250, 0.3);\n    --black-fade: rgba(20, 20, 20, 0.3);\n}\n\nhtml,\nbody {\n    width: 100%;\n    height: 100%;\n}\n\n#loadOverlay {\n    overflow: hidden;\n    display: none;\n}\n\nbody {\n    background-color: var(--white);\n    overflow-x: hidden;\n    font-family: 'Open Sans', sans-serif;\n    font-size: 17px;\n    font-size: 2vh;\n    line-height: 2;\n}\n\n.dropShadow {\n    -webkit-box-shadow: 0px 0px 12px 0px var(--purple-fade);\n    box-shadow: 0px 0px 12px 0px var(--purple-fade);\n}\n\n.consultLists {\n    color: var(--navy);\n    font-size: 1.4em;\n}\n\n\n/* Add a black background color to the top navigation */\n.topnav {\n    position: fixed;\n    left: 0;\n    top: 0;\n    /* backdrop-filter: blur(25px); */\n    background: var(--white);\n    width: 100%;\n    display: flex;\n    justify-content: space-evenly;\n    flex-wrap: wrap;\n    -webkit-box-shadow: 0px 0px 12px 0px var(--purple-fade);\n    box-shadow: 0px 0px 12px 0px var(--purple-fade);\n    border: 1px solid var(--purple-fade);\n}\n\n/* Style the links inside the navigation bar */\n.topnav a {\n    float: left;\n    color: var(--black);\n    text-align: center;\n    padding: 14px 16px;\n    text-decoration: none;\n    font-size: 1em;\n    margin-left: 2%;\n    transition: 0.4s;\n}\n\n/* Change the color of links on hover */\n.topnav a:hover {\n    color: var(--navy);\n    translate: 0px 2px;\n    transition: 0.2s;\n}\n\n/* Add a color to the active/current link */\n.topnav a.active {\n    color: var(--navy);\n}\n\n/* Generic minimal line */\n.slimBorder {\n    border: 1px solid var(--purple-fade);\n    border-style: solid solid solid solid;\n}\n\n/* Purple line spacer to use inbetween text blocks */\n.purpleLine {\n    border: 1px solid var(--purple-fade);\n    border-style: solid;\n    width: 100%;\n    /* filter: drop-shadow(1px 1px 1px var(--green)); */\n    border-radius: 32px;\n    margin-bottom: 2%;\n    \n}\n\n.hidden {\n    display: none;\n}\n\n/* add a footer */\nfooter {\n    position: fixed;\n    left: 0;\n    bottom: 0;\n    width: 100%;\n    background-color: var(--white);\n    color: var(--white);\n    text-align: center;\n    border: 1px solid var(--purple-fade);\n    -webkit-box-shadow: 0px 0px 12px 0px var(--purple-fade);\n    box-shadow: 0px 0px 12px 0px var(--purple-fade);\n}\n\na {\n    color: var(--black);\n    font-weight: bold;\n}\n\nul {\n    list-style: none;\n    padding-inline-start: 10px;\n}\n\nul li::before {\n    /* Add content: \\2022 is the CSS Code/unicode for a bullet */\n    content: \"\\2022\";\n    color: var(--green);\n    display: inline-block;\n    font-weight: bolder;\n    font-size: 2vh;\n    /* Needed to add space between the bullet and the text */\n    width: 1em;\n    /* Also needed for space (tweak if needed) */\n    margin-left: -1em;\n    /* Also needed for space (tweak if needed) */\n}\n\n.collapsable {\n    display: block;\n}\n\n.arrow {\n    pointer-events: none;\n}\n\n\nh1, h2, h3 {\ncolor: var(--navy);    \n}\n\n.navSpacer {\n    transition: 0.5s;\n}\n\n/* ========== MOBILE ======= */\n@media screen and (max-width: 760px) {\n    .topnav a {\n        float: none;\n        display: none;\n        text-align: left;\n    }\n\n    .navSpacer {\n        height: 10vh;\n    }\n\n    .defaultMargin {\n        margin-left: 7%;\n        margin-right: 7%;\n        margin-top: 1%;\n    }\n\n    .material-symbols-outlined {\n        font-variation-settings:\n            'FILL'0,\n            'wght'700,\n            'GRAD'200,\n            'opsz'48;\n        /* display: none; */\n        float: left;\n        color: var(--black);\n        text-align: center;\n        padding: 14px 16px;\n        text-decoration: none;\n        margin-left: 2%;\n        display: block;\n        font-size: 2em;\n    }\n\n    .material-symbols-outlined:hover {\n        color: var(--navy);\n        translate: 0px 2px;\n        transition: 0.1s;\n    }\n    .center {\n        text-align: center;\n    }\n    \n}\n\n/* ========== TABLET ======= */\n@media screen and (min-width: 761px) and (max-width: 1200px) {\n    .topnav a {\n        float: none;\n        display: block;\n        text-align: left;\n    }\n\n    .navSpacer {\n        height: 15vh;\n    }\n\n    .defaultMargin {\n        margin-left: 20%;\n        margin-right: 20%;\n        margin-top: 1%;\n    }\n\n    .material-symbols-outlined {\n        display: none;\n    }\n    .center {\n        text-align: center;\n    }\n    \n}\n\n/* ========== DESKTOP ======= */\n@media screen and (min-width: 1201px) {\n    .navSpacer {\n        width: 100%;\n        height: 10vh;\n    }\n\n    .defaultMargin {\n        margin-left: 25%;\n        margin-right: 25%;\n        margin-top: 1%;\n    }\n\n    .material-symbols-outlined {\n        display: none;\n    }\n    .center {\n        text-align: center;\n    }\n    \n}",""]);const s=a},948:(n,e,t)=>{t.d(e,{c:()=>s});var r=t(500),o=t.n(r),i=t(312),a=t.n(i)()(o());a.push([n.id,'/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers.\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Render the `main` element consistently in IE.\n */\n\nmain {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Remove the gray background on active links in IE 10.\n */\n\na {\n  background-color: transparent;\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove the border on images inside links in IE 10.\n */\n\nimg {\n  border-style: none;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\n[type="button"],\n[type="reset"],\n[type="submit"] {\n  -webkit-appearance: button;\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type="button"]::-moz-focus-inner,\n[type="reset"]::-moz-focus-inner,\n[type="submit"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type="button"]:-moz-focusring,\n[type="reset"]:-moz-focusring,\n[type="submit"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Remove the default vertical scrollbar in IE 10+.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10.\n */\n\n[type="checkbox"],\n[type="radio"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type="number"]::-webkit-inner-spin-button,\n[type="number"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type="search"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding in Chrome and Safari on macOS.\n */\n\n[type="search"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in Edge, IE 10+, and Firefox.\n */\n\ndetails {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Misc\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10+.\n */\n\ntemplate {\n  display: none;\n}\n\n/**\n * Add the correct display in IE 10.\n */\n\n[hidden] {\n  display: none;\n}',""]);const s=a},312:n=>{n.exports=function(n){var e=[];return e.toString=function(){return this.map((function(e){var t="",r=void 0!==e[5];return e[4]&&(t+="@supports (".concat(e[4],") {")),e[2]&&(t+="@media ".concat(e[2]," {")),r&&(t+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),t+=n(e),r&&(t+="}"),e[2]&&(t+="}"),e[4]&&(t+="}"),t})).join("")},e.i=function(n,t,r,o,i){"string"==typeof n&&(n=[[null,n,void 0]]);var a={};if(r)for(var s=0;s<this.length;s++){var l=this[s][0];null!=l&&(a[l]=!0)}for(var d=0;d<n.length;d++){var c=[].concat(n[d]);r&&a[c[0]]||(void 0!==i&&(void 0===c[5]||(c[1]="@layer".concat(c[5].length>0?" ".concat(c[5]):""," {").concat(c[1],"}")),c[5]=i),t&&(c[2]?(c[1]="@media ".concat(c[2]," {").concat(c[1],"}"),c[2]=t):c[2]=t),o&&(c[4]?(c[1]="@supports (".concat(c[4],") {").concat(c[1],"}"),c[4]=o):c[4]="".concat(o)),e.push(c))}},e}},500:n=>{n.exports=function(n){return n[1]}},596:n=>{var e=[];function t(n){for(var t=-1,r=0;r<e.length;r++)if(e[r].identifier===n){t=r;break}return t}function r(n,r){for(var i={},a=[],s=0;s<n.length;s++){var l=n[s],d=r.base?l[0]+r.base:l[0],c=i[d]||0,p="".concat(d," ").concat(c);i[d]=c+1;var f=t(p),h={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==f)e[f].references++,e[f].updater(h);else{var m=o(h,r);r.byIndex=s,e.splice(s,0,{identifier:p,updater:m,references:1})}a.push(p)}return a}function o(n,e){var t=e.domAPI(e);return t.update(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap&&e.supports===n.supports&&e.layer===n.layer)return;t.update(n=e)}else t.remove()}}n.exports=function(n,o){var i=r(n=n||[],o=o||{});return function(n){n=n||[];for(var a=0;a<i.length;a++){var s=t(i[a]);e[s].references--}for(var l=r(n,o),d=0;d<i.length;d++){var c=t(i[d]);0===e[c].references&&(e[c].updater(),e.splice(c,1))}i=l}}},176:n=>{var e={};n.exports=function(n,t){var r=function(n){if(void 0===e[n]){var t=document.querySelector(n);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(n){t=null}e[n]=t}return e[n]}(n);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(t)}},808:n=>{n.exports=function(n){var e=document.createElement("style");return n.setAttributes(e,n.attributes),n.insert(e,n.options),e}},120:(n,e,t)=>{n.exports=function(n){var e=t.nc;e&&n.setAttribute("nonce",e)}},520:n=>{n.exports=function(n){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=n.insertStyleElement(n);return{update:function(t){!function(n,e,t){var r="";t.supports&&(r+="@supports (".concat(t.supports,") {")),t.media&&(r+="@media ".concat(t.media," {"));var o=void 0!==t.layer;o&&(r+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),r+=t.css,o&&(r+="}"),t.media&&(r+="}"),t.supports&&(r+="}");var i=t.sourceMap;i&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),e.styleTagTransform(r,n,e.options)}(e,n,t)},remove:function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(e)}}}},936:n=>{n.exports=function(n,e){if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}}},e={};function t(r){var o=e[r];if(void 0!==o)return o.exports;var i=e[r]={id:r,exports:{}};return n[r](i,i.exports,t),i.exports}t.n=n=>{var e=n&&n.__esModule?()=>n.default:()=>n;return t.d(e,{a:e}),e},t.d=(n,e)=>{for(var r in e)t.o(e,r)&&!t.o(n,r)&&Object.defineProperty(n,r,{enumerable:!0,get:e[r]})},t.o=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),t.nc=void 0,(()=>{var n=t(596),e=t.n(n),r=t(520),o=t.n(r),i=t(176),a=t.n(i),s=t(120),l=t.n(s),d=t(808),c=t.n(d),p=t(936),f=t.n(p),h=t(948),m={};m.styleTagTransform=f(),m.setAttributes=l(),m.insert=a().bind(null,"head"),m.domAPI=o(),m.insertStyleElement=c(),e()(h.c,m),h.c&&h.c.locals&&h.c.locals;var u=t(400),g={};g.styleTagTransform=f(),g.setAttributes=l(),g.insert=a().bind(null,"head"),g.domAPI=o(),g.insertStyleElement=c(),e()(u.c,g),u.c&&u.c.locals&&u.c.locals;var b=t(344),v={};v.styleTagTransform=f(),v.setAttributes=l(),v.insert=a().bind(null,"head"),v.domAPI=o(),v.insertStyleElement=c(),e()(b.c,v),b.c&&b.c.locals&&b.c.locals;var y=document.getElementsByClassName("collapsable"),x=document.getElementsByClassName("navSpacer")[0];function w(){if("block"===y[0].style.display)for(var n=0;n<y.length;n++)y[n].style.display="none",x.style.height="10vh";else for(n=0;n<y.length;n++)y[n].style.display="block",x.style.height="25vh"}window.navMenuMover=w,document.getElementById("burger").addEventListener("click",w),window.addEventListener("resize",(function(n){if(window.innerWidth>600)for(var e=0;e<y.length;e++)y[e].style.display="block"})),console.log("Welcome curious developer and web aficionado. This website was created by Henry James. https://henryjames.space")})()})();