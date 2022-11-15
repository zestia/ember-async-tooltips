"use strict"
define("dummy/app",["exports","@ember/application","ember-resolver","ember-load-initializers","dummy/config/environment"],(function(e,t,n,o,i){function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
class l extends t.default{constructor(){super(...arguments),r(this,"modulePrefix",i.default.modulePrefix),r(this,"podModulePrefix",i.default.podModulePrefix),r(this,"Resolver",n.default)}}e.default=l,(0,o.default)(l,i.default.modulePrefix)})),define("dummy/component-managers/glimmer",["exports","@glimmer/component/-private/ember-component-manager"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})})),define("dummy/components/-tooltip",["exports","@zestia/ember-async-tooltips/components/-tooltip"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})})),define("dummy/components/tooltip",["exports","@zestia/ember-async-tooltips/components/tooltip"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})})),define("dummy/controllers/auto-position",["exports","@ember/controller","@ember/object","@ember/service"],(function(e,t,n,o){var i,r,l
function a(e,t,n,o,i){var r={}
return Object.keys(o).forEach((function(e){r[e]=o[e]})),r.enumerable=!!r.enumerable,r.configurable=!!r.configurable,("value"in r||r.initializer)&&(r.writable=!0),r=n.slice().reverse().reduce((function(n,o){return o(e,t,n)||n}),r),i&&void 0!==r.initializer&&(r.value=r.initializer?r.initializer.call(i):void 0,r.initializer=void 0),void 0===r.initializer&&(Object.defineProperty(e,t,r),r=null),r}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
let u=(i=(0,o.inject)("tooltip"),r=class extends t.default{constructor(){var e,t,n,o
super(...arguments),e=this,t="tooltipService",o=this,(n=l)&&Object.defineProperty(e,t,{enumerable:n.enumerable,configurable:n.configurable,writable:n.writable,value:n.initializer?n.initializer.call(o):void 0}),document.ondragover=e=>e.preventDefault()}reposition(e){const[t,n]=this.lastPos,[o,i]=this.startPos,r=e.target,l=n-i,a=t-o
r.style.top=`${l}px`,r.style.left=`${a}px`}storeStartPos(e){const t=e.target.getBoundingClientRect()
this.startPos=[e.clientX-t.left,e.clientY-t.top]}storeLastPos(e){const{clientX:t,clientY:n}=e
t&&n&&(this.lastPos=[t,n])}},l=a(r.prototype,"tooltipService",[i],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),a(r.prototype,"reposition",[n.action],Object.getOwnPropertyDescriptor(r.prototype,"reposition"),r.prototype),a(r.prototype,"storeStartPos",[n.action],Object.getOwnPropertyDescriptor(r.prototype,"storeStartPos"),r.prototype),a(r.prototype,"storeLastPos",[n.action],Object.getOwnPropertyDescriptor(r.prototype,"storeLastPos"),r.prototype),r)
e.default=u})),define("dummy/controllers/delays",["exports","@ember/controller","@ember/object","@glimmer/tracking","@ember/runloop","rsvp"],(function(e,t,n,o,i,r){var l,a,u,s,d,p,c,m
function f(e,t,n,o){n&&Object.defineProperty(e,t,{enumerable:n.enumerable,configurable:n.configurable,writable:n.writable,value:n.initializer?n.initializer.call(o):void 0})}function b(e,t,n,o,i){var r={}
return Object.keys(o).forEach((function(e){r[e]=o[e]})),r.enumerable=!!r.enumerable,r.configurable=!!r.configurable,("value"in r||r.initializer)&&(r.writable=!0),r=n.slice().reverse().reduce((function(n,o){return o(e,t,n)||n}),r),i&&void 0!==r.initializer&&(r.value=r.initializer?r.initializer.call(i):void 0,r.initializer=void 0),void 0===r.initializer&&(Object.defineProperty(e,t,r),r=null),r}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
const{max:y}=Math
let h=(l=class extends t.default{constructor(){super(...arguments),f(this,"isEager",a,this),f(this,"showDelay",u,this),f(this,"hideDelay",s,this),f(this,"loadDuration",d,this),f(this,"isLoading",p,this),f(this,"isLoaded",c,this),f(this,"showTooltipper",m,this)}get isLazy(){return!this.isEager}get showLoading(){return this.isEager&&this.isLoading&&this.loadDuration>0}get totalPossibleDelay(){return this.loadDuration+this.showDelay}get totalDelay(){return this.isEager?this.loadDuration>this.showDelay?this.loadDuration:this.showDelay:this.totalPossibleDelay}get timeSaved(){return this.isEager?this.loadDuration>this.showDelay?this.showDelay:this.loadDuration:0}get actualShowDelay(){return this.isEager?y(this.showDelay-this.loadDuration,0):this.showDelay}setEager(e){let{target:{checked:t}}=e
this.isEager=t}setShowDelay(e){let{target:{value:t}}=e
this.showDelay=parseInt(t||0,10)}setHideDelay(e){let{target:{value:t}}=e
this.hideDelay=parseInt(t||0,10)}setLoadDuration(e){let{target:{value:t}}=e
this.loadDuration=parseInt(t||0,10)}load(){return this.isLoading=!0,new r.Promise((e=>{(0,i.later)((()=>{this.isLoading=!1,this.isLoaded=!0,e({message:"Hello World"})}),this.loadDuration)}))}unload(){this.showTooltipper=!1,this.isLoaded=!1,(0,i.next)((()=>this.showTooltipper=!0))}},a=b(l.prototype,"isEager",[o.tracked],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!0}}),u=b(l.prototype,"showDelay",[o.tracked],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 500}}),s=b(l.prototype,"hideDelay",[o.tracked],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 0}}),d=b(l.prototype,"loadDuration",[o.tracked],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 100}}),p=b(l.prototype,"isLoading",[o.tracked],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),c=b(l.prototype,"isLoaded",[o.tracked],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),m=b(l.prototype,"showTooltipper",[o.tracked],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!0}}),b(l.prototype,"setEager",[n.action],Object.getOwnPropertyDescriptor(l.prototype,"setEager"),l.prototype),b(l.prototype,"setShowDelay",[n.action],Object.getOwnPropertyDescriptor(l.prototype,"setShowDelay"),l.prototype),b(l.prototype,"setHideDelay",[n.action],Object.getOwnPropertyDescriptor(l.prototype,"setHideDelay"),l.prototype),b(l.prototype,"setLoadDuration",[n.action],Object.getOwnPropertyDescriptor(l.prototype,"setLoadDuration"),l.prototype),b(l.prototype,"load",[n.action],Object.getOwnPropertyDescriptor(l.prototype,"load"),l.prototype),b(l.prototype,"unload",[n.action],Object.getOwnPropertyDescriptor(l.prototype,"unload"),l.prototype),l)
e.default=h})),define("dummy/controllers/destination",["exports","@ember/controller","@glimmer/tracking","@ember/object"],(function(e,t,n,o){var i,r
function l(e,t,n,o,i){var r={}
return Object.keys(o).forEach((function(e){r[e]=o[e]})),r.enumerable=!!r.enumerable,r.configurable=!!r.configurable,("value"in r||r.initializer)&&(r.writable=!0),r=n.slice().reverse().reduce((function(n,o){return o(e,t,n)||n}),r),i&&void 0!==r.initializer&&(r.value=r.initializer?r.initializer.call(i):void 0,r.initializer=void 0),void 0===r.initializer&&(Object.defineProperty(e,t,r),r=null),r}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
let a=(i=class extends t.default{constructor(){var e,t,n,o
super(...arguments),e=this,t="elsewhere",o=this,(n=r)&&Object.defineProperty(e,t,{enumerable:n.enumerable,configurable:n.configurable,writable:n.writable,value:n.initializer?n.initializer.call(o):void 0})}registerElsewhere(e){this.elsewhere=e}},r=l(i.prototype,"elsewhere",[n.tracked],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),l(i.prototype,"registerElsewhere",[o.action],Object.getOwnPropertyDescriptor(i.prototype,"registerElsewhere"),i.prototype),i)
e.default=a})),define("dummy/controllers/manual-position",["exports","@ember/controller","@ember/object","@glimmer/tracking"],(function(e,t,n,o){var i,r
function l(e,t,n,o,i){var r={}
return Object.keys(o).forEach((function(e){r[e]=o[e]})),r.enumerable=!!r.enumerable,r.configurable=!!r.configurable,("value"in r||r.initializer)&&(r.writable=!0),r=n.slice().reverse().reduce((function(n,o){return o(e,t,n)||n}),r),i&&void 0!==r.initializer&&(r.value=r.initializer?r.initializer.call(i):void 0,r.initializer=void 0),void 0===r.initializer&&(Object.defineProperty(e,t,r),r=null),r}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
let a=(i=class extends t.default{constructor(){var e,t,n,o
super(...arguments),e=this,t="position",o=this,(n=r)&&Object.defineProperty(e,t,{enumerable:n.enumerable,configurable:n.configurable,writable:n.writable,value:n.initializer?n.initializer.call(o):void 0})}setPosition(e){let{target:{value:t}}=e
this.position=t}},r=l(i.prototype,"position",[o.tracked],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return"top left"}}),l(i.prototype,"setPosition",[n.action],Object.getOwnPropertyDescriptor(i.prototype,"setPosition"),i.prototype),i)
e.default=a})),define("dummy/controllers/manual",["exports","@ember/controller","@ember/object","@glimmer/tracking"],(function(e,t,n,o){var i,r
function l(e,t,n,o,i){var r={}
return Object.keys(o).forEach((function(e){r[e]=o[e]})),r.enumerable=!!r.enumerable,r.configurable=!!r.configurable,("value"in r||r.initializer)&&(r.writable=!0),r=n.slice().reverse().reduce((function(n,o){return o(e,t,n)||n}),r),i&&void 0!==r.initializer&&(r.value=r.initializer?r.initializer.call(i):void 0,r.initializer=void 0),void 0===r.initializer&&(Object.defineProperty(e,t,r),r=null),r}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
let a=(i=class extends t.default{constructor(){var e,t,n,o
super(...arguments),e=this,t="shouldShowTooltip",o=this,(n=r)&&Object.defineProperty(e,t,{enumerable:n.enumerable,configurable:n.configurable,writable:n.writable,value:n.initializer?n.initializer.call(o):void 0})}showTooltip(){this.shouldShowTooltip=!0}hideTooltip(){this.shouldShowTooltip=!1}},r=l(i.prototype,"shouldShowTooltip",[o.tracked],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),l(i.prototype,"showTooltip",[n.action],Object.getOwnPropertyDescriptor(i.prototype,"showTooltip"),i.prototype),l(i.prototype,"hideTooltip",[n.action],Object.getOwnPropertyDescriptor(i.prototype,"hideTooltip"),i.prototype),i)
e.default=a})),define("dummy/controllers/reference",["exports","@ember/controller","@glimmer/tracking","@ember/object"],(function(e,t,n,o){var i,r
function l(e,t,n,o,i){var r={}
return Object.keys(o).forEach((function(e){r[e]=o[e]})),r.enumerable=!!r.enumerable,r.configurable=!!r.configurable,("value"in r||r.initializer)&&(r.writable=!0),r=n.slice().reverse().reduce((function(n,o){return o(e,t,n)||n}),r),i&&void 0!==r.initializer&&(r.value=r.initializer?r.initializer.call(i):void 0,r.initializer=void 0),void 0===r.initializer&&(Object.defineProperty(e,t,r),r=null),r}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
let a=(i=class extends t.default{constructor(){var e,t,n,o
super(...arguments),e=this,t="row",o=this,(n=r)&&Object.defineProperty(e,t,{enumerable:n.enumerable,configurable:n.configurable,writable:n.writable,value:n.initializer?n.initializer.call(o):void 0})}registerRow(e){this.row=e}},r=l(i.prototype,"row",[n.tracked],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),l(i.prototype,"registerRow",[o.action],Object.getOwnPropertyDescriptor(i.prototype,"registerRow"),i.prototype),i)
e.default=a})),define("dummy/helpers/ensure-safe-component",["exports","@embroider/util"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.EnsureSafeComponentHelper}})})),define("dummy/helpers/page-title",["exports","ember-page-title/helpers/page-title"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=t.default
e.default=n})),define("dummy/initializers/container-debug-adapter",["exports","ember-resolver/resolvers/classic/container-debug-adapter"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n={name:"container-debug-adapter",initialize(){(arguments[1]||arguments[0]).register("container-debug-adapter:main",t.default)}}
e.default=n})),define("dummy/modifiers/did-insert",["exports","@ember/render-modifiers/modifiers/did-insert"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})})),define("dummy/modifiers/did-update",["exports","@ember/render-modifiers/modifiers/did-update"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})})),define("dummy/modifiers/will-destroy",["exports","@ember/render-modifiers/modifiers/will-destroy"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})})),define("dummy/router",["exports","@ember/routing/router","dummy/config/environment"],(function(e,t,n){function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
class i extends t.default{constructor(){super(...arguments),o(this,"location",n.default.locationType),o(this,"rootURL",n.default.rootURL)}}e.default=i,i.map((function(){this.route("manual"),this.route("reference"),this.route("nesting"),this.route("delays"),this.route("manual-position"),this.route("auto-position"),this.route("destination"),this.route("attach-to"),this.route("sticky"),this.route("tether")}))})),define("dummy/routes/manual-position",["exports","@ember/routing/route"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
class n extends t.default{resetController(e,t){t&&(e.position="top left")}}e.default=n})),define("dummy/services/-ensure-registered",["exports","@embroider/util/services/ensure-registered"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})})),define("dummy/services/page-title-list",["exports","ember-page-title/services/page-title-list"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})})),define("dummy/services/page-title",["exports","ember-page-title/services/page-title"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})})),define("dummy/services/tooltip",["exports","@zestia/ember-async-tooltips/services/tooltip"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})})),define("dummy/templates/application",["exports","@ember/template-factory"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=(0,t.createTemplateFactory)({id:"tp6pN9YA",block:'[[[10,"h1"],[12],[1,"\\n  @zestia/ember-async-tooltips\\n"],[13],[1,"\\n\\n"],[10,2],[12],[1,"\\n  "],[8,[39,0],null,[["@route"],["index"]],[["default"],[[[[1,"\\n    Basic usage\\n  "]],[]]]]],[1,"\\n\\n  |\\n\\n  "],[8,[39,0],null,[["@route"],["manual"]],[["default"],[[[[1,"\\n    Manual show/hide\\n  "]],[]]]]],[1,"\\n\\n  |\\n\\n  "],[8,[39,0],null,[["@route"],["reference"]],[["default"],[[[[1,"\\n    Reference element\\n  "]],[]]]]],[1,"\\n\\n  |\\n\\n"],[1,"\\n  "],[8,[39,0],null,[["@route"],["destination"]],[["default"],[[[[1,"\\n    Destination\\n  "]],[]]]]],[1,"\\n\\n  |\\n\\n  "],[8,[39,0],null,[["@route"],["attach-to"]],[["default"],[[[[1,"\\n    Attach to\\n  "]],[]]]]],[1,"\\n\\n  |\\n\\n  "],[8,[39,0],null,[["@route"],["nesting"]],[["default"],[[[[1,"\\n    Nesting\\n  "]],[]]]]],[1,"\\n\\n  |\\n\\n  "],[8,[39,0],null,[["@route"],["delays"]],[["default"],[[[[1,"\\n    Delays\\n  "]],[]]]]],[1,"\\n\\n  |\\n\\n  "],[8,[39,0],null,[["@route"],["manual-position"]],[["default"],[[[[1,"\\n    Manual position\\n  "]],[]]]]],[1,"\\n\\n  |\\n\\n  "],[8,[39,0],null,[["@route"],["auto-position"]],[["default"],[[[[1,"\\n    Auto position\\n  "]],[]]]]],[1,"\\n\\n  |\\n\\n  "],[8,[39,0],null,[["@route"],["sticky"]],[["default"],[[[[1,"\\n    Sticky\\n  "]],[]]]]],[1,"\\n\\n  |\\n\\n  "],[8,[39,0],null,[["@route"],["tether"]],[["default"],[[[[1,"\\n    Tether\\n  "]],[]]]]],[1,"\\n"],[13],[1,"\\n\\n"],[46,[28,[37,2],null,null],null,null,null],[1,"\\n\\n"],[10,3],[14,6,"https://github.com/zestia/ember-async-tooltips"],[14,5,"position: absolute; top: 0; right: 0; border: 0;"],[12],[1,"\\n  "],[10,"img"],[14,"width","149"],[14,"height","149"],[14,"src","https://github.blog/wp-content/uploads/2008/12/forkme_right_darkblue_121621.png?resize=149%2C149"],[14,0,"attachment-full size-full"],[14,"alt","Fork me on GitHub"],[14,"data-recalc-dims","1"],[12],[13],[1,"\\n"],[13]],[],false,["link-to","component","-outlet"]]',moduleName:"dummy/templates/application.hbs",isStrictMode:!1})
e.default=n})),define("dummy/templates/attach-to",["exports","@ember/template-factory"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=(0,t.createTemplateFactory)({id:"xBMCw73/",block:'[[[10,2],[12],[1,"\\n  Trigger the tooltip on mouse over of an element, but position the tooltip to a\\n  child element\\n"],[13],[1,"\\n\\n"],[10,2],[12],[1,"\\n  "],[10,3],[14,6,"https://github.com/zestia/ember-async-tooltips/blob/master/tests/dummy/app/templates/attach-to.hbs"],[12],[1,"\\n    hbs\\n  "],[13],[1,"\\n"],[13],[1,"\\n\\n"],[10,0],[12],[1,"\\n  Hover over me\\n\\n"],[44,[[28,[37,1],null,null]],[[[1,"    "],[10,"small"],[15,1,[30,1]],[12],[1,"ⓘ"],[13],[1,"\\n\\n    "],[8,[39,2],null,[["@attachTo","@position"],[[29,["#",[30,1]]],"bottom center"]],[["default"],[[[[1,"\\n      Hello World\\n    "]],[]]]]],[1,"\\n"]],[1]]],[13]],["id"],false,["let","unique-id","tooltip"]]',moduleName:"dummy/templates/attach-to.hbs",isStrictMode:!1})
e.default=n})),define("dummy/templates/auto-position",["exports","@ember/template-factory"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=(0,t.createTemplateFactory)({id:"/Rp+k+QQ",block:'[[[10,0],[14,0,"auto-position-page"],[12],[1,"\\n  "],[11,0],[24,"draggable","true"],[4,[38,0],["drag",[30,0,["storeLastPos"]]],null],[4,[38,0],["dragstart",[30,0,["storeStartPos"]]],null],[4,[38,0],["dragend",[30,0,["reposition"]]],null],[12],[1,"\\n    Hover over me\\n\\n    "],[8,[39,1],null,null,[["default"],[[[[1,"\\n      Hello World\\n    "]],[]]]]],[1,"\\n  "],[13],[1,"\\n"],[13],[1,"\\n\\n"],[10,"table"],[14,0,"auto-position-table"],[12],[1,"\\n  "],[10,"tbody"],[12],[1,"\\n    "],[10,"tr"],[12],[1,"\\n      "],[10,"td"],[12],[1,"\\n        top left\\n      "],[13],[1,"\\n      "],[10,"td"],[12],[1,"\\n        top center\\n      "],[13],[1,"\\n      "],[10,"td"],[12],[1,"\\n        top right\\n      "],[13],[1,"\\n    "],[13],[1,"\\n    "],[10,"tr"],[12],[1,"\\n      "],[10,"td"],[12],[1,"\\n        middle left\\n      "],[13],[1,"\\n      "],[10,"td"],[12],[1,"\\n        middle center\\n      "],[13],[1,"\\n      "],[10,"td"],[12],[1,"\\n        middle right\\n      "],[13],[1,"\\n    "],[13],[1,"\\n    "],[10,"tr"],[12],[1,"\\n      "],[10,"td"],[12],[1,"\\n        bottom left\\n      "],[13],[1,"\\n      "],[10,"td"],[12],[1,"\\n        bottom center\\n      "],[13],[1,"\\n      "],[10,"td"],[12],[1,"\\n        bottom right\\n      "],[13],[1,"\\n    "],[13],[1,"\\n  "],[13],[1,"\\n"],[13]],[],false,["on","tooltip"]]',moduleName:"dummy/templates/auto-position.hbs",isStrictMode:!1})
e.default=n})),define("dummy/templates/components/sticky-tooltip",["exports","@ember/template-factory"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=(0,t.createTemplateFactory)({id:"271o/bvQ",block:'[[[8,[39,0],null,[["@position","@showDelay","@stickyID"],["bottom center",1200,"some-identifier"]],[["default"],[[[[1,"\\n  "],[18,1,null],[1,"\\n"]],[]]]]]],["&default"],false,["tooltip","yield"]]',moduleName:"dummy/templates/components/sticky-tooltip.hbs",isStrictMode:!1})
e.default=n})),define("dummy/templates/delays",["exports","@ember/template-factory"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=(0,t.createTemplateFactory)({id:"jd6peMpY",block:'[[[10,2],[12],[1,"\\n  The total possible delay is\\n  "],[1,[30,0,["totalPossibleDelay"]]],[1,"ms.\\n  "],[10,1],[15,0,[52,[30,0,["isLazy"]],"strike"]],[12],[1,"\\n    The addon saves\\n    "],[1,[30,0,["timeSaved"]]],[1,"ms"],[13],[1,", resulting in a total delay of\\n  "],[1,[30,0,["totalDelay"]]],[1,"ms."],[10,"br"],[12],[13],[1,"\\n  "],[10,1],[15,0,[52,[30,0,["isLazy"]],"strike"]],[12],[1,"\\n    This is because the actual show delay is reduced to\\n    "],[1,[30,0,["actualShowDelay"]]],[1,"ms.\\n  "],[13],[1,"\\n"],[13],[1,"\\n\\n"],[10,"form"],[12],[1,"\\n  "],[10,2],[12],[1,"\\n    "],[10,"label"],[12],[1,"\\n      "],[11,"input"],[16,"checked",[30,0,["isEager"]]],[24,4,"checkbox"],[4,[38,1],["click",[30,0,["setEager"]]],null],[12],[13],[1,"\\n      Eager\\n    "],[13],[1,"\\n  "],[13],[1,"\\n  "],[10,2],[12],[1,"\\n    "],[10,"label"],[12],[1,"\\n      "],[11,"input"],[16,2,[30,0,["showDelay"]]],[24,"size","4"],[24,4,"text"],[4,[38,1],["input",[30,0,["setShowDelay"]]],null],[12],[13],[1,"\\n      Show delay\\n    "],[13],[1,"\\n  "],[13],[1,"\\n  "],[10,2],[12],[1,"\\n    "],[10,"label"],[12],[1,"\\n      "],[11,"input"],[16,2,[30,0,["hideDelay"]]],[24,"size","4"],[24,4,"text"],[4,[38,1],["input",[30,0,["setHideDelay"]]],null],[12],[13],[1,"\\n      Hide delay\\n    "],[13],[1,"\\n  "],[13],[1,"\\n  "],[10,2],[12],[1,"\\n    "],[10,"label"],[12],[1,"\\n      "],[11,"input"],[16,2,[30,0,["loadDuration"]]],[24,"size","4"],[24,4,"text"],[4,[38,1],["input",[30,0,["setLoadDuration"]]],null],[12],[13],[1,"\\n      Load duration\\n    "],[13],[1,"\\n  "],[13],[1,"\\n  "],[10,2],[12],[1,"\\n    "],[11,"button"],[16,"disabled",[52,[30,0,["isLoaded"]],false,true]],[24,4,"button"],[4,[38,1],["click",[30,0,["unload"]]],null],[12],[1,"\\n      Unload\\n    "],[13],[1,"\\n  "],[13],[1,"\\n"],[13],[1,"\\n\\n"],[41,[30,0,["showTooltipper"]],[[[1,"  "],[10,0],[12],[1,"\\n    Hover over me\\n\\n"],[41,[30,0,["showLoading"]],[[[1,"      (Loading...)\\n"]],[]],null],[1,"\\n    "],[8,[39,2],null,[["@onLoad","@eager","@showDelay","@hideDelay","@position"],[[30,0,["load"]],[30,0,["isEager"]],[30,0,["showDelay"]],[30,0,["hideDelay"]],"bottom center"]],[["default"],[[[[1,"\\n"],[41,[30,1,["data"]],[[[1,"        "],[1,[30,1,["data","message"]]],[1,"\\n"]],[]],[[[1,"        Loading...\\n"]],[]]],[1,"    "]],[1]]]]],[1,"\\n  "],[13],[1,"\\n"]],[]],null]],["tooltip"],false,["if","on","tooltip"]]',moduleName:"dummy/templates/delays.hbs",isStrictMode:!1})
e.default=n})),define("dummy/templates/destination",["exports","@ember/template-factory"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=(0,t.createTemplateFactory)({id:"LJcCz+4H",block:'[[[10,2],[12],[1,"\\n  The tooltip is output to a specific element in the DOM\\n"],[13],[1,"\\n\\n"],[10,2],[12],[1,"\\n  "],[10,3],[14,6,"https://github.com/zestia/ember-async-tooltips/blob/master/tests/dummy/app/templates/destination.hbs"],[12],[1,"\\n    hbs\\n  "],[13],[1,"\\n"],[13],[1,"\\n\\n"],[10,0],[12],[1,"\\n  Hover over me\\n\\n  "],[8,[39,0],null,[["@destination"],[[30,0,["elsewhere"]]]],[["default"],[[[[1,"\\n    Hello World\\n  "]],[]]]]],[1,"\\n"],[13],[1,"\\n\\n"],[11,0],[24,1,"elsewhere"],[4,[38,1],[[30,0,["registerElsewhere"]]],null],[12],[1,"\\n"],[13]],[],false,["tooltip","did-insert"]]',moduleName:"dummy/templates/destination.hbs",isStrictMode:!1})
e.default=n})),define("dummy/templates/index",["exports","@ember/template-factory"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=(0,t.createTemplateFactory)({id:"SNPngGC1",block:'[[[10,2],[12],[1,"\\n  Basic usage\\n"],[13],[1,"\\n\\n"],[10,2],[12],[1,"\\n  "],[10,3],[14,6,"https://github.com/zestia/ember-async-tooltips/blob/master/tests/dummy/app/templates/index.hbs"],[12],[1,"\\n    hbs\\n  "],[13],[1,"\\n"],[13],[1,"\\n\\n"],[10,0],[12],[1,"\\n  Hover over me\\n\\n  "],[8,[39,0],null,null,[["default"],[[[[1,"\\n    Hello World\\n  "]],[]]]]],[1,"\\n"],[13]],[],false,["tooltip"]]',moduleName:"dummy/templates/index.hbs",isStrictMode:!1})
e.default=n})),define("dummy/templates/manual-position",["exports","@ember/template-factory"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=(0,t.createTemplateFactory)({id:"06e+xzQg",block:'[[[10,2],[12],[1,"\\n  Manual position\\n"],[13],[1,"\\n\\n"],[11,"select"],[24,"aria-label","Position"],[4,[38,0],["change",[30,0,["setPosition"]]],null],[12],[1,"\\n  "],[10,"option"],[12],[1,"\\n    top left\\n  "],[13],[1,"\\n  "],[10,"option"],[12],[1,"\\n    top center\\n  "],[13],[1,"\\n  "],[10,"option"],[12],[1,"\\n    top right\\n  "],[13],[1,"\\n  "],[10,"option"],[12],[1,"\\n    right top\\n  "],[13],[1,"\\n  "],[10,"option"],[12],[1,"\\n    right middle\\n  "],[13],[1,"\\n  "],[10,"option"],[12],[1,"\\n    right bottom\\n  "],[13],[1,"\\n  "],[10,"option"],[12],[1,"\\n    bottom right\\n  "],[13],[1,"\\n  "],[10,"option"],[12],[1,"\\n    bottom center\\n  "],[13],[1,"\\n  "],[10,"option"],[12],[1,"\\n    bottom left\\n  "],[13],[1,"\\n  "],[10,"option"],[12],[1,"\\n    left bottom\\n  "],[13],[1,"\\n  "],[10,"option"],[12],[1,"\\n    left middle\\n  "],[13],[1,"\\n  "],[10,"option"],[12],[1,"\\n    left top\\n  "],[13],[1,"\\n"],[13],[1,"\\n\\n"],[10,"br"],[12],[13],[1,"\\n\\n"],[10,0],[14,0,"manual-position-tooltipper"],[12],[1,"\\n  Tooltipper\\n\\n  "],[8,[39,1],null,[["@position","@show"],[[30,0,["position"]],true]],[["default"],[[[[1,"\\n    Hello World\\n  "]],[]]]]],[1,"\\n"],[13]],[],false,["on","tooltip"]]',moduleName:"dummy/templates/manual-position.hbs",isStrictMode:!1})
e.default=n}))
define("dummy/templates/manual",["exports","@ember/template-factory"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=(0,t.createTemplateFactory)({id:"EG4fPV4V",block:'[[[10,2],[12],[1,"\\n  Showing and hiding a tooltipper without mouse enter/leave events\\n"],[13],[1,"\\n\\n"],[10,2],[12],[1,"\\n  "],[10,3],[14,6,"https://github.com/zestia/ember-async-tooltips/blob/master/tests/dummy/app/templates/manual.hbs"],[12],[1,"\\n    hbs\\n  "],[13],[1,"\\n"],[13],[1,"\\n\\n"],[10,0],[12],[1,"\\n  "],[11,"input"],[24,"placeholder","Focus me"],[24,"aria-label","Example text area"],[24,4,"text"],[4,[38,0],["focus",[30,0,["showTooltip"]]],null],[4,[38,0],["blur",[30,0,["hideTooltip"]]],null],[12],[13],[1,"\\n\\n"],[41,[30,0,["shouldShowTooltip"]],[[[1,"    "],[8,[39,2],null,[["@show"],[true]],[["default"],[[[[1,"\\n      Hello World\\n    "]],[]]]]],[1,"\\n"]],[]],null],[13]],[],false,["on","if","tooltip"]]',moduleName:"dummy/templates/manual.hbs",isStrictMode:!1})
e.default=n})),define("dummy/templates/nesting",["exports","@ember/template-factory"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=(0,t.createTemplateFactory)({id:"wvG3Pvgc",block:'[[[10,2],[12],[1,"\\n  A tooltipper inside a tooltipper\\n"],[13],[1,"\\n\\n"],[10,2],[12],[1,"\\n  "],[10,3],[14,6,"https://github.com/zestia/ember-async-tooltips/blob/master/tests/dummy/app/templates/nesting.hbs"],[12],[1,"\\n    hbs\\n  "],[13],[1,"\\n"],[13],[1,"\\n\\n"],[10,0],[14,0,"parent"],[12],[1,"\\n  Parent\\n\\n  "],[8,[39,0],null,null,[["default"],[[[[1,"\\n    Parent tooltip\\n  "]],[]]]]],[1,"\\n\\n  "],[10,0],[14,0,"child"],[12],[1,"\\n    Child\\n\\n    "],[8,[39,0],null,null,[["default"],[[[[1,"\\n      Child tooltip\\n    "]],[]]]]],[1,"\\n  "],[13],[1,"\\n"],[13]],[],false,["tooltip"]]',moduleName:"dummy/templates/nesting.hbs",isStrictMode:!1})
e.default=n})),define("dummy/templates/reference",["exports","@ember/template-factory"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=(0,t.createTemplateFactory)({id:"Y2Ldout2",block:'[[[10,2],[12],[1,"\\n  A tooltip displayed on a specific reference element.\\n"],[13],[1,"\\n\\n"],[10,2],[12],[1,"\\n  "],[10,3],[14,6,"https://github.com/zestia/ember-async-tooltips/blob/master/tests/dummy/app/templates/reference.hbs"],[12],[1,"\\n    hbs\\n  "],[13],[1,"\\n"],[13],[1,"\\n\\n"],[44,[[28,[37,1],null,null]],[[[1,"  "],[10,"table"],[12],[1,"\\n    "],[10,"tbody"],[12],[1,"\\n      "],[10,"tr"],[15,1,[30,1]],[12],[1,"\\n        "],[10,"td"],[12],[1,"\\n          Table cell 1\\n\\n          "],[8,[39,2],null,[["@element"],[[29,["#",[30,1]]]]],[["default"],[[[[1,"\\n            Hello World\\n          "]],[]]]]],[1,"\\n        "],[13],[1,"\\n        "],[10,"td"],[12],[1,"\\n          Table cell 1\\n        "],[13],[1,"\\n      "],[13],[1,"\\n    "],[13],[1,"\\n  "],[13],[1,"\\n"]],[1]]]],["id"],false,["let","unique-id","tooltip"]]',moduleName:"dummy/templates/reference.hbs",isStrictMode:!1})
e.default=n})),define("dummy/templates/sticky",["exports","@ember/template-factory"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=(0,t.createTemplateFactory)({id:"K9JBD9JE",block:'[[[10,2],[12],[1,"\\n  Subsequent tooltips show delays are ignored\\n"],[13],[1,"\\n\\n"],[10,0],[12],[1,"\\n  One\\n  "],[8,[39,0],null,null,[["default"],[[[[1,"One"]],[]]]]],[1,"\\n"],[13],[1,"\\n\\n"],[10,0],[12],[1,"\\n  Two\\n  "],[8,[39,0],null,null,[["default"],[[[[1,"Two"]],[]]]]],[1,"\\n"],[13],[1,"\\n\\n"],[10,0],[12],[1,"\\n  Three\\n  "],[8,[39,0],null,null,[["default"],[[[[1,"Three"]],[]]]]],[1,"\\n"],[13],[1,"\\n\\n"],[10,0],[12],[1,"\\n  Four\\n  "],[8,[39,0],null,null,[["default"],[[[[1,"Four"]],[]]]]],[1,"\\n"],[13],[1,"\\n\\n"],[10,0],[12],[1,"\\n  Five\\n  "],[8,[39,0],null,null,[["default"],[[[[1,"Five"]],[]]]]],[1,"\\n"],[13]],[],false,["sticky-tooltip"]]',moduleName:"dummy/templates/sticky.hbs",isStrictMode:!1})
e.default=n})),define("dummy/templates/tether",["exports","@ember/template-factory"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=(0,t.createTemplateFactory)({id:"eYFqebnx",block:'[[[10,2],[12],[1,"\\n  Tooltip position is automatically re-computed\\n"],[13],[1,"\\n\\n"],[10,0],[14,0,"scroll-area"],[12],[1,"\\n  "],[10,0],[12],[1,"One"],[13],[1,"\\n  "],[10,0],[12],[1,"Two"],[13],[1,"\\n  "],[10,0],[12],[1,"Three"],[13],[1,"\\n  "],[10,0],[12],[1,"Four"],[13],[1,"\\n  "],[10,0],[12],[1,"\\n    Five\\n    "],[8,[39,0],null,[["@position","@show"],["right middle",true]],[["default"],[[[[1,"Five"]],[]]]]],[1,"\\n  "],[13],[1,"\\n  "],[10,0],[12],[1,"Six"],[13],[1,"\\n  "],[10,0],[12],[1,"Seven"],[13],[1,"\\n  "],[10,0],[12],[1,"Eight"],[13],[1,"\\n  "],[10,0],[12],[1,"Nine"],[13],[1,"\\n  "],[10,0],[12],[1,"Ten"],[13],[1,"\\n"],[13]],[],false,["tooltip"]]',moduleName:"dummy/templates/tether.hbs",isStrictMode:!1})
e.default=n})),define("dummy/config/environment",[],(function(){try{var e="dummy/config/environment",t=document.querySelector('meta[name="'+e+'"]').getAttribute("content"),n={default:JSON.parse(decodeURIComponent(t))}
return Object.defineProperty(n,"__esModule",{value:!0}),n}catch(o){throw new Error('Could not read config from meta tag with name "'+e+'".')}})),runningTests||require("dummy/app").default.create({})
