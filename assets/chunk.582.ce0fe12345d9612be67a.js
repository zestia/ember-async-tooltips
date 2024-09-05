var __ember_auto_import__;(()=>{var e={60:(e,t,i)=>{"use strict"
async function r(e,t={}){if("function"==typeof e.getAnimations)return i().length<1&&!0!==t.maybe?await new Promise((t=>{e.addEventListener("animationstart",t,{once:!0}),e.addEventListener("transitionstart",t,{once:!0})})):await new Promise(window.requestAnimationFrame),Promise.allSettled(i().map((e=>e.finished)))
function i(){return e.getAnimations({subtree:t.subtree}).filter((e=>t.transitionProperty?e.transitionProperty===t.transitionProperty:!t.animationName||e.animationName===t.animationName))}}i.r(t),i.d(t,{waitForAnimation:()=>r})},641:(e,t,i)=>{"use strict"
function r(e){return[e.left+e.width/2,e.top+e.height/2]}function n(e,t,i,n){const o=e.getBoundingClientRect()
var s
const l=function(e,t,i){const r=e.width/t,n=e.height/i
return{left:e.left+r,top:e.top+n,right:e.right-r,bottom:e.bottom-n}}((s=t)instanceof Window?{top:0,left:0,right:s.innerWidth,bottom:s.innerHeight,width:s.innerWidth,height:s.innerHeight}:s instanceof Document?s.documentElement.getBoundingClientRect():s.getBoundingClientRect(),i,n)
return function(e,t){const i=r(e),[n,o]=i,s=[]
return o<=t.top?s.push("top"):o>=t.bottom?s.push("bottom"):s.push("middle"),n<=t.left?s.push("left"):n>=t.right?s.push("right"):s.push("center"),s.join(" ")}(o,l)}function o(e,t,i){if(!t.offsetParent)return[0,0]
const n=t.getBoundingClientRect(),o=i.getBoundingClientRect(),s=t.offsetParent.getBoundingClientRect(),l=n.height,a=n.width,u=r(o),c=u[0]-a/2,p=u[1]-l/2,d=o.top,f=o.left,h=f+o.width,m=d+o.height,b=t.offsetParent.scrollTop,g=t.offsetParent.scrollLeft,_=-1*s.top,v=-1*s.left
let y,k
switch(e){case"top left":y=f,k=d-l
break
case"top center":y=c,k=d-l
break
case"top right":y=h-a,k=d-l
break
case"right top":y=h,k=d
break
case"right middle":y=h,k=p
break
case"right bottom":y=h,k=m-l
break
case"bottom left":y=f,k=m
break
case"bottom center":y=c,k=m
break
case"bottom right":y=h-a,k=m
break
case"left top":y=f-a,k=d
break
case"left middle":y=f-a,k=p
break
case"left bottom":y=f-a,k=m-l}return y+=v+g,k+=_+b,[y,k]}i.r(t),i.d(t,{getCoords:()=>o,getPosition:()=>n})},81:(e,t,i)=>{"use strict"
function r(e,t,i){return(t="symbol"==typeof(r=function(e,t){if("object"!=typeof e||!e)return e
var i=e[Symbol.toPrimitive]
if(void 0!==i){var r=i.call(e,"string")
if("object"!=typeof r)return r
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(t))?r:String(r))in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e
var r}function n(e,t,i,r){i&&Object.defineProperty(e,t,{enumerable:i.enumerable,configurable:i.configurable,writable:i.writable,value:i.initializer?i.initializer.call(r):void 0})}function o(e,t,i,r,n){var o={}
return Object.keys(r).forEach((function(e){o[e]=r[e]})),o.enumerable=!!o.enumerable,o.configurable=!!o.configurable,("value"in o||o.initializer)&&(o.writable=!0),o=i.slice().reverse().reduce((function(i,r){return r(e,t,i)||i}),o),n&&void 0!==o.initializer&&(o.value=o.initializer?o.initializer.call(n):void 0,o.initializer=void 0),void 0===o.initializer&&(Object.defineProperty(e,t,o),o=null),o}i.d(t,{_:()=>o,a:()=>n,b:()=>r})},887:(e,t,i)=>{"use strict"
i.r(t),i.d(t,{default:()=>p})
var r=i(81),n=i(735)
const o=require("@ember/component/helper")
var s=i.n(o)
const l=require("@ember/object/internals")
var a,u,c
let p=(a=(0,n.inject)("page-title"),u=class extends(s()){constructor(e){super(e),(0,r.a)(this,"tokens",c,this),(0,r.b)(this,"tokenId",(0,l.guidFor)(this)),this.tokens.push({id:this.tokenId})}compute(e,t){const i={...t,id:this.tokenId,title:e.join("")}
return this.tokens.push(i),this.tokens.scheduleTitleUpdate(),""}willDestroy(){super.willDestroy(),this.tokens.remove(this.tokenId),this.tokens.scheduleTitleUpdate()}},c=(0,r._)(u.prototype,"tokens",[a],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),u)},201:(e,t,i)=>{"use strict"
i.r(t),i.d(t,{default:()=>g})
var r=i(81)
const n=require("@ember/runloop")
var o=i(735),s=i.n(o)
const l=require("@ember/utils"),a=require("@ember/debug")
var u,c,p,d,f
const h="undefined"!=typeof FastBoot,m="routeDidChange",b=["separator","prepend","replace"]
let g=(u=(0,o.inject)("router"),c=(0,o.inject)("-document"),p=class extends(s()){constructor(e){if(super(e),(0,r.a)(this,"router",d,this),(0,r.a)(this,"document",f,this),(0,r.b)(this,"tokens",[]),(0,r.b)(this,"_defaultConfig",{separator:" | ",prepend:!0,replace:null}),(0,r.b)(this,"scheduleTitleUpdate",(()=>{(0,n.scheduleOnce)("afterRender",this,this._updateTitle)})),this._validateExistingTitleElement(),function(e){return"resolveRegistration"in e}(e)){const i=e.resolveRegistration("config:environment")
"object"==typeof(t=i)&&null!==t&&"pageTitle"in t&&b.forEach((e=>{if(!(0,l.isEmpty)(i.pageTitle[e])){const t=i.pageTitle[e]
this._defaultConfig[e]=t}}))}var t
this.router.on(m,this.scheduleTitleUpdate)}applyTokenDefaults(e){const t=this._defaultConfig.separator,i=this._defaultConfig.prepend,r=this._defaultConfig.replace
e.previous??=null,e.next??=null,null==e.separator&&(e.separator=t),null==e.prepend&&null!=i&&(e.prepend=i),null==e.replace&&null!=r&&(e.replace=r)}inheritFromPrevious(e){const t=e.previous
t&&(null==e.separator&&(e.separator=t.separator),null==e.prepend&&(e.prepend=t.prepend))}push(e){const t=this._findTokenById(e.id)
if(t){const i=this.tokens.indexOf(t),r=[...this.tokens],n=t.previous
return e.previous=n,e.next=t.next,this.inheritFromPrevious(e),this.applyTokenDefaults(e),r.splice(i,1,e),void(this.tokens=r)}const i=this.tokens.slice(-1)[0]
i&&(e.previous=i??null,i.next=e,this.inheritFromPrevious(e)),this.applyTokenDefaults(e),this.tokens=[...this.tokens,e]}remove(e){const t=this._findTokenById(e)
if(!t)return
const{next:i,previous:r}=t
i&&(i.previous=r),r&&(r.next=i),t.previous=t.next=null
const n=[...this.tokens]
n.splice(n.indexOf(t),1),this.tokens=n}get visibleTokens(){const e=this.tokens
let t=e?e.length:0
const i=[]
for(;t--;){const r=e[t]
if(r){if(r.replace){i.unshift(r)
break}i.unshift(r)}}return i}get sortedTokens(){const e=this.visibleTokens
if(!e)return[]
let t=!0,i=[]
const r=[i],n=[]
return e.forEach((e=>{if(e.front)n.unshift(e)
else if(e.prepend){t&&(t=!1,i=[],r.push(i))
const n=i[0]
n&&((e={...e}).separator=n.separator),i.unshift(e)}else t||(t=!0,i=[],r.push(i)),i.push(e)})),n.concat(r.reduce(((e,t)=>e.concat(t)),[]))}toString(){const e=this.sortedTokens,t=[]
for(let i=0,r=e.length;i<r;i++){const n=e[i]
n&&n.title&&(t.push(n.title),i+1<r&&t.push(n.separator))}return t.join("")}willDestroy(){super.willDestroy(),this.router.off(m,this.scheduleTitleUpdate)}_updateTitle(){const e=this.toString()
h?this.updateFastbootTitle(e):this.document.title=e,this.titleDidUpdate(e)}_validateExistingTitleElement(){h||(0,a.assert)("[ember-page-title]: Multiple title elements found. Check for other addons like ember-cli-head updating <title> as well.",document.head.querySelectorAll("title").length<=1)}_findTokenById(e){return this.tokens.find((t=>t.id===e))}updateFastbootTitle(e){if(!h)return
const t=this.document.head,i=t.childNodes
for(let o=0;o<i.length;o++){const e=i[o]
e&&"title"===e.nodeName.toLowerCase()&&t.removeChild(e)}const r=this.document.createElement("title"),n=this.document.createTextNode(e)
r.appendChild(n),t.appendChild(r)}titleDidUpdate(e){}},d=(0,r._)(p.prototype,"router",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),f=(0,r._)(p.prototype,"document",[c],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),p)},735:e=>{"use strict"
e.exports=require("@ember/service")},26:(e,t,i)=>{e.exports=function(){var e=_eai_d,t=_eai_r
function r(e){return e&&e.__esModule?e:Object.assign({default:e},e)}window.emberAutoImportDynamic=function(e){return 1===arguments.length?t("_eai_dyn_"+e):t("_eai_dynt_"+e)(Array.prototype.slice.call(arguments,1))},window.emberAutoImportSync=function(e){return t("_eai_sync_"+e)(Array.prototype.slice.call(arguments,1))},e("@zestia/animation-utils",[],(function(){return r(i(60))})),e("@zestia/position-utils",[],(function(){return r(i(641))})),e("ember-page-title/helpers/page-title",["@ember/service"],(function(){return r(i(887))})),e("ember-page-title/services/page-title",["@ember/service"],(function(){return r(i(201))}))}()},655:function(e,t){window._eai_r=require,window._eai_d=define},116:(e,t,i)=>{var r,n
e.exports=(r=_eai_d,n=_eai_r,window.emberAutoImportDynamic=function(e){return 1===arguments.length?n("_eai_dyn_"+e):n("_eai_dynt_"+e)(Array.prototype.slice.call(arguments,1))},window.emberAutoImportSync=function(e){return n("_eai_sync_"+e)(Array.prototype.slice.call(arguments,1))},r("dom-element-descriptors",[],(function(){return(e=i(994))&&e.__esModule?e:Object.assign({default:e},e)
var e})),void i(26))},994:(e,t,i)=>{"use strict"
i.r(t),i.d(t,{IS_DESCRIPTOR:()=>r,createDescriptor:()=>p,isDescriptor:()=>n,lookupDescriptorData:()=>l,registerDescriptorData:()=>s,resolveDOMElement:()=>a,resolveDOMElements:()=>u,resolveDescription:()=>c})
const r="__dom_element_descriptor_is_descriptor__"
function n(e){return Boolean("object"==typeof e&&e&&r in e)}function o(){const e=window
return e.domElementDescriptorsRegistry=e.domElementDescriptorsRegistry||new WeakMap,e.domElementDescriptorsRegistry}function s(e,t){t?o().set(e,t):o().delete(e)}function l(e){return o().get(e)||null}function a(e){let t=n(e)?l(e):e
if(!t)return null
if(void 0!==t.element)return t.element
for(let i of t.elements||[])return i
return null}function u(e){let t=n(e)?l(e):e
if(!t)return[]
if(t.elements)return Array.from(t.elements)
{let e=t.element
return e?[e]:[]}}function c(e){let t=n(e)?l(e):e
return t?.description}function p(e){let t={[r]:!0}
return s(t,e),t}}},t={}
function i(r){var n=t[r]
if(void 0!==n)return n.exports
var o=t[r]={exports:{}}
return e[r].call(o.exports,o,o.exports,i),o.exports}i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e
return i.d(t,{a:t}),t},i.d=(e,t)=>{for(var r in t)i.o(t,r)&&!i.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i(655)
var r=i(116)
__ember_auto_import__=r})()
