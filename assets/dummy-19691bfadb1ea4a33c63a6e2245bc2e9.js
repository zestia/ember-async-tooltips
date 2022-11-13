"use strict"
define("dummy/app",["exports","ember-resolver","ember-load-initializers","dummy/config/environment"],(function(e,t,n,o){function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
class l extends Ember.Application{constructor(...e){super(...e),i(this,"modulePrefix",o.default.modulePrefix),i(this,"podModulePrefix",o.default.podModulePrefix),i(this,"Resolver",t.default)}}e.default=l,(0,n.default)(l,o.default.modulePrefix)})),define("dummy/component-managers/glimmer",["exports","@glimmer/component/-private/ember-component-manager"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})})),define("dummy/components/tooltip",["exports","@zestia/ember-async-tooltips/components/tooltip"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})})),define("dummy/components/tooltipper",["exports","@zestia/ember-async-tooltips/components/tooltipper"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})})),define("dummy/controllers/auto-position",["exports"],(function(e){var t,n,o,i
function l(e,t,n,o,i){var l={}
return Object.keys(o).forEach((function(e){l[e]=o[e]})),l.enumerable=!!l.enumerable,l.configurable=!!l.configurable,("value"in l||l.initializer)&&(l.writable=!0),l=n.slice().reverse().reduce((function(n,o){return o(e,t,n)||n}),l),i&&void 0!==l.initializer&&(l.value=l.initializer?l.initializer.call(i):void 0,l.initializer=void 0),void 0===l.initializer&&(Object.defineProperty(e,t,l),l=null),l}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
let r=(t=Ember._action,n=Ember._action,o=Ember._action,l((i=class extends Ember.Controller{constructor(){super(...arguments),document.ondragover=e=>e.preventDefault()}reposition(e){const[t,n]=this.lastPos,[o,i]=this.startPos,l=e.target,r=n-i,a=t-o
l.style.top=`${r}px`,l.style.left=`${a}px`}storeStartPos(e){const t=e.target.getBoundingClientRect()
this.startPos=[e.clientX-t.left,e.clientY-t.top]}storeLastPos(e){const{clientX:t,clientY:n}=e
t&&n&&(this.lastPos=[t,n])}}).prototype,"reposition",[t],Object.getOwnPropertyDescriptor(i.prototype,"reposition"),i.prototype),l(i.prototype,"storeStartPos",[n],Object.getOwnPropertyDescriptor(i.prototype,"storeStartPos"),i.prototype),l(i.prototype,"storeLastPos",[o],Object.getOwnPropertyDescriptor(i.prototype,"storeLastPos"),i.prototype),i)
e.default=r})),define("dummy/controllers/delays",["exports"],(function(e){var t,n,o,i,l,r,a,u,s,d,p,c,m,f,b,y,v,h
function g(e,t,n,o){n&&Object.defineProperty(e,t,{enumerable:n.enumerable,configurable:n.configurable,writable:n.writable,value:n.initializer?n.initializer.call(o):void 0})}function w(e,t,n,o,i){var l={}
return Object.keys(o).forEach((function(e){l[e]=o[e]})),l.enumerable=!!l.enumerable,l.configurable=!!l.configurable,("value"in l||l.initializer)&&(l.writable=!0),l=n.slice().reverse().reduce((function(n,o){return o(e,t,n)||n}),l),i&&void 0!==l.initializer&&(l.value=l.initializer?l.initializer.call(i):void 0,l.initializer=void 0),void 0===l.initializer&&(Object.defineProperty(e,t,l),l=null),l}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
let _=(t=Ember._tracked,n=Ember._tracked,o=Ember._tracked,i=Ember._tracked,l=Ember._tracked,r=Ember._tracked,a=Ember._action,u=Ember._action,s=Ember._action,d=Ember._action,p=Ember._action,c=class extends Ember.Controller{constructor(...e){super(...e),g(this,"showDelay",m,this),g(this,"hideDelay",f,this),g(this,"loadDelay",b,this),g(this,"isLoading",y,this),g(this,"isLoaded",v,this),g(this,"showTooltipper",h,this)}get totalDelay(){return this.useAdjustedLoadDelay?this.adjustedDelay:this.showDelay}get expectedDelay(){return this.showDelay+this.loadDelay}get useAdjustedLoadDelay(){return!this.isLoaded&&this.loadDelayGreaterThanShowDelay}get loadDelayGreaterThanShowDelay(){return this.loadDelay>this.showDelay}get adjustedDelay(){return this.loadDelayMinusShowDelay+this.showDelay}get loadDelayMinusShowDelay(){return this.loadDelay-this.showDelay}setShowDelay({target:{value:e}}){this.showDelay=parseInt(e||0,10)}setHideDelay({target:{value:e}}){this.hideDelay=parseInt(e||0,10)}setLoadDelay({target:{value:e}}){this.loadDelay=parseInt(e||0,10)}load(){return this.isLoading=!0,new Ember.RSVP.Promise((e=>{Ember.run.later((()=>{this.isLoading=!1,this.isLoaded=!0,e()}),this.loadDelay)}))}unload(){this.showTooltipper=!1,this.isLoaded=!1,Ember.run.next((()=>this.showTooltipper=!0))}},m=w(c.prototype,"showDelay",[t],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 500}}),f=w(c.prototype,"hideDelay",[n],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 0}}),b=w(c.prototype,"loadDelay",[o],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 500}}),y=w(c.prototype,"isLoading",[i],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),v=w(c.prototype,"isLoaded",[l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),h=w(c.prototype,"showTooltipper",[r],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!0}}),w(c.prototype,"setShowDelay",[a],Object.getOwnPropertyDescriptor(c.prototype,"setShowDelay"),c.prototype),w(c.prototype,"setHideDelay",[u],Object.getOwnPropertyDescriptor(c.prototype,"setHideDelay"),c.prototype),w(c.prototype,"setLoadDelay",[s],Object.getOwnPropertyDescriptor(c.prototype,"setLoadDelay"),c.prototype),w(c.prototype,"load",[d],Object.getOwnPropertyDescriptor(c.prototype,"load"),c.prototype),w(c.prototype,"unload",[p],Object.getOwnPropertyDescriptor(c.prototype,"unload"),c.prototype),c)
e.default=_})),define("dummy/controllers/in-element",["exports"],(function(e){var t,n,o,i
function l(e,t,n,o,i){var l={}
return Object.keys(o).forEach((function(e){l[e]=o[e]})),l.enumerable=!!l.enumerable,l.configurable=!!l.configurable,("value"in l||l.initializer)&&(l.writable=!0),l=n.slice().reverse().reduce((function(n,o){return o(e,t,n)||n}),l),i&&void 0!==l.initializer&&(l.value=l.initializer?l.initializer.call(i):void 0,l.initializer=void 0),void 0===l.initializer&&(Object.defineProperty(e,t,l),l=null),l}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
let r=(t=Ember._tracked,n=Ember._action,o=class extends Ember.Controller{constructor(...e){var t,n,o,l
super(...e),t=this,n="elsewhere",l=this,(o=i)&&Object.defineProperty(t,n,{enumerable:o.enumerable,configurable:o.configurable,writable:o.writable,value:o.initializer?o.initializer.call(l):void 0})}registerElsewhere(e){this.elsewhere=e}},i=l(o.prototype,"elsewhere",[t],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),l(o.prototype,"registerElsewhere",[n],Object.getOwnPropertyDescriptor(o.prototype,"registerElsewhere"),o.prototype),o)
e.default=r})),define("dummy/controllers/manual-position",["exports"],(function(e){var t,n,o,i
function l(e,t,n,o,i){var l={}
return Object.keys(o).forEach((function(e){l[e]=o[e]})),l.enumerable=!!l.enumerable,l.configurable=!!l.configurable,("value"in l||l.initializer)&&(l.writable=!0),l=n.slice().reverse().reduce((function(n,o){return o(e,t,n)||n}),l),i&&void 0!==l.initializer&&(l.value=l.initializer?l.initializer.call(i):void 0,l.initializer=void 0),void 0===l.initializer&&(Object.defineProperty(e,t,l),l=null),l}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
let r=(t=Ember._tracked,n=Ember._action,o=class extends Ember.Controller{constructor(...e){var t,n,o,l
super(...e),t=this,n="position",l=this,(o=i)&&Object.defineProperty(t,n,{enumerable:o.enumerable,configurable:o.configurable,writable:o.writable,value:o.initializer?o.initializer.call(l):void 0})}setPosition({target:{value:e}}){this.position=e}},i=l(o.prototype,"position",[t],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return"top left"}}),l(o.prototype,"setPosition",[n],Object.getOwnPropertyDescriptor(o.prototype,"setPosition"),o.prototype),o)
e.default=r})),define("dummy/controllers/reference",["exports"],(function(e){var t,n,o,i
function l(e,t,n,o,i){var l={}
return Object.keys(o).forEach((function(e){l[e]=o[e]})),l.enumerable=!!l.enumerable,l.configurable=!!l.configurable,("value"in l||l.initializer)&&(l.writable=!0),l=n.slice().reverse().reduce((function(n,o){return o(e,t,n)||n}),l),i&&void 0!==l.initializer&&(l.value=l.initializer?l.initializer.call(i):void 0,l.initializer=void 0),void 0===l.initializer&&(Object.defineProperty(e,t,l),l=null),l}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
let r=(t=Ember._tracked,n=Ember._action,o=class extends Ember.Controller{constructor(...e){var t,n,o,l
super(...e),t=this,n="span",l=this,(o=i)&&Object.defineProperty(t,n,{enumerable:o.enumerable,configurable:o.configurable,writable:o.writable,value:o.initializer?o.initializer.call(l):void 0})}registerSpan(e){this.span=e}},i=l(o.prototype,"span",[t],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),l(o.prototype,"registerSpan",[n],Object.getOwnPropertyDescriptor(o.prototype,"registerSpan"),o.prototype),o)
e.default=r})),define("dummy/helpers/ensure-safe-component",["exports","@embroider/util"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.EnsureSafeComponentHelper}})})),define("dummy/helpers/page-title",["exports","ember-page-title/helpers/page-title"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=t.default
e.default=n})),define("dummy/initializers/container-debug-adapter",["exports","ember-resolver/resolvers/classic/container-debug-adapter"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n={name:"container-debug-adapter",initialize(){let e=arguments[1]||arguments[0]
e.register("container-debug-adapter:main",t.default),e.inject("container-debug-adapter:main","namespace","application:main")}}
e.default=n})),define("dummy/modifiers/did-insert",["exports","@ember/render-modifiers/modifiers/did-insert"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})})),define("dummy/modifiers/did-update",["exports","@ember/render-modifiers/modifiers/did-update"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})})),define("dummy/modifiers/will-destroy",["exports","@ember/render-modifiers/modifiers/will-destroy"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})})),define("dummy/router",["exports","dummy/config/environment"],(function(e,t){function n(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
class o extends Ember.Router{constructor(...e){super(...e),n(this,"location",t.default.locationType),n(this,"rootURL",t.default.rootURL)}}e.default=o,o.map((function(){this.route("manual"),this.route("reference"),this.route("nesting"),this.route("delays"),this.route("manual-position"),this.route("auto-position"),this.route("in-element"),this.route("interactive-content"),this.route("sticky")}))})),define("dummy/routes/manual-position",["exports"],(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
class t extends Ember.Route{resetController(e,t){t&&(e.position="top left")}}e.default=t})),define("dummy/services/-ensure-registered",["exports","@embroider/util/services/ensure-registered"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})})),define("dummy/services/page-title-list",["exports","ember-page-title/services/page-title-list"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})})),define("dummy/services/page-title",["exports","ember-page-title/services/page-title"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})})),define("dummy/services/tooltip",["exports","@zestia/ember-async-tooltips/services/tooltip"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})})),define("dummy/templates/application",["exports"],(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"66dyo62e",block:'[[[10,"h1"],[12],[1,"\\n  @zestia/ember-async-tooltips\\n"],[13],[1,"\\n\\n"],[10,2],[12],[1,"\\n  "],[8,[39,0],null,[["@route"],["index"]],[["default"],[[[[1,"\\n    Basic usage\\n  "]],[]]]]],[1,"\\n\\n  |\\n\\n  "],[8,[39,0],null,[["@route"],["manual"]],[["default"],[[[[1,"\\n    Manual show/hide\\n  "]],[]]]]],[1,"\\n\\n  |\\n\\n  "],[8,[39,0],null,[["@route"],["reference"]],[["default"],[[[[1,"\\n    Reference element\\n  "]],[]]]]],[1,"\\n\\n  |\\n\\n  "],[8,[39,0],null,[["@route"],["in-element"]],[["default"],[[[[1,"\\n    In element\\n  "]],[]]]]],[1,"\\n\\n  |\\n\\n  "],[8,[39,0],null,[["@route"],["interactive-content"]],[["default"],[[[[1,"\\n    Interactive content\\n  "]],[]]]]],[1,"\\n\\n  |\\n\\n  "],[8,[39,0],null,[["@route"],["nesting"]],[["default"],[[[[1,"\\n    Nesting\\n  "]],[]]]]],[1,"\\n\\n  |\\n\\n  "],[8,[39,0],null,[["@route"],["delays"]],[["default"],[[[[1,"\\n    Delays\\n  "]],[]]]]],[1,"\\n\\n  |\\n\\n  "],[8,[39,0],null,[["@route"],["manual-position"]],[["default"],[[[[1,"\\n    Manual position\\n  "]],[]]]]],[1,"\\n\\n  |\\n\\n  "],[8,[39,0],null,[["@route"],["auto-position"]],[["default"],[[[[1,"\\n    Auto position\\n  "]],[]]]]],[1,"\\n\\n  |\\n\\n  "],[8,[39,0],null,[["@route"],["sticky"]],[["default"],[[[[1,"\\n    Sticky\\n  "]],[]]]]],[1,"\\n"],[13],[1,"\\n\\n"],[46,[28,[37,2],null,null],null,null,null],[1,"\\n\\n"],[10,3],[14,6,"https://github.com/zestia/ember-async-tooltips"],[14,5,"position: absolute; top: 0; right: 0; border: 0;"],[12],[1,"\\n  "],[10,"img"],[14,"width","149"],[14,"height","149"],[14,"src","https://github.blog/wp-content/uploads/2008/12/forkme_right_darkblue_121621.png?resize=149%2C149"],[14,0,"attachment-full size-full"],[14,"alt","Fork me on GitHub"],[14,"data-recalc-dims","1"],[12],[13],[1,"\\n"],[13]],[],false,["link-to","component","-outlet"]]',moduleName:"dummy/templates/application.hbs",isStrictMode:!1})
e.default=t})),define("dummy/templates/auto-position",["exports"],(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"VMQMyvg7",block:'[[[10,0],[14,0,"auto-position-page"],[12],[1,"\\n  "],[10,"table"],[12],[1,"\\n    "],[10,"tbody"],[12],[1,"\\n      "],[10,"tr"],[12],[1,"\\n        "],[10,"td"],[12],[1,"\\n          top left\\n        "],[13],[1,"\\n        "],[10,"td"],[12],[1,"\\n          top center\\n        "],[13],[1,"\\n        "],[10,"td"],[12],[1,"\\n          top right\\n        "],[13],[1,"\\n      "],[13],[1,"\\n      "],[10,"tr"],[12],[1,"\\n        "],[10,"td"],[12],[1,"\\n          middle left\\n        "],[13],[1,"\\n        "],[10,"td"],[12],[1,"\\n          middle center\\n        "],[13],[1,"\\n        "],[10,"td"],[12],[1,"\\n          middle right\\n        "],[13],[1,"\\n      "],[13],[1,"\\n      "],[10,"tr"],[12],[1,"\\n        "],[10,"td"],[12],[1,"\\n          bottom left\\n        "],[13],[1,"\\n        "],[10,"td"],[12],[1,"\\n          bottom center\\n        "],[13],[1,"\\n        "],[10,"td"],[12],[1,"\\n          bottom right\\n        "],[13],[1,"\\n      "],[13],[1,"\\n    "],[13],[1,"\\n  "],[13],[1,"\\n\\n  "],[8,[39,0],[[24,"draggable","true"],[16,"ondrag",[30,0,["storeLastPos"]]],[16,"ondragstart",[30,0,["storeStartPos"]]],[16,"ondragend",[30,0,["reposition"]]]],[["@Tooltip"],[[50,"tooltip",0,null,[["text"],["Tooltip"]]]]],[["default"],[[[[1,"\\n    Tooltipper\\n  "]],[]]]]],[1,"\\n"],[13]],[],false,["tooltipper","component"]]',moduleName:"dummy/templates/auto-position.hbs",isStrictMode:!1})
e.default=t})),define("dummy/templates/components/greeting-tooltip",["exports"],(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"SJZ/xmlk",block:'[[[11,0],[24,0,"greeting-tooltip"],[17,1],[12],[1,"\\n"],[41,[30,2,["error"]],[[[1,"    "],[1,[30,2,["error","message"]]],[1,"\\n"]],[]],[[[1,"    "],[1,[30,2,["data","greeting"]]],[1,"\\n"]],[]]],[13]],["&attrs","@tooltip"],false,["if"]]',moduleName:"dummy/templates/components/greeting-tooltip.hbs",isStrictMode:!1})
e.default=t})),define("dummy/templates/components/in-element-tooltip",["exports"],(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"rqndVCaK",block:'[[[40,[[[1,"  "],[11,0],[17,2],[12],[1,"\\n    This tooltip is rendered elsewhere\\n  "],[13],[1,"\\n"]],[]],"%cursor:0%",[30,1],null]],["@destinationElement","&attrs"],false,["in-element"]]',moduleName:"dummy/templates/components/in-element-tooltip.hbs",isStrictMode:!1})
e.default=t})),define("dummy/templates/components/interactive-content-tooltip",["exports"],(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"v5Z7f3YQ",block:'[[[11,0],[17,1],[12],[1,"\\n  This tooltip contains interactive content:\\n  "],[10,"button"],[14,4,"button"],[12],[1,"\\n    Button\\n  "],[13],[1,"\\n"],[13]],["&attrs"],false,[]]',moduleName:"dummy/templates/components/interactive-content-tooltip.hbs",isStrictMode:!1})
e.default=t})),define("dummy/templates/components/tooltip-with-child-element",["exports"],(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"y6TyxcI1",block:'[[[11,0],[17,1],[12],[1,"\\n  "],[10,0],[14,0,"tooltip__child"],[12],[1,"\\n    "],[1,[30,2]],[1,"\\n  "],[13],[1,"\\n"],[13]],["&attrs","@text"],false,[]]',moduleName:"dummy/templates/components/tooltip-with-child-element.hbs",isStrictMode:!1})
e.default=t})),define("dummy/templates/delays",["exports"],(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"09vjazR1",block:'[[[10,2],[12],[1,"\\n  The total delay is affected by the show delay and the time taken to load\\n"],[13],[1,"\\n\\n"],[10,"form"],[12],[1,"\\n  "],[10,2],[12],[1,"\\n    "],[10,"label"],[12],[1,"\\n      "],[11,"input"],[16,2,[30,0,["showDelay"]]],[24,"size","4"],[24,4,"text"],[4,[38,0],["input",[30,0,["setShowDelay"]]],null],[12],[13],[1,"\\n      Show delay\\n    "],[13],[1,"\\n  "],[13],[1,"\\n  "],[10,2],[12],[1,"\\n    "],[10,"label"],[12],[1,"\\n      "],[11,"input"],[16,2,[30,0,["hideDelay"]]],[24,"size","4"],[24,4,"text"],[4,[38,0],["input",[30,0,["setHideDelay"]]],null],[12],[13],[1,"\\n      Hide delay\\n    "],[13],[1,"\\n  "],[13],[1,"\\n  "],[10,2],[12],[1,"\\n    "],[10,"label"],[12],[1,"\\n      "],[11,"input"],[16,2,[30,0,["loadDelay"]]],[24,"size","4"],[24,4,"text"],[4,[38,0],["input",[30,0,["setLoadDelay"]]],null],[12],[13],[1,"\\n      Load delay\\n    "],[13],[1,"\\n  "],[13],[1,"\\n  "],[10,2],[12],[1,"\\n    "],[11,"button"],[24,4,"button"],[4,[38,0],["click",[30,0,["unload"]]],null],[12],[1,"\\n      Unload\\n    "],[13],[1,"\\n  "],[13],[1,"\\n  "],[10,2],[12],[1,"\\n    "],[10,1],[12],[1,"\\n"],[1,"      Total delay time\\n      "],[10,1],[14,0,"strike"],[12],[1,[30,0,["expectedDelay"]]],[1,"ms"],[13],[1,"\\n      "],[1,[30,0,["totalDelay"]]],[1,"ms\\n    "],[13],[1,"\\n  "],[13],[1,"\\n"],[13],[1,"\\n\\n"],[41,[30,0,["showTooltipper"]],[[[1,"  "],[8,[39,2],null,[["@Tooltip","@onLoad","@showDelay","@hideDelay","@position"],[[50,"tooltip",0,null,[["text"],["Hello World"]]],[30,0,["load"]],[30,0,["showDelay"]],[30,0,["hideDelay"]],"bottom left"]],[["default"],[[[[1,"\\n    Hover over me\\n"],[41,[30,1,["isLoading"]],[[[1,"      (Loading…)\\n"]],[]],null],[1,"  "]],[1]]]]],[1,"\\n"]],[]],null]],["tooltipper"],false,["on","if","tooltipper","component"]]',moduleName:"dummy/templates/delays.hbs",isStrictMode:!1})
e.default=t})),define("dummy/templates/in-element",["exports"],(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"zbtzJjwK",block:'[[[10,2],[12],[1,"\\n  Example usage with\\n  "],[10,"code"],[12],[1,"\\n"],[1,"    "],[1,"{{in-element}} helper\\n  "],[13],[1,"\\n"],[13],[1,"\\n\\n"],[8,[39,0],null,[["@Tooltip","@position"],[[50,"in-element-tooltip",0,null,[["destinationElement"],[[30,0,["elsewhere"]]]]],"bottom left"]],[["default"],[[[[1,"\\n  Hover over me\\n"]],[]]]]],[1,"\\n\\n"],[11,0],[24,1,"elsewhere"],[4,[38,2],[[30,0,["registerElsewhere"]]],null],[12],[1,"\\n"],[13]],[],false,["tooltipper","component","did-insert"]]',moduleName:"dummy/templates/in-element.hbs",isStrictMode:!1})
e.default=t})),define("dummy/templates/index",["exports"],(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"rLuLQ4du",block:'[[[10,2],[12],[1,"\\n  Basic usage\\n"],[13],[1,"\\n\\n"],[8,[39,0],null,[["@Tooltip","@position"],[[50,"tooltip",0,null,[["text"],["Hello World"]]],"bottom left"]],[["default"],[[[[1,"\\n  Hover over me\\n"]],[]]]]]],[],false,["tooltipper","component"]]',moduleName:"dummy/templates/index.hbs",isStrictMode:!1})
e.default=t}))
define("dummy/templates/interactive-content",["exports"],(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"K3vniF6w",block:'[[[10,2],[12],[1,"\\n  Interactive content (generally not advised for tooltips)\\n"],[13],[1,"\\n\\n"],[8,[39,0],null,[["@Tooltip","@position"],[[50,"interactive-content-tooltip",0,null,null],"bottom left"]],[["default"],[[[[1,"\\n  "],[8,[39,2],null,[["@route"],["interactive-content"]],[["default"],[[[[1,"\\n    Hover over me\\n  "]],[]]]]],[1,"\\n"]],[]]]]]],[],false,["tooltipper","component","link-to"]]',moduleName:"dummy/templates/interactive-content.hbs",isStrictMode:!1})
e.default=t})),define("dummy/templates/manual-position",["exports"],(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"uCVUPn/V",block:'[[[10,2],[12],[1,"\\n  Manual position\\n"],[13],[1,"\\n\\n"],[11,"select"],[24,"aria-label","Position"],[4,[38,0],["change",[30,0,["setPosition"]]],null],[12],[1,"\\n  "],[10,"option"],[12],[1,"\\n    top left\\n  "],[13],[1,"\\n  "],[10,"option"],[12],[1,"\\n    top center\\n  "],[13],[1,"\\n  "],[10,"option"],[12],[1,"\\n    top right\\n  "],[13],[1,"\\n  "],[10,"option"],[12],[1,"\\n    right top\\n  "],[13],[1,"\\n  "],[10,"option"],[12],[1,"\\n    right middle\\n  "],[13],[1,"\\n  "],[10,"option"],[12],[1,"\\n    right bottom\\n  "],[13],[1,"\\n  "],[10,"option"],[12],[1,"\\n    bottom right\\n  "],[13],[1,"\\n  "],[10,"option"],[12],[1,"\\n    bottom center\\n  "],[13],[1,"\\n  "],[10,"option"],[12],[1,"\\n    bottom left\\n  "],[13],[1,"\\n  "],[10,"option"],[12],[1,"\\n    left bottom\\n  "],[13],[1,"\\n  "],[10,"option"],[12],[1,"\\n    left middle\\n  "],[13],[1,"\\n  "],[10,"option"],[12],[1,"\\n    left top\\n  "],[13],[1,"\\n"],[13],[1,"\\n\\n"],[10,"br"],[12],[13],[1,"\\n\\n"],[8,[39,1],[[24,0,"manual-position-tooltipper"]],[["@Tooltip","@position","@mouseEvents","@showTooltip"],[[50,"tooltip",0,null,[["text"],["Hello World"]]],[30,0,["position"]],false,true]],[["default"],[[[[1,"\\n  Tooltipper\\n"]],[]]]]]],[],false,["on","tooltipper","component"]]',moduleName:"dummy/templates/manual-position.hbs",isStrictMode:!1})
e.default=t})),define("dummy/templates/manual",["exports"],(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"XvJKuOhx",block:'[[[10,2],[12],[1,"\\n  Showing and hiding a tooltipper without mouse enter/leave events\\n"],[13],[1,"\\n\\n"],[8,[39,0],null,[["@Tooltip","@position","@mouseEvents"],[[50,"tooltip",0,null,[["text"],["Hello World"]]],"bottom left",false]],[["default"],[[[[1,"\\n  "],[11,"button"],[24,4,"button"],[4,[38,2],["click",[30,1,["toggleTooltip"]]],null],[12],[1,"\\n    Click me\\n  "],[13],[1,"\\n"]],[1]]]]],[1,"\\n\\n"],[10,"br"],[12],[13],[1,"\\n"],[10,"br"],[12],[13],[1,"\\n"],[10,"br"],[12],[13],[1,"\\n\\n"],[8,[39,0],null,[["@Tooltip","@position","@mouseEvents"],[[50,"tooltip",0,null,[["text"],["Hello World"]]],"bottom left",false]],[["default"],[[[[1,"\\n  "],[11,"input"],[24,"placeholder","Focus me"],[24,"aria-label","Example text area"],[24,4,"text"],[4,[38,2],["focus",[30,2,["showTooltip"]]],null],[4,[38,2],["blur",[30,2,["hideTooltip"]]],null],[12],[13],[1,"\\n"]],[2]]]]]],["tooltipper","tooltipper"],false,["tooltipper","component","on"]]',moduleName:"dummy/templates/manual.hbs",isStrictMode:!1})
e.default=t})),define("dummy/templates/nesting",["exports"],(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"k7wACc2T",block:'[[[10,2],[12],[1,"\\n  A tooltipper inside a tooltipper\\n"],[13],[1,"\\n\\n"],[8,[39,0],[[24,0,"outer-tooltipper"]],[["@Tooltip","@showDelay","@position"],[[50,"tooltip",0,null,[["text"],["Tooltip for row"]]],100,"bottom left"]],[["default"],[[[[1,"\\n  "],[10,"table"],[12],[1,"\\n    "],[10,"tbody"],[12],[1,"\\n      "],[10,"tr"],[12],[1,"\\n        "],[10,"td"],[12],[1,"\\n          Cell 1\\n        "],[13],[1,"\\n        "],[10,"td"],[12],[1,"\\n          Cell 2\\n\\n          "],[8,[39,0],[[24,0,"inner-tooltipper"]],[["@Tooltip","@position"],[[50,"tooltip",0,null,[["text"],["Tooltip for cell"]]],"bottom left"]],[["default"],[[[[1,"\\n            "],[10,"small"],[12],[1,"\\n              ⓘ\\n            "],[13],[1,"\\n          "]],[]]]]],[1,"\\n        "],[13],[1,"\\n        "],[10,"td"],[12],[1,"\\n          Cell 3\\n        "],[13],[1,"\\n      "],[13],[1,"\\n    "],[13],[1,"\\n  "],[13],[1,"\\n"]],[]]]]]],[],false,["tooltipper","component"]]',moduleName:"dummy/templates/nesting.hbs",isStrictMode:!1})
e.default=t})),define("dummy/templates/reference",["exports"],(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"yTpvtKak",block:'[[[10,2],[12],[1,"\\n  Custom reference element\\n"],[13],[1,"\\n\\n"],[8,[39,0],null,[["@Tooltip","@position","@referenceElement"],[[50,"tooltip",0,null,[["text"],["Hello World"]]],"bottom center",[30,0,["span"]]]],[["default"],[[[[1,"\\n  Tooltipper instance is here,\\n"]],[]]]]],[1,"\\n\\n"],[11,1],[4,[38,2],[[30,0,["registerSpan"]]],null],[12],[1,"\\n  but the tooltip is displayed over me\\n"],[13]],[],false,["tooltipper","component","did-insert"]]',moduleName:"dummy/templates/reference.hbs",isStrictMode:!1})
e.default=t})),define("dummy/templates/sticky",["exports"],(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"KrMH6Ihy",block:'[[[10,2],[12],[1,"\\n  Subsequent tooltips show delays are ignored\\n"],[13],[1,"\\n\\n"],[8,[39,0],null,[["@Tooltip","@position","@showDelay","@stickyID"],[[50,"tooltip",0,null,[["text"],["One"]]],"bottom center",1500,"some-identifier"]],[["default"],[[[[1,"\\n  One\\n"]],[]]]]],[1,"\\n\\n"],[8,[39,0],null,[["@Tooltip","@position","@showDelay","@stickyID"],[[50,"tooltip",0,null,[["text"],["Two"]]],"bottom center",1500,"some-identifier"]],[["default"],[[[[1,"\\n  Two\\n"]],[]]]]],[1,"\\n\\n"],[8,[39,0],null,[["@Tooltip","@position","@showDelay","@stickyID"],[[50,"tooltip",0,null,[["text"],["Three"]]],"bottom center",1500,"some-identifier"]],[["default"],[[[[1,"\\n  Three\\n"]],[]]]]],[1,"\\n\\n"],[8,[39,0],null,[["@Tooltip","@position","@showDelay","@stickyID"],[[50,"tooltip",0,null,[["text"],["Four"]]],"bottom center",1500,"some-identifier"]],[["default"],[[[[1,"\\n  Four\\n"]],[]]]]],[1,"\\n\\n"],[8,[39,0],null,[["@Tooltip","@position","@showDelay","@stickyID"],[[50,"tooltip",0,null,[["text"],["Five"]]],"bottom center",1500,"some-identifier"]],[["default"],[[[[1,"\\n  Five\\n"]],[]]]]]],[],false,["tooltipper","component"]]',moduleName:"dummy/templates/sticky.hbs",isStrictMode:!1})
e.default=t})),define("dummy/config/environment",[],(function(){try{var e="dummy/config/environment",t=document.querySelector('meta[name="'+e+'"]').getAttribute("content"),n={default:JSON.parse(decodeURIComponent(t))}
return Object.defineProperty(n,"__esModule",{value:!0}),n}catch(o){throw new Error('Could not read config from meta tag with name "'+e+'".')}})),runningTests||require("dummy/app").default.create({})