var __ember_auto_import__;(()=>{var t={259:(t,e,n)=>{"use strict"
async function o(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
if("function"==typeof t.getAnimations)return n().length<1&&!0!==e.maybe?await new Promise((e=>{t.addEventListener("animationstart",e,{once:!0}),t.addEventListener("transitionstart",e,{once:!0})})):await new Promise(window.requestAnimationFrame),Promise.allSettled(n().map((t=>t.finished)))
function n(){return t.getAnimations({subtree:e.subtree}).filter((t=>e.transitionProperty?t.transitionProperty===e.transitionProperty:!e.animationName||t.animationName===e.animationName))}}n.r(e),n.d(e,{waitForAnimation:()=>o})},940:(t,e,n)=>{"use strict"
function o(t){return[t.left+t.width/2,t.top+t.height/2]}function i(t,e,n,i){const r=t.getBoundingClientRect()
var a
const s=function(t,e,n){const o=t.width/e,i=t.height/n
return{left:t.left+o,top:t.top+i,right:t.right-o,bottom:t.bottom-i}}((a=e)instanceof Window?{top:0,left:0,right:a.innerWidth,bottom:a.innerHeight,width:a.innerWidth,height:a.innerHeight}:a instanceof Document?a.documentElement.getBoundingClientRect():a.getBoundingClientRect(),n,i)
return function(t,e){const n=o(t),[i,r]=n,a=[]
return r<=e.top?a.push("top"):r>=e.bottom?a.push("bottom"):a.push("middle"),i<=e.left?a.push("left"):i>=e.right?a.push("right"):a.push("center"),a.join(" ")}(r,s)}function r(t,e,n){if(!e.offsetParent)return[0,0]
const i=e.getBoundingClientRect(),r=n.getBoundingClientRect(),a=e.offsetParent.getBoundingClientRect(),s=i.height,c=i.width,u=o(r),l=u[0]-c/2,d=u[1]-s/2,f=r.top,m=r.left,p=m+r.width,g=f+r.height,h=e.offsetParent.scrollTop,b=e.offsetParent.scrollLeft,_=-1*a.top,y=-1*a.left
let w,v
switch(t){case"top left":w=m,v=f-s
break
case"top center":w=l,v=f-s
break
case"top right":w=p-c,v=f-s
break
case"right top":w=p,v=f
break
case"right middle":w=p,v=d
break
case"right bottom":w=p,v=g-s
break
case"bottom left":w=m,v=g
break
case"bottom center":w=l,v=g
break
case"bottom right":w=p-c,v=g
break
case"left top":w=m-c,v=f
break
case"left middle":w=m-c,v=d
break
case"left bottom":w=m-c,v=g-s}return w+=y+b,v+=_+h,[w,v]}n.r(e),n.d(e,{getCoords:()=>r,getPosition:()=>i})},61:(t,e,n)=>{var o,i
t.exports=(o=_eai_d,i=_eai_r,window.emberAutoImportDynamic=function(t){return 1===arguments.length?i("_eai_dyn_"+t):i("_eai_dynt_"+t)(Array.prototype.slice.call(arguments,1))},window.emberAutoImportSync=function(t){return i("_eai_sync_"+t)(Array.prototype.slice.call(arguments,1))},o("@zestia/animation-utils",[],(function(){return n(259)})),void o("@zestia/position-utils",[],(function(){return n(940)})))},547:function(t,e){window._eai_r=require,window._eai_d=define}},e={}
function n(o){var i=e[o]
if(void 0!==i)return i.exports
var r=e[o]={exports:{}}
return t[o].call(r.exports,r,r.exports,n),r.exports}n.d=(t,e)=>{for(var o in e)n.o(e,o)&&!n.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n(547)
var o=n(61)
__ember_auto_import__=o})()
