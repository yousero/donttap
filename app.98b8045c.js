!function(){function e(e,t,n,r){Object.defineProperty(e,t,{get:n,set:r,enumerable:!0,configurable:!0})}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},o=t.parcelRequire94c2;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var o={id:e,exports:{}};return n[e]=o,t.call(o.exports,o,o.exports),o.exports}var i=Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){r[e]=t},t.parcelRequire94c2=o);var i=o.register;function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}i("iRM3k",function(t,n){e(t.exports,"register",function(){return r},function(e){return r=e});var r,o=new Map;r=function(e,t){for(var n=0;n<t.length-1;n+=2)o.set(t[n],{baseUrl:e,path:t[n+1]})}}),i("gql9y",function(t,n){e(t.exports,"getBundleURL",function(){return r},function(e){return r=e});var r,o={};r=function(e){var t=o[e];return t||(t=function(){try{throw Error()}catch(t){var e=(""+t.stack).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^)\n]+/g);if(e)return(""+e[2]).replace(/^((?:https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/.+)\/[^/]+$/,"$1")+"/"}return"/"}(),o[e]=t),t}}),o("iRM3k").register(o("gql9y").getBundleURL("5ZjFj"),JSON.parse('["5ZjFj","app.98b8045c.js","d1tuc","sw.js"]')),document.getElementById("app");var l=document.getElementById("canvas"),c=document.getElementById("healthbar"),s=l.getContext("2d"),d="#990003",f="#f1f7ff",u="#00BFFF";c.style.backgroundColor=f,c.style.width="0%";var v=100;function h(){v=100,window.innerWidth<446?v=72:window.innerWidth>1024&&(v=128),v=100,l.height=4*(v+0)+0,l.width=4*(v+0)+0}function g(e,t,n){s.fillStyle=n;var r=t*(v+0)+0,o=e*(v+0)+0;s.fillRect(o,r,v,v)}function p(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:d,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:f;s.fillStyle=e,s.fillRect(0,0,(v+0)*4+0,(v+0)*4+0),s.fillStyle=t;for(var n=0;n<4;++n)for(var r=0;r<4;++r){var o=n*(v+0)+0,i=r*(v+0)+0;s.fillRect(i,o,v,v)}}h();var m=0,y=0,w=0,S=1,E=0,b="STOP",L=250,M=new Date,N=new Date,R=new Date,D=new Date;D.setSeconds(-120);var j=[],x=[],I=document.getElementById("information");function k(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r=document.createElement("div");r.classList.add("stats");var o=document.createElement("div");o.classList.add("stats-label"),o.textContent=e,r.appendChild(o);var i=document.createElement("div");i.classList.add("stats-value"),i.textContent=t,r.appendChild(i),n&&(r.title=n),I.appendChild(r)}function T(e){var t=String(Math.round(100*e)/100);return"."==t.slice(-2,-1)&&(t+="0"),"."!=t.slice(-3,-2)&&(t+=".00"),t}function U(){if("RUNNING"==b&&(D=new Date,b="GAMEOVER",c.style.width="0%",p(d,u),y)){var e=(D-N)/1e3;m=y/e,S=y?y/(y+w):1;var t=Math.floor(e/60);if(t>0){var n=Math.floor(e)%60;n<10&&(n="0"+n),k("time","".concat(t,":").concat(n))}else k("time",T(e)+"s");if(k("clicks",String(y)),k("speed",T(m),"clicks per second"),k("accuracy",T(100*S)+"%",w+" misses"),I.classList.remove("hidden"),localStorage){var r=[];if(localStorage.records)try{r=JSON.parse(localStorage.records)}catch(e){delete localStorage.records}r.length>=0&&(r.push([D.getTime(),e,y,w].join(";")),localStorage.records=JSON.stringify(r))}}}function A(){if("RUNNING"==b){var e=new Date,t=D-e;if(t<=0)return U();if((e-N)/1e3>0){var n=D-R,r=100*t/n;c.style.width=r+"%",n>=6e4&&r<=25&&R.setMilliseconds(R.getMilliseconds()+6.5*n/10)}else c.style.width="0%";requestAnimationFrame(A)}}function O(){var e,t=Math.floor(Math.random()*x.length),n=function(e){if(Array.isArray(e))return e}(e=x[t].split("."))||function(e,t){var n,r,o=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=o){var i=[],a=!0,l=!1;try{for(o=o.call(e);!(a=(n=o.next()).done)&&(i.push(n.value),2!==i.length);a=!0);}catch(e){l=!0,r=e}finally{try{a||null==o.return||o.return()}finally{if(l)throw r}}return i}}(e,2)||function(e,t){if(e){if("string"==typeof e)return a(e,2);var n=Object.prototype.toString.call(e).slice(8,-1);if("Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return a(e,2)}}(e,2)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}();g(n[0],n[1],u),x.splice(t,1)}function q(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(!(!e&&new Date-D<1500)){I.classList.add("hidden"),I.innerHTML="",x=[];for(var t=0;t<4;++t)for(var n=0;n<4;++n)x.push("".concat(n,".").concat(t));p();for(var r=0;r<3;++r)O();m=0,y=0,w=0,E=0,S=1,b="RUNNING",L=250,N=new Date,R=new Date,(D=new Date).setSeconds(D.getSeconds()+32),M=N,j=[],requestAnimationFrame(A)}}function F(e){if(y+=1,"RUNNING"==b){e&&(t=e.offsetX,n=e.offsetY,"TouchEvent"in window&&e instanceof TouchEvent&&(t=e.touches[0].clientX-l.offsetLeft,n=e.touches[0].clientY-l.offsetTop));var t,n,r=Math.floor((t-t%(v+0))/v),o=Math.floor((n-n%(v+0))/v);x.includes("".concat(r,".").concat(o))||o>=4||r>=4?(D.setMilliseconds(D.getMilliseconds()-L),w+=1,E+=1):(D.setMilliseconds(D.getMilliseconds()+L),E=0,g(r,o,f),O(),x.push("".concat(r,".").concat(o))),M=new Date,j.unshift(M),E>=4&&U(),L>200?L-=.8:L>166?L-=.125:L>142?L-=1/150:L>125&&(L-=.0016)}else q();window.getSelection?window.getSelection().removeAllRanges():document.selection&&document.selection.empty()}p(d,u);var B=document.getElementById("settings");B.querySelector("#toggle-bar").addEventListener("click",function(e){var t=parseInt(c.style.width);t+30>100?c.style.width="0%":c.style.width=String(t+30)+"%"}),B.querySelector("#toggle-info").addEventListener("click",function(e){I.innerHTML||(k("time","0s"),k("clicks","0"),k("speed","0"),k("accuracy",String(Math.floor(100*S))+"%")),I.classList.toggle("hidden")}),B.querySelector("#show-first-round").addEventListener("click",function(e){I.classList.add("hidden"),I.innerHTML="",x=[];for(var t=0;t<4;++t)for(var n=0;n<4;++n)x.push("".concat(n,".").concat(t));p();for(var r=0;r<3;++r)O()}),l.addEventListener("touchstart",function(e){return F(e),e.preventDefault(),!1}),l.addEventListener("mousedown",F),l.parentElement.addEventListener("contextmenu",function(e){return e.preventDefault(),!1}),document.body.addEventListener("keydown",function(e){["Space","Escape"].includes(e.code)&&q(!0)}),window.addEventListener("resize",function(e){"RUNNING"!=b&&(h(),p(d,u))});var C={};C=o("gql9y").getBundleURL("5ZjFj")+"sw.js","serviceWorker"in navigator&&"file:"!=window.location.protocol&&navigator.serviceWorker.register(C)}();
//# sourceMappingURL=app.98b8045c.js.map