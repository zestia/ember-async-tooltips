var __ember_auto_import__;(()=>{var e={60:(e,t,i)=>{"use strict"
async function n(e,t={}){if("function"==typeof e.getAnimations)return i().length<1&&!0!==t.maybe?await new Promise((t=>{e.addEventListener("animationstart",t,{once:!0}),e.addEventListener("transitionstart",t,{once:!0})})):await new Promise(window.requestAnimationFrame),Promise.allSettled(i().map((e=>e.finished)))
function i(){return e.getAnimations({subtree:t.subtree}).filter((e=>t.transitionProperty?e.transitionProperty===t.transitionProperty:!t.animationName||e.animationName===t.animationName))}}i.r(t),i.d(t,{waitForAnimation:()=>n})},641:(e,t,i)=>{"use strict"
function n(e){return[e.left+e.width/2,e.top+e.height/2]}function r(e,t,i,r){const o=e.getBoundingClientRect()
var s
const a=function(e,t,i){const n=e.width/t,r=e.height/i
return{left:e.left+n,top:e.top+r,right:e.right-n,bottom:e.bottom-r}}((s=t)instanceof Window?{top:0,left:0,right:s.innerWidth,bottom:s.innerHeight,width:s.innerWidth,height:s.innerHeight}:s instanceof Document?s.documentElement.getBoundingClientRect():s.getBoundingClientRect(),i,r)
return function(e,t){const i=n(e),[r,o]=i,s=[]
return o<=t.top?s.push("top"):o>=t.bottom?s.push("bottom"):s.push("middle"),r<=t.left?s.push("left"):r>=t.right?s.push("right"):s.push("center"),s.join(" ")}(o,a)}function o(e,t,i){if(!t.offsetParent)return[0,0]
const r=t.getBoundingClientRect(),o=i.getBoundingClientRect(),s=t.offsetParent.getBoundingClientRect(),a=r.height,l=r.width,u=n(o),c=u[0]-l/2,p=u[1]-a/2,d=o.top,h=o.left,f=h+o.width,m=d+o.height,b=t.offsetParent.scrollTop,g=t.offsetParent.scrollLeft,v=-1*s.top,y=-1*s.left
let _,k
switch(e){case"top left":_=h,k=d-a
break
case"top center":_=c,k=d-a
break
case"top right":_=f-l,k=d-a
break
case"right top":_=f,k=d
break
case"right middle":_=f,k=p
break
case"right bottom":_=f,k=m-a
break
case"bottom left":_=h,k=m
break
case"bottom center":_=c,k=m
break
case"bottom right":_=f-l,k=m
break
case"left top":_=h-l,k=d
break
case"left middle":_=h-l,k=p
break
case"left bottom":_=h-l,k=m-a}return _+=y+g,k+=v+b,[_,k]}i.r(t),i.d(t,{getCoords:()=>o,getPosition:()=>r})},81:(e,t,i)=>{"use strict"
function n(e,t,i){return(t="symbol"==typeof(n=function(e,t){if("object"!=typeof e||!e)return e
var i=e[Symbol.toPrimitive]
if(void 0!==i){var n=i.call(e,"string")
if("object"!=typeof n)return n
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(t))?n:String(n))in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e
var n}function r(e,t,i,n){i&&Object.defineProperty(e,t,{enumerable:i.enumerable,configurable:i.configurable,writable:i.writable,value:i.initializer?i.initializer.call(n):void 0})}function o(e,t,i,n,r){var o={}
return Object.keys(n).forEach((function(e){o[e]=n[e]})),o.enumerable=!!o.enumerable,o.configurable=!!o.configurable,("value"in o||o.initializer)&&(o.writable=!0),o=i.slice().reverse().reduce((function(i,n){return n(e,t,i)||i}),o),r&&void 0!==o.initializer&&(o.value=o.initializer?o.initializer.call(r):void 0,o.initializer=void 0),void 0===o.initializer&&(Object.defineProperty(e,t,o),o=null),o}i.d(t,{_:()=>o,a:()=>r,b:()=>n})},887:(e,t,i)=>{"use strict"
i.r(t),i.d(t,{default:()=>p})
var n=i(81),r=i(735)
const o=require("@ember/component/helper")
var s=i.n(o)
const a=require("@ember/object/internals")
var l,u,c
let p=(l=(0,r.inject)("page-title"),u=class extends(s()){constructor(e){super(e),(0,n.a)(this,"tokens",c,this),(0,n.b)(this,"tokenId",(0,a.guidFor)(this)),this.tokens.push({id:this.tokenId})}compute(e,t){const i={...t,id:this.tokenId,title:e.join("")}
return this.tokens.push(i),this.tokens.scheduleTitleUpdate(),""}willDestroy(){super.willDestroy(),this.tokens.remove(this.tokenId),this.tokens.scheduleTitleUpdate()}},c=(0,n._)(u.prototype,"tokens",[l],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),u)},201:(e,t,i)=>{"use strict"
i.r(t),i.d(t,{default:()=>g})
var n=i(81)
const r=require("@ember/runloop")
var o=i(735),s=i.n(o)
const a=require("@ember/utils"),l=require("@ember/debug")
var u,c,p,d,h
const f="undefined"!=typeof FastBoot,m="routeDidChange",b=["separator","prepend","replace"]
let g=(u=(0,o.inject)("router"),c=(0,o.inject)("-document"),p=class extends(s()){constructor(e){if(super(e),(0,n.a)(this,"router",d,this),(0,n.a)(this,"document",h,this),(0,n.b)(this,"tokens",[]),(0,n.b)(this,"_defaultConfig",{separator:" | ",prepend:!0,replace:null}),(0,n.b)(this,"scheduleTitleUpdate",(()=>{(0,r.scheduleOnce)("afterRender",this,this._updateTitle)})),this._validateExistingTitleElement(),function(e){return"resolveRegistration"in e}(e)){const i=e.resolveRegistration("config:environment")
"object"==typeof(t=i)&&null!==t&&"pageTitle"in t&&b.forEach((e=>{if(!(0,a.isEmpty)(i.pageTitle[e])){const t=i.pageTitle[e]
this._defaultConfig[e]=t}}))}var t
this.router.on(m,this.scheduleTitleUpdate)}applyTokenDefaults(e){const t=this._defaultConfig.separator,i=this._defaultConfig.prepend,n=this._defaultConfig.replace
e.previous??=null,e.next??=null,null==e.separator&&(e.separator=t),null==e.prepend&&null!=i&&(e.prepend=i),null==e.replace&&null!=n&&(e.replace=n)}inheritFromPrevious(e){const t=e.previous
t&&(null==e.separator&&(e.separator=t.separator),null==e.prepend&&(e.prepend=t.prepend))}push(e){const t=this._findTokenById(e.id)
if(t){const i=this.tokens.indexOf(t),n=[...this.tokens],r=t.previous
return e.previous=r,e.next=t.next,this.inheritFromPrevious(e),this.applyTokenDefaults(e),n.splice(i,1,e),void(this.tokens=n)}const i=this.tokens.slice(-1)[0]
i&&(e.previous=i??null,i.next=e,this.inheritFromPrevious(e)),this.applyTokenDefaults(e),this.tokens=[...this.tokens,e]}remove(e){const t=this._findTokenById(e)
if(!t)return
const{next:i,previous:n}=t
i&&(i.previous=n),n&&(n.next=i),t.previous=t.next=null
const r=[...this.tokens]
r.splice(r.indexOf(t),1),this.tokens=r}get visibleTokens(){const e=this.tokens
let t=e?e.length:0
const i=[]
for(;t--;){const n=e[t]
if(n){if(n.replace){i.unshift(n)
break}i.unshift(n)}}return i}get sortedTokens(){const e=this.visibleTokens
if(!e)return[]
let t=!0,i=[]
const n=[i],r=[]
return e.forEach((e=>{if(e.front)r.unshift(e)
else if(e.prepend){t&&(t=!1,i=[],n.push(i))
const r=i[0]
r&&((e={...e}).separator=r.separator),i.unshift(e)}else t||(t=!0,i=[],n.push(i)),i.push(e)})),r.concat(n.reduce(((e,t)=>e.concat(t)),[]))}toString(){const e=this.sortedTokens,t=[]
for(let i=0,n=e.length;i<n;i++){const r=e[i]
r&&r.title&&(t.push(r.title),i+1<n&&t.push(r.separator))}return t.join("")}willDestroy(){super.willDestroy(),this.router.off(m,this.scheduleTitleUpdate)}_updateTitle(){const e=this.toString()
f?this.updateFastbootTitle(e):this.document.title=e,this.titleDidUpdate(e)}_validateExistingTitleElement(){f||(0,l.assert)("[ember-page-title]: Multiple title elements found. Check for other addons like ember-cli-head updating <title> as well.",document.head.querySelectorAll("title").length<=1)}_findTokenById(e){return this.tokens.find((t=>t.id===e))}updateFastbootTitle(e){if(!f)return
const t=this.document.head,i=t.childNodes
for(let o=0;o<i.length;o++){const e=i[o]
e&&"title"===e.nodeName.toLowerCase()&&t.removeChild(e)}const n=this.document.createElement("title"),r=this.document.createTextNode(e)
n.appendChild(r),t.appendChild(n)}titleDidUpdate(e){}},d=(0,n._)(p.prototype,"router",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),h=(0,n._)(p.prototype,"document",[c],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),p)},735:e=>{"use strict"
e.exports=require("@ember/service")},26:(e,t,i)=>{e.exports=function(){var e=_eai_d,t=_eai_r
function n(e){return e&&e.__esModule?e:Object.assign({default:e},e)}window.emberAutoImportDynamic=function(e){return 1===arguments.length?t("_eai_dyn_"+e):t("_eai_dynt_"+e)(Array.prototype.slice.call(arguments,1))},window.emberAutoImportSync=function(e){return t("_eai_sync_"+e)(Array.prototype.slice.call(arguments,1))},e("@zestia/animation-utils",[],(function(){return n(i(60))})),e("@zestia/position-utils",[],(function(){return n(i(641))})),e("ember-page-title/helpers/page-title",["@ember/service"],(function(){return n(i(887))})),e("ember-page-title/services/page-title",["@ember/service"],(function(){return n(i(201))}))}()},655:function(e,t){window._eai_r=require,window._eai_d=define}},t={}
function i(n){var r=t[n]
if(void 0!==r)return r.exports
var o=t[n]={exports:{}}
return e[n].call(o.exports,o,o.exports,i),o.exports}i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e
return i.d(t,{a:t}),t},i.d=(e,t)=>{for(var n in t)i.o(t,n)&&!i.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i(655)
var n=i(26)
__ember_auto_import__=n})()
