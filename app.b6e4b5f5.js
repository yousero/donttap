!function(){function e(e,t,n,r){Object.defineProperty(e,t,{get:n,set:r,enumerable:!0,configurable:!0})}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},i=t.parcelRequirea7b6;function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}null==i&&((i=function(e){if(e in n)return n[e].exports;if(e in r){let t=r[e];delete r[e];let i={id:e,exports:{}};return n[e]=i,t.call(i.exports,i,i.exports),i.exports}var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}).register=function(e,t){r[e]=t},t.parcelRequirea7b6=i),i.register("2PBrY",(function(t,n){var r,i;e(t.exports,"resolve",(()=>i),(e=>i=e)),e(t.exports,"register",(()=>r),(e=>r=e));var o={};r=function(e){for(var t=Object.keys(e),n=0;n<t.length;n++)o[t[n]]=e[t[n]]},i=function(e){var t=o[e];if(null==t)throw new Error("Could not resolve bundle with id "+e);return t}})),i("2PBrY").register(JSON.parse('{"sN19W":"app.b6e4b5f5.js","c3uTp":"sw.js"}'));document.getElementById("app");var a=document.getElementById("canvas"),l=document.getElementById("healthbar"),s=a.getContext("2d"),c="#ff0107",u="#f1f7ff",d="#00BFFF";l.style.backgroundColor=u,l.style.width="0%";var f=100;function v(e,t,n){s.fillStyle=n;var r=t*(f+0)+0,i=e*(f+0)+0;s.fillRect(i,r,f,f)}function p(e,t){var n=void 0===e?c:e,r=void 0===t?u:t;s.fillStyle=n,s.fillRect(0,0,4*(f+0)+0,4*(f+0)+0),s.fillStyle=r;for(var i=0;i<4;++i)for(var o=0;o<4;++o){var a=i*(f+0)+0,l=o*(f+0)+0;s.fillRect(l,a,f,f)}}window.innerWidth<446?f=72:window.innerWidth>1024&&(f=128),a.height=4*(f+0)+0,a.width=4*(f+0)+0;var h=0,m=0,w=0,g=1,y=0,b="STOP",N=0,E=250,x=new Date,L=(new Date,new Date),M=new Date;M.setSeconds(-120);var S=[],D=[],R=document.getElementById("information");function C(e,t){var n=document.createElement("div");n.classList.add("stats");var r=document.createElement("div");r.classList.add("stats-label"),r.textContent=e,n.appendChild(r);var i=document.createElement("div");i.classList.add("stats-value"),i.textContent=t,n.appendChild(i),R.appendChild(n)}function O(e){return tNumber=String(Math.round(100*e)/100),"."==tNumber.slice(-2,-1)&&(tNumber+="0"),"."!=tNumber.slice(-3,-2)&&(tNumber+=".00"),tNumber}function I(){if("RUNNING"==b){M=new Date,b="GAMEOVER",N=0,l.style.width="0%",p(c,d);var e=(M-L)/1e3;h=m/e,g=m?m/(m+w):1;var t=Math.floor(e/60);if(t>0){var n=Math.floor(e)%60;C("time","".concat(t,":").concat(n))}else C("time",O(e));C("clicks",String(m)),C("speed",O(h)),C("accuracy",O(100*g)+"%"),R.classList.remove("hidden")}}function T(){if("RUNNING"==b){var e=new Date;if(msClock=M-e,msClock<=0)return I();N=(e-L)/1e3,l.style.width=N>0?100*msClock/(M-L)+"%":"0%",requestAnimationFrame(T)}}function k(){var e=Math.floor(Math.random()*D.length),t=o(D[e].split("."));v(t[0],t[1],d),D.splice(e,1)}function B(e){if(void 0!==e&&e||!(new Date-M<1500)){R.classList.add("hidden"),R.innerHTML="",D=[];for(var t=0;t<4;++t)for(var n=0;n<4;++n)D.push("".concat(n,".").concat(t));p();for(var r=0;r<3;++r)k();h=0,m=0,w=0,y=0,g=1,b="RUNNING",N=0,E=250,L=new Date,(M=new Date).setSeconds(M.getSeconds()+32),x=L,L,S=[],requestAnimationFrame(T)}}var A=void 0,U=void 0;function j(e){if(m+=1,"RUNNING"==b){var t,n;e instanceof TouchEvent?(t=e.touches[0].clientX-a.offsetLeft,n=e.touches[0].clientY-a.offsetTop):e?(t=e.offsetX,n=e.offsetY):(t=A-a.offsetLeft,n=U-a.offsetTop);var r=Math.floor((t-t%(f+0))/f),i=Math.floor((n-n%(f+0))/f);D.includes("".concat(r,".").concat(i))||i>=4||r>=4?(M.setMilliseconds(M.getMilliseconds()-E),w+=1,y+=1):(M.setMilliseconds(M.getMilliseconds()+E),new Date,y=0,v(r,i,u),k(),D.push("".concat(r,".").concat(i))),x=new Date,S.unshift(x),y>=4&&I(),E>200?E-=.8:E>166?E-=.125:E>142?E-=1/150:E>125&&(E-=.0016)}else B();window.getSelection?window.getSelection().removeAllRanges():document.selection&&document.selection.empty()}p(c,d),a.addEventListener("mousemove",(function(e){A=e.clientX,U=e.clientY})),a.addEventListener("touchstart",(function(e){return j(e),e.preventDefault(),!1})),a.addEventListener("mousedown",j),a.parentElement.addEventListener("contextmenu",(function(e){return e.preventDefault(),!1})),document.body.addEventListener("keydown",(function(e){["Space","Escape"].includes(e.code)?B(!0):["KeyZ","KeyX","KeyC","KeyV"].includes(e.code)&&j(null)})),window.addEventListener("resize",(function(e){"RUNNING"!=b&&(f=100,window.innerWidth<446?f=72:window.innerWidth>1024&&(f=128),a.height=4*(f+0)+0,a.width=4*(f+0)+0,p(c,d))})),i.register("1M7Oh",(function(e,t){e.exports=i("5ysvy").getBundleURL()+i("7wxpu")("sN19W","c3uTp")})),i.register("5ysvy",(function(t,n){var r;e(t.exports,"getBundleURL",(()=>r),(e=>r=e));var i=null;function o(e){return(""+e).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/,"$1")+"/"}r=function(){return i||(i=function(){try{throw new Error}catch(t){var e=(""+t.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);if(e)return o(e[0])}return"/"}()),i}})),i.register("7wxpu",(function(e,t){"use strict";var n=i("2PBrY").resolve;function r(e){if(""===e)return".";var t="/"===e[e.length-1]?e.slice(0,e.length-1):e,n=t.lastIndexOf("/");return-1===n?".":t.slice(0,n)}function o(e,t){if(e===t)return"";var n=e.split("/");"."===n[0]&&n.shift();var r,i,o=t.split("/");for("."===o[0]&&o.shift(),r=0;(r<o.length||r<n.length)&&null==i;r++)n[r]!==o[r]&&(i=r);var a=[];for(r=0;r<n.length-i;r++)a.push("..");return o.length>i&&a.push.apply(a,o.slice(i)),a.join("/")}e.exports=function(e,t){return o(r(n(e)),n(t))},e.exports._dirname=r,e.exports._relative=o})),"serviceWorker"in navigator&&"file:"!=window.location.protocol&&navigator.serviceWorker.register(i("1M7Oh"))}();
//# sourceMappingURL=app.b6e4b5f5.js.map