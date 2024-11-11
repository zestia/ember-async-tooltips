"use strict";(globalThis.webpackChunk_ember_auto_import_=globalThis.webpackChunk_ember_auto_import_||[]).push([[109],{60:(e,t,i)=>{async function n(e,t={}){if("function"==typeof e.getAnimations)return i().length<1&&!0!==t.maybe?await new Promise((t=>{e.addEventListener("animationstart",t,{once:!0}),e.addEventListener("transitionstart",t,{once:!0})})):await new Promise(window.requestAnimationFrame),Promise.allSettled(i().map((e=>e.finished)))
function i(){return e.getAnimations({subtree:t.subtree}).filter((e=>t.transitionProperty?e.transitionProperty===t.transitionProperty:!t.animationName||e.animationName===t.animationName))}}i.r(t),i.d(t,{waitForAnimation:()=>n})},641:(e,t,i)=>{function n(e){return[e.left+e.width/2,e.top+e.height/2]}function r(e,t,i,r){const o=e.getBoundingClientRect()
var s
const a=function(e,t,i){const n=e.width/t,r=e.height/i
return{left:e.left+n,top:e.top+r,right:e.right-n,bottom:e.bottom-r}}((s=t)instanceof Window?{top:0,left:0,right:s.innerWidth,bottom:s.innerHeight,width:s.innerWidth,height:s.innerHeight}:s instanceof Document?s.documentElement.getBoundingClientRect():s.getBoundingClientRect(),i,r)
return function(e,t){const i=n(e),[r,o]=i,s=[]
return o<=t.top?s.push("top"):o>=t.bottom?s.push("bottom"):s.push("middle"),r<=t.left?s.push("left"):r>=t.right?s.push("right"):s.push("center"),s.join(" ")}(o,a)}function o(e,t,i){if(!t.offsetParent)return[0,0]
const r=t.getBoundingClientRect(),o=i.getBoundingClientRect(),s=t.offsetParent.getBoundingClientRect(),a=r.height,l=r.width,u=n(o),c=u[0]-l/2,d=u[1]-a/2,p=o.top,f=o.left,h=f+o.width,m=p+o.height,b=t.offsetParent.scrollTop,g=t.offsetParent.scrollLeft,v=-1*s.top,k=-1*s.left
let y,w
switch(e){case"top left":y=f,w=p-a
break
case"top center":y=c,w=p-a
break
case"top right":y=h-l,w=p-a
break
case"right top":y=h,w=p
break
case"right middle":y=h,w=d
break
case"right bottom":y=h,w=m-a
break
case"bottom left":y=f,w=m
break
case"bottom center":y=c,w=m
break
case"bottom right":y=h-l,w=m
break
case"left top":y=f-l,w=p
break
case"left middle":y=f-l,w=d
break
case"left bottom":y=f-l,w=m-a}return y+=k+g,w+=v+b,[y,w]}i.r(t),i.d(t,{getCoords:()=>o,getPosition:()=>r})},853:(e,t,i)=>{i.r(t),i.d(t,{default:()=>l,modifier:()=>c})
var n=i(294),r=i(377),o=i(130)
function s(e,t,i){return(t=function(e){var t=function(e,t){if("object"!=typeof e||!e)return e
var i=e[Symbol.toPrimitive]
if(void 0!==i){var n=i.call(e,"string")
if("object"!=typeof n)return n
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e)
return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}class a{constructor(e){s(this,"capabilities",(0,r.capabilities)("3.22")),this.owner=e}createModifier(e,t){return{instance:new e(this.owner,t),element:null}}installModifier(e,t,i){const n=function(e,t){const i=e
return i.element=t,i}(e,t)
n.instance.modify(t,i.positional,i.named)}updateModifier(e,t){e.instance.modify(e.element,t.positional,t.named)}destroyModifier({instance:e}){(0,o.destroy)(e)}}class l{constructor(e,t){(0,n.setOwner)(this,e)}modify(e,t,i){}}(0,r.setModifierManager)((e=>new a(e)),l)
const u=new class{constructor(){s(this,"capabilities",(0,r.capabilities)("3.22"))}createModifier(e){return{element:null,instance:e}}installModifier(e,t,i){const n=function(e,t){const i=e
return i.element=t,i}(e,t),{positional:r,named:o}=i,s=e.instance(t,r,o)
"function"==typeof s&&(n.teardown=s)}updateModifier(e,t){"function"==typeof e.teardown&&e.teardown()
const i=e.instance(e.element,t.positional,t.named)
"function"==typeof i&&(e.teardown=i)}destroyModifier(e){"function"==typeof e.teardown&&e.teardown()}getDebugName(e){return e.instance.toString()}getDebugInstance(e){return e}}
function c(e,t){return e.toString=()=>t?.name||e.name,(0,r.setModifierManager)((()=>u),e)}},81:(e,t,i)=>{function n(e,t,i){return(t="symbol"==typeof(n=function(e,t){if("object"!=typeof e||!e)return e
var i=e[Symbol.toPrimitive]
if(void 0!==i){var n=i.call(e,"string")
if("object"!=typeof n)return n
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(t))?n:String(n))in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e
var n}function r(e,t,i,n){i&&Object.defineProperty(e,t,{enumerable:i.enumerable,configurable:i.configurable,writable:i.writable,value:i.initializer?i.initializer.call(n):void 0})}function o(e,t,i,n,r){var o={}
return Object.keys(n).forEach((function(e){o[e]=n[e]})),o.enumerable=!!o.enumerable,o.configurable=!!o.configurable,("value"in o||o.initializer)&&(o.writable=!0),o=i.slice().reverse().reduce((function(i,n){return n(e,t,i)||i}),o),r&&void 0!==o.initializer&&(o.value=o.initializer?o.initializer.call(r):void 0,o.initializer=void 0),void 0===o.initializer&&(Object.defineProperty(e,t,o),o=null),o}i.d(t,{_:()=>o,a:()=>r,b:()=>n})},266:(e,t,i)=>{i.r(t),i.d(t,{default:()=>d})
var n,r,o,s=i(81),a=i(735),l=i(336),u=i.n(l),c=i(666)
let d=(n=(0,a.inject)("page-title"),r=class extends(u()){constructor(e){super(e),(0,s.a)(this,"tokens",o,this),(0,s.b)(this,"tokenId",(0,c.guidFor)(this)),this.tokens.push({id:this.tokenId})}compute(e,t){const i={...t,id:this.tokenId,title:e.join("")}
return this.tokens.push(i),this.tokens.scheduleTitleUpdate(),""}willDestroy(){super.willDestroy(),this.tokens.remove(this.tokenId),this.tokens.scheduleTitleUpdate()}},o=(0,s._)(r.prototype,"tokens",[n],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),r)},299:(e,t,i)=>{i.r(t),i.d(t,{default:()=>g})
var n,r,o,s,a,l=i(81),u=i(223),c=i(735),d=i.n(c),p=i(553),f=i(603)
const h="undefined"!=typeof FastBoot,m="routeDidChange",b=["separator","prepend","replace"]
let g=(n=(0,c.inject)("router"),r=(0,c.inject)("-document"),o=class extends(d()){constructor(e){if(super(e),(0,l.a)(this,"router",s,this),(0,l.a)(this,"document",a,this),(0,l.b)(this,"tokens",[]),(0,l.b)(this,"_defaultConfig",{separator:" | ",prepend:!0,replace:null}),(0,l.b)(this,"scheduleTitleUpdate",(()=>{(0,u.scheduleOnce)("afterRender",this,this._updateTitle)})),this._validateExistingTitleElement(),function(e){return"resolveRegistration"in e}(e)){const i=e.resolveRegistration("config:environment")
"object"==typeof(t=i)&&null!==t&&"pageTitle"in t&&b.forEach((e=>{if(!(0,p.isEmpty)(i.pageTitle[e])){const t=i.pageTitle[e]
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
h?this.updateFastbootTitle(e):this.document.title=e,this.titleDidUpdate(e)}_validateExistingTitleElement(){h||(0,f.assert)("[ember-page-title]: Multiple title elements found. Check for other addons like ember-cli-head updating <title> as well.",document.head.querySelectorAll("title").length<=1)}_findTokenById(e){return this.tokens.find((t=>t.id===e))}updateFastbootTitle(e){if(!h)return
const t=this.document.head,i=t.childNodes
for(let o=0;o<i.length;o++){const e=i[o]
e&&"title"===e.nodeName.toLowerCase()&&t.removeChild(e)}const n=this.document.createElement("title"),r=this.document.createTextNode(e)
n.appendChild(r),t.appendChild(n)}titleDidUpdate(e){}},s=(0,l._)(o.prototype,"router",[n],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),a=(0,l._)(o.prototype,"document",[r],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),o)}}])
