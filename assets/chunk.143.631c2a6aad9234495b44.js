var __ember_auto_import__;(()=>{var t={259:(t,e,o)=>{"use strict"
async function n(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
if(t.getAnimations)return await i(),Promise.allSettled(t.getAnimations({subtree:e.subtree}).filter((t=>e.transitionProperty?t.transitionProperty===e.transitionProperty:!e.animationName||t.animationName===e.animationName)).map((t=>t.finished)))}function i(){return new Promise(window.requestAnimationFrame)}o.r(e),o.d(e,{waitForAnimation:()=>n,waitForFrame:()=>i})},940:(t,e,o)=>{"use strict"
function n(t){return[t.left+t.width/2,t.top+t.height/2]}function i(t,e,o,i){const r=t.getBoundingClientRect()
var a
const s=function(t,e,o){const n=t.width/e,i=t.height/o
return{left:t.left+n,top:t.top+i,right:t.right-n,bottom:t.bottom-i}}((a=e)instanceof Window?{top:0,left:0,right:a.innerWidth,bottom:a.innerHeight,width:a.innerWidth,height:a.innerHeight}:a instanceof Document?a.documentElement.getBoundingClientRect():a.getBoundingClientRect(),o,i)
return function(t,e){const o=n(t),[i,r]=o,a=[]
return r<=e.top?a.push("top"):r>=e.bottom?a.push("bottom"):a.push("middle"),i<=e.left?a.push("left"):i>=e.right?a.push("right"):a.push("center"),a.join(" ")}(r,s)}function r(t,e,o){if(!e.offsetParent)return[0,0]
const i=e.getBoundingClientRect(),r=o.getBoundingClientRect(),a=e.offsetParent.getBoundingClientRect(),s=i.height,c=i.width,u=n(r),l=u[0]-c/2,f=u[1]-s/2,d=r.top,p=r.left,m=p+r.width,g=d+r.height,h=e.offsetParent.scrollTop,b=e.offsetParent.scrollLeft,_=-1*a.top,w=-1*a.left
let y,P
switch(t){case"top left":y=p,P=d-s
break
case"top center":y=l,P=d-s
break
case"top right":y=m-c,P=d-s
break
case"right top":y=m,P=d
break
case"right middle":y=m,P=f
break
case"right bottom":y=m,P=g-s
break
case"bottom left":y=p,P=g
break
case"bottom center":y=l,P=g
break
case"bottom right":y=m-c,P=g
break
case"left top":y=p-c,P=d
break
case"left middle":y=p-c,P=f
break
case"left bottom":y=p-c,P=g-s}return y+=w+b,P+=_+h,[y,P]}o.r(e),o.d(e,{getCoords:()=>r,getPosition:()=>i})},852:(t,e,o)=>{var n,i
t.exports=(n=_eai_d,i=_eai_r,window.emberAutoImportDynamic=function(t){return 1===arguments.length?i("_eai_dyn_"+t):i("_eai_dynt_"+t)(Array.prototype.slice.call(arguments,1))},window.emberAutoImportSync=function(t){return i("_eai_sync_"+t)(Array.prototype.slice.call(arguments,1))},n("@zestia/animation-utils",[],(function(){return o(259)})),void n("@zestia/position-utils",[],(function(){return o(940)})))},728:function(t,e){window._eai_r=require,window._eai_d=define}},e={}
function o(n){var i=e[n]
if(void 0!==i)return i.exports
var r=e[n]={exports:{}}
return t[n].call(r.exports,r,r.exports,o),r.exports}o.d=(t,e)=>{for(var n in e)o.o(e,n)&&!o.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},o.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),o.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o(728)
var n=o(852)
__ember_auto_import__=n})()
