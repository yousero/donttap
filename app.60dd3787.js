!function(){function e(e,t,n,r){Object.defineProperty(e,t,{get:n,set:r,enumerable:!0,configurable:!0})}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},i=t.parcelRequirea7b6;function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}null==i&&((i=function(e){if(e in n)return n[e].exports;if(e in r){let t=r[e];delete r[e];let i={id:e,exports:{}};return n[e]=i,t.call(i.exports,i,i.exports),i.exports}var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}).register=function(e,t){r[e]=t},t.parcelRequirea7b6=i),i.register("2PBrY",(function(t,n){var r,i;e(t.exports,"register",(()=>r),(e=>r=e)),e(t.exports,"resolve",(()=>i),(e=>i=e));var o={};r=function(e){for(var t=Object.keys(e),n=0;n<t.length;n++)o[t[n]]=e[t[n]]},i=function(e){var t=o[e];if(null==t)throw new Error("Could not resolve bundle with id "+e);return t}})),i("2PBrY").register(JSON.parse('{"sN19W":"app.60dd3787.js","c3uTp":"sw.js"}'));document.getElementById("app");var c=document.getElementById("canvas"),a=c.getContext("2d"),l="#ff0107",s="#f1f7ff",u="#000107",f=100;function d(e,t,n){a.fillStyle=n;var r=t*(f+1)+1,i=e*(f+1)+1;a.fillRect(i,r,f,f)}function v(e,t){var n=void 0===e?l:e,r=void 0===t?s:t;a.fillStyle=n,a.fillRect(0,0,4*(f+1)+1,4*(f+1)+1),a.fillStyle=r;for(var i=0;i<4;++i)for(var o=0;o<4;++o){var c=i*(f+1)+1,u=o*(f+1)+1;a.fillRect(u,c,f,f)}}window.innerWidth<446?f=72:window.innerWidth>1024&&(f=128),c.height=4*(f+1)+1,c.width=4*(f+1)+1;var p=0,h=0,g=1,w=0,m="STOP",y=0,b=2,N=new Date,E=N,x=N,I=[],S=[],O=[],R=document.getElementById("clock"),L=document.getElementById("information"),M=-1;function T(e){return tNumber=String(Math.round(100*e)/100),"."==tNumber.slice(-2,-1)&&(tNumber+="0"),"."!=tNumber.slice(-3,-2)&&(tNumber+=".00"),tNumber}function B(){m="GAMEOVER",clearInterval(M),y=0,R.classList.add("gameover"),v(l,u)}function D(e,t,n){var r=parseInt(e.slice(1,3),16),i=parseInt(e.slice(3,5),16),o=parseInt(e.slice(5,7),16),c=parseInt(t.slice(1,3),16),a=parseInt(t.slice(3,5),16),l=parseInt(t.slice(5,7),16),s=parseInt(r+(c-r)*n).toString(16),u=parseInt(i+(a-i)*n).toString(16),f=parseInt(o+(l-o)*n).toString(16);return s=1==s.length?"0"+s:s,u=1==u.length?"0"+u:u,f=1==f.length?"0"+f:f,"#".concat(s).concat(u).concat(f)}function j(){if("RUNNING"==m){for(var e=new Date,t=0;t<I.length&&!((e-I[t])/1e3>10);++t);g=p?p/(p+h):1;var n=T(t/((y=(e-N)/1e3)<10?y||1:10)),r=String(p),i=T(g);L.textContent="".concat(n," / ").concat(r," / ").concat(i),R.textContent=y>0?T(y):"0.00";var c=(e-x)/1e3,a=!0,l=!1,f=void 0;if(c>=b)return B(),!1;try{for(var v,w=O[Symbol.iterator]();!(a=(v=w.next()).done);a=!0){var E=o(v.value.split("."));d(E[0],E[1],D(u,s,c/b))}}catch(e){l=!0,f=e}finally{try{a||null==w.return||w.return()}finally{if(l)throw f}}}}function A(){var e=Math.floor(Math.random()*S.length),t=S[e];O.push(t);var n=o(t.split("."));d(n[0],n[1],u),S.splice(e,1)}function U(){R.classList.remove("gameover"),S=[];for(var e=0;e<4;++e)for(var t=0;t<4;++t)S.push("".concat(t,".").concat(e));v(),O=[];for(var n=0;n<3;++n)A();0,p=0,h=0,w=0,g=1,y=0,b=2,N=new Date,E=N,x=N,I=[],m="RUNNING",M=setInterval(j,0)}var W=new Audio("click.wav");function k(e){if(p+=1,"RUNNING"==m){var t,n;if(e instanceof TouchEvent?(t=e.touches[0].clientX-c.offsetLeft,n=e.touches[0].clientY-c.offsetTop):(t=e.offsetX,n=e.offsetY),0==t||0==n||t==this.width||n==this.height)h+=1,w+=1;else{var r=Math.floor((t-t%(f+1))/f),i=Math.floor((n-n%(f+1))/f);S.includes("".concat(r,".").concat(i))||i>=4||r>=4?(h+=1,w+=1):(x=new Date,w=0,d(r,i,s),A(),S.push("".concat(r,".").concat(i)),O.splice(O.indexOf("".concat(r,".").concat(i)),1),W.pause(),W.currentTime=0,W.play())}E=new Date,I.unshift(E),w>=4&&B(),p%10==0&&(b*=.9966)}else U();window.getSelection?window.getSelection().removeAllRanges():document.selection&&document.selection.empty()}W.volume=.2,v(l,u);var Y=void 0,C=void 0;c.addEventListener("mousemove",(function(e){Y=e.clientX,C=e.clientY})),c.addEventListener("touchstart",(function(e){return k(e),e.preventDefault(),!1})),c.addEventListener("mousedown",k),c.addEventListener("contextmenu",(function(e){return e.preventDefault(),!1})),document.body.addEventListener("keydown",(function(e){if(["Space","Escape"].includes(e.code))U();else if(["KeyZ","KeyX","KeyC","KeyV"].includes(e.code)){var t=new MouseEvent("mousedown",{view:window,bubbles:!0,cancelable:!0,clientX:Y,clientY:C});c.dispatchEvent(t)}})),window.addEventListener("resize",(function(e){"RUNNING"!=m&&(f=100,window.innerWidth<446?f=72:window.innerWidth>1024&&(f=128),c.height=4*(f+1)+1,c.width=4*(f+1)+1,v(l,u))})),i.register("1M7Oh",(function(e,t){e.exports=i("5ysvy").getBundleURL()+i("7wxpu")("sN19W","c3uTp")})),i.register("5ysvy",(function(t,n){var r;e(t.exports,"getBundleURL",(()=>r),(e=>r=e));var i=null;function o(e){return(""+e).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/,"$1")+"/"}r=function(){return i||(i=function(){try{throw new Error}catch(t){var e=(""+t.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);if(e)return o(e[0])}return"/"}()),i}})),i.register("7wxpu",(function(e,t){"use strict";var n=i("2PBrY").resolve;function r(e){if(""===e)return".";var t="/"===e[e.length-1]?e.slice(0,e.length-1):e,n=t.lastIndexOf("/");return-1===n?".":t.slice(0,n)}function o(e,t){if(e===t)return"";var n=e.split("/");"."===n[0]&&n.shift();var r,i,o=t.split("/");for("."===o[0]&&o.shift(),r=0;(r<o.length||r<n.length)&&null==i;r++)n[r]!==o[r]&&(i=r);var c=[];for(r=0;r<n.length-i;r++)c.push("..");return o.length>i&&c.push.apply(c,o.slice(i)),c.join("/")}e.exports=function(e,t){return o(r(n(e)),n(t))},e.exports._dirname=r,e.exports._relative=o})),"serviceWorker"in navigator&&navigator.serviceWorker.register(i("1M7Oh"))}();
//# sourceMappingURL=app.60dd3787.js.map
