function e(e,t,n,i){Object.defineProperty(e,t,{get:n,set:i,enumerable:!0,configurable:!0})}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},i={},o=t.parcelRequire94c2;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in i){var t=i[e];delete i[e];var o={id:e,exports:{}};return n[e]=o,t.call(o.exports,o,o.exports),o.exports}var l=Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,t){i[e]=t},t.parcelRequire94c2=o);var l=o.register;l("jz7dE",function(t,n){e(t.exports,"register",function(){return i},function(e){return i=e});var i,o=new Map;i=function(e,t){for(var n=0;n<t.length-1;n+=2)o.set(t[n],{baseUrl:e,path:t[n+1]})}}),l("jfr6k",function(t,n){e(t.exports,"getBundleURL",function(){return i},function(e){return i=e});var i,o={};i=function(e){var t=o[e];return t||(t=function(){try{throw Error()}catch(t){var e=(""+t.stack).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^)\n]+/g);if(e)return(""+e[2]).replace(/^((?:https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/.+)\/[^/]+$/,"$1")+"/"}return"/"}(),o[e]=t),t}}),o("jz7dE").register(o("jfr6k").getBundleURL("5iIeY"),JSON.parse('["5iIeY","app.7849714a.js","d1tuc","sw.js"]')),document.getElementById("app");const r=document.getElementById("canvas"),s=document.getElementById("healthbar"),c=r.getContext("2d"),a="#990003",d="#f1f7ff",f="#00BFFF";s.style.backgroundColor=d,s.style.width="0%";let u=100;function h(){u=100,window.innerWidth<446?u=72:window.innerWidth>1024&&(u=128),u=100,r.height=4*(u+0)+0,r.width=4*(u+0)+0}function g(e,t,n){c.fillStyle=n;let i=t*(u+0)+0,o=e*(u+0)+0;c.fillRect(o,i,u,u)}function p(e=a,t=d){c.fillStyle=e,c.fillRect(0,0,(u+0)*4+0,(u+0)*4+0),c.fillStyle=t;for(let e=0;e<4;++e)for(let t=0;t<4;++t){let n=e*(u+0)+0,i=t*(u+0)+0;c.fillRect(i,n,u,u)}}h();let w=0,m=0,v=0,y=1,E=0,S="STOP",L=250,M=new Date,N=new Date,b=new Date,R=new Date;R.setSeconds(-120);let D=[],k=[];const I=document.getElementById("information");function x(e,t,n=null){let i=document.createElement("div");i.classList.add("stats");let o=document.createElement("div");o.classList.add("stats-label"),o.textContent=e,i.appendChild(o);let l=document.createElement("div");l.classList.add("stats-value"),l.textContent=t,i.appendChild(l),n&&(i.title=n),I.appendChild(i)}function $(e){let t=String(Math.round(100*e)/100);return"."==t.slice(-2,-1)&&(t+="0"),"."!=t.slice(-3,-2)&&(t+=".00"),t}function T(){if("RUNNING"==S&&(R=new Date,S="GAMEOVER",s.style.width="0%",p(a,f),m)){let e=(R-N)/1e3;w=m/e,y=m?m/(m+v):1;let t=Math.floor(e/60);if(t>0){let n=Math.floor(e)%60;n<10&&(n="0"+n),x("time",`${t}:${n}`)}else x("time",$(e)+"s");if(x("clicks",String(m)),x("speed",$(w),"clicks per second"),x("accuracy",$(100*y)+"%",v+" misses"),I.classList.remove("hidden"),localStorage){let t=[];if(localStorage.records)try{t=JSON.parse(localStorage.records)}catch(e){delete localStorage.records}t.length>=0&&(t.push([R.getTime(),e,m,v].join(";")),localStorage.records=JSON.stringify(t))}}}function U(){if("RUNNING"!=S)return;let e=new Date,t=R-e;if(t<=0)return T();if((e-N)/1e3>0){let e=R-b,n=100*t/e;s.style.width=n+"%",e>=6e4&&n<=25&&b.setMilliseconds(b.getMilliseconds()+6.5*e/10)}else s.style.width="0%";requestAnimationFrame(U)}function j(){let e=Math.floor(Math.random()*k.length),[t,n]=k[e].split(".");g(t,n,f),k.splice(e,1)}function B(e=!1){if(!(!e&&new Date-R<1500)){I.classList.add("hidden"),I.innerHTML="",k=[];for(let e=0;e<4;++e)for(let t=0;t<4;++t)k.push(`${t}.${e}`);p();for(let e=0;e<3;++e)j();w=0,m=0,v=0,E=0,y=1,S="RUNNING",L=250,N=new Date,b=new Date,(R=new Date).setSeconds(R.getSeconds()+32),M=N,D=[],requestAnimationFrame(U)}}function O(e){if(m+=1,"RUNNING"==S){let t,n;e&&(t=e.offsetX,n=e.offsetY,"TouchEvent"in window&&e instanceof TouchEvent&&(t=e.touches[0].clientX-r.offsetLeft,n=e.touches[0].clientY-r.offsetTop));let i=Math.floor((t-t%(u+0))/u),o=Math.floor((n-n%(u+0))/u);k.includes(`${i}.${o}`)||o>=4||i>=4?(R.setMilliseconds(R.getMilliseconds()-L),v+=1,E+=1):(R.setMilliseconds(R.getMilliseconds()+L),E=0,g(i,o,d),j(),k.push(`${i}.${o}`)),M=new Date,D.unshift(M),E>=4&&T(),L>200?L-=.8:L>166?L-=.125:L>142?L-=1/150:L>125&&(L-=.0016)}else B();window.getSelection?window.getSelection().removeAllRanges():document.selection&&document.selection.empty()}p(a,f);const C=document.getElementById("settings");C.querySelector("#toggle-bar").addEventListener("click",function(e){let t=parseInt(s.style.width);t+30>100?s.style.width="0%":s.style.width=String(t+30)+"%"}),C.querySelector("#toggle-info").addEventListener("click",function(e){I.innerHTML||(x("time","0s"),x("clicks","0"),x("speed","0"),x("accuracy",String(Math.floor(100*y))+"%")),I.classList.toggle("hidden")}),C.querySelector("#show-first-round").addEventListener("click",function(e){I.classList.add("hidden"),I.innerHTML="",k=[];for(let e=0;e<4;++e)for(let t=0;t<4;++t)k.push(`${t}.${e}`);p();for(let e=0;e<3;++e)j()}),r.addEventListener("touchstart",e=>(O(e),e.preventDefault(),!1)),r.addEventListener("mousedown",O),r.parentElement.addEventListener("contextmenu",e=>(e.preventDefault(),!1)),document.body.addEventListener("keydown",e=>{["Space","Escape"].includes(e.code)&&B(!0)}),window.addEventListener("resize",e=>{"RUNNING"!=S&&(h(),p(a,f))});var q={};q=o("jfr6k").getBundleURL("5iIeY")+"sw.js","serviceWorker"in navigator&&"file:"!=window.location.protocol&&navigator.serviceWorker.register(q);
//# sourceMappingURL=app.7849714a.js.map