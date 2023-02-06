var __ember_auto_import__;(()=>{var t={259:(t,e,o)=>{"use strict"
async function n(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
if(t.getAnimations)return await r(),Promise.allSettled(t.getAnimations({subtree:e.subtree}).filter((t=>e.transitionProperty?t.transitionProperty===e.transitionProperty:!e.animationName||t.animationName===e.animationName)).map((t=>t.finished)))}function r(){return new Promise(window.requestAnimationFrame)}o.r(e),o.d(e,{waitForAnimation:()=>n,waitForFrame:()=>r})},940:(t,e,o)=>{"use strict"
function n(t){return[t.left+t.width/2,t.top+t.height/2]}function r(t,e,o,r){const i=t.getBoundingClientRect()
var a
const s=function(t,e,o){const n=t.width/e,r=t.height/o
return{left:t.left+n,top:t.top+r,right:t.right-n,bottom:t.bottom-r}}((a=e)instanceof Window?{top:0,left:0,right:a.innerWidth,bottom:a.innerHeight,width:a.innerWidth,height:a.innerHeight}:a instanceof Document?a.documentElement.getBoundingClientRect():a.getBoundingClientRect(),o,r)
return function(t,e){const o=n(t),[r,i]=o,a=[]
return i<=e.top?a.push("top"):i>=e.bottom?a.push("bottom"):a.push("middle"),r<=e.left?a.push("left"):r>=e.right?a.push("right"):a.push("center"),a.join(" ")}(i,s)}function i(t,e,o){if(!e.offsetParent)return[0,0]
const r=e.getBoundingClientRect(),i=o.getBoundingClientRect(),a=e.offsetParent.getBoundingClientRect(),s=r.height,c=r.width,l=n(i),u=l[0]-c/2,m=l[1]-s/2,d=i.top,f=i.left,_=f+i.width,p=d+i.height,g=e.offsetParent.scrollTop,b=e.offsetParent.scrollLeft,h=-1*a.top,y=-1*a.left
let w,v
switch(t){case"top left":w=f,v=d-s
break
case"top center":w=u,v=d-s
break
case"top right":w=_-c,v=d-s
break
case"right top":w=_,v=d
break
case"right middle":w=_,v=m
break
case"right bottom":w=_,v=p-s
break
case"bottom left":w=f,v=p
break
case"bottom center":w=u,v=p
break
case"bottom right":w=_-c,v=p
break
case"left top":w=f-c,v=d
break
case"left middle":w=f-c,v=m
break
case"left bottom":w=f-c,v=p-s}return w+=y+b,v+=h+g,[w,v]}o.r(e),o.d(e,{getCoords:()=>i,getPosition:()=>r})},327:(t,e,o)=>{var n,r
t.exports=(n=_eai_d,r=_eai_r,window.emberAutoImportDynamic=function(t){return 1===arguments.length?r("_eai_dyn_"+t):r("_eai_dynt_"+t)(Array.prototype.slice.call(arguments,1))},window.emberAutoImportSync=function(t){return r("_eai_sync_"+t)(Array.prototype.slice.call(arguments,1))},n("__v1-addons__early-boot-set__",["@glimmer/tracking","@glimmer/component","@ember/service","@ember/controller","@ember/routing/route","@ember/component"],(function(){})),n("@zestia/animation-utils",["__v1-addons__early-boot-set__"],(function(){return o(259)})),void n("@zestia/position-utils",["__v1-addons__early-boot-set__"],(function(){return o(940)})))},863:function(t,e){window._eai_r=require,window._eai_d=define}},e={}
function o(n){var r=e[n]
if(void 0!==r)return r.exports
var i=e[n]={exports:{}}
return t[n].call(i.exports,i,i.exports,o),i.exports}o.d=(t,e)=>{for(var n in e)o.o(e,n)&&!o.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},o.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),o.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o(863)
var n=o(327)
__ember_auto_import__=n})()
