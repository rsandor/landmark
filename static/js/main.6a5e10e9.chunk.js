(this.webpackJsonplandmark=this.webpackJsonplandmark||[]).push([[0],{131:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(16),s=n.n(r),i=(n(60),n(4)),c=n(5),l=n(53),u=n(48),d=n(54),f=(n(61),n(17)),v=n(50),h=n.n(v),m=n(51),g=n.n(m),b={type:"",payload:{}};function w(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:[];new Set(o).has(t.type)||(!g()(a)||h()(a)||t.type.startsWith(a))&&e(t.type,t.payload,n)}var p=function(){function e(){Object(i.a)(this,e)}return Object(c.a)(e,null,[{key:"log",value:function(e,t,n,a){w(console.log.bind(console),e,t,n,a)}},{key:"warn",value:function(e,t,n,a){w(console.warn.bind(console),e,t,n,a)}},{key:"error",value:function(e,t,n,a){w(console.error.bind(console),e,t,n,a)}}]),e}(),S=n(52),k=n.n(S),y=new(function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};Object(i.a)(this,e),this.namespace=t,this._initialState=n,this.actions=new Map,this.validators=new Map,this.log=!1}return Object(c.a)(e,[{key:"toggleLog",value:function(){this.log=!this.log}},{key:"action",value:function(e,t){var n=this;return t?(this.actions.set("".concat(this.namespace,"/").concat(e),t),function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a={type:"".concat(n.namespace,"/").concat(e),payload:t};try{var o=n.validators.get(e)||function(){};return o(t),a}catch(r){return p.error(a,r),b}}):this.actions.get(e)}},{key:"validate",value:function(e,t){this.validators.set("".concat(this.namespace,"/").concat(e),t)}},{key:"initialState",get:function(){return k()({},this._initialState)}},{key:"reducer",get:function(){var e=this;return function(t,n){e.log&&p.log(n);var a,o,r=(a=t||e.initialState,o={},Object.assign({},a,o));return e.actions.has(n.type)&&e.actions.get(n.type)(r,n.payload,n),r}}}]),e}())("Landmark/settings",{theme:"light",clef:{treble:!0,bass:!0},notes:{root:!0,second:!1,third:!1}}),E=new Set(["light","dark"]),C=y.action("setTheme",(function(e,t){var n=t.theme;E.has(n)&&(e.theme=t.theme)})),N=y.action("toggleNotes",(function(e,t){var n=e.notes,a=n.root,o=n.second,r=n.third;switch(t.key){case"root":return void(e.notes.root=!a);case"second":return void(e.notes.second=!o);case"third":return void(e.notes.third=!r)}})),F=y.action("setGrandStaff",(function(e){e.clef={treble:!0,bass:!0}})),O=y.action("setTrebleClef",(function(e){e.clef={treble:!0,bass:!1}})),j=y.action("setBassClef",(function(e){e.clef={treble:!1,bass:!0}})),T=y.reducer;function x(e){return{settings:e.settings}}function V(e){return{setTheme:function(t){return e(C({theme:t}))},setBassClef:function(){return e(j())},setTrebleClef:function(){return e(O())},setGrandStaff:function(){return e(F())},toggleNotes:function(t){return e(N({key:t}))}}}var A=n(27);function B(e){return Math.floor(Math.random()*e)}function G(e){return e[B(e.length)]}var M=n(9),W=Object(M.b)({settings:T});var L=Object(M.c)(W,function(){var e=localStorage.getItem("reduxState");return e?JSON.parse(e):{}}());L.subscribe((function(){var e=L.getState().settings;localStorage.setItem("reduxState",JSON.stringify({settings:e}))})),window.store={reset:function(){localStorage.removeItem("reduxState"),window.location.reload()},get state(){return L.getState()},dispatch:function(e){return L.dispatch(e)}};var R=L,_={treble:{root:["c/4","g/4","c/5","g/5","c/6"],second:["d/4","b/3","a/4","f/4","d/5","b/4","a/5","f/5","b/5","d/6"],third:["a/3","e/4","e/4","b/4","a/4","e/5","e/5","b/5","a/5","e/6"]},bass:{root:["c/4","f/3","c/3","f/2","c/2"],second:["b/3","d/4","e/3","g/3","b/2","d/3","e/2","g/2","b/1","d/2"],third:["a/3","e/4","d/3","a/3","a/2","e/3","d/2","a/2","a/1","e/2"]}};function U(e){var t={c:0,d:1,e:2,f:3,g:4,a:5,b:6};e.sort((function(e,n){var a=e.split("/"),o=Object(A.a)(a,2),r=o[0],s=o[1],i=n.split("/"),c=Object(A.a)(i,2),l=c[0],u=c[1],d=[Number(s),Number(u)],f=d[0],v=d[1];if(f<v)return-1;if(v<f)return 1;var h=[t[r],t[l]];return h[0]<h[1]?-1:1}))}window.rootNotes=function(){var e=new Set;_.treble.second.forEach((function(t){return e.add(t)})),_.bass.second.forEach((function(t){return e.add(t)}));var t=Array.from(e);U(t),console.log(t.map((function(e){return e.replace("/","").toUpperCase()})).join(" "))},window.secondNotes=function(){var e=new Set;_.treble.second.forEach((function(t){return e.add(t)})),_.bass.second.forEach((function(t){return e.add(t)}));var t=Array.from(e);U(t),console.log(t.map((function(e){return e.replace("/","").toUpperCase()})).join(" "))},window.thirdNotes=function(){var e=new Set;_.treble.third.forEach((function(t){return e.add(t)})),_.bass.third.forEach((function(t){return e.add(t)}));var t=Array.from(e);U(t),console.log(t.map((function(e){return e.replace("/","").toUpperCase()})).join(" "))};var z=new(function(){function e(){Object(i.a)(this,e)}return Object(c.a)(e,[{key:"randomClef",value:function(){var e=[];return this.settings.clef.treble&&e.push("treble"),this.settings.clef.bass&&e.push("bass"),G(e)}},{key:"randomNote",value:function(e){return G(Array.from(new Set([].concat(this.settings.notes.root?_[e].root:[],this.settings.notes.second?_[e].second:[],this.settings.notes.third?_[e].third:[]))))}},{key:"next",value:function(){var e={clef:"treble",note:"c/4"},t=this.randomClef();if(!t)return e;var n=this.randomNote(t);return n?{clef:t,note:n}:e}},{key:"settings",get:function(){return R.getState().settings}}]),e}()),D=n(1);function I(e,t){var n=R.getState().settings.clef,a=n.bass,o=n.treble;return a&&o?function(e,t){var n=J(),a=n.context,o=n.div,r=new D.Flow.Stave(20,0,160);r.addClef("treble"),r.setContext(a).draw();var s=new D.Flow.Stave(20,100,160);s.addClef("bass"),s.setContext(a).draw();var i=new D.Flow.StaveConnector(r,s);i.setType("singleLeft"),i.setContext(a).draw();var c=new D.Flow.StaveConnector(r,s);c.setType("brace"),c.setContext(a).draw();var l=[new D.Flow.StaveNote({clef:t,keys:[e],duration:"w"})],u=new D.Flow.Voice({num_beats:4,beat_value:4});return u.addTickables(l),(new D["Flow"].Formatter).joinVoices([u]).format([u],150),u.draw(a,"treble"===t?r:s),q(o.querySelector("svg"))}(e,t):a?function(e){var t=J(),n=t.context,a=t.div,o=new D.Flow.Stave(0,40,185);o.addClef("bass"),o.setContext(n).draw();var r=[new D.Flow.StaveNote({clef:"bass",keys:[e],duration:"w"})],s=new D.Flow.Voice({num_beats:4,beat_value:4});return s.addTickables(r),(new D["Flow"].Formatter).joinVoices([s]).format([s],150),s.draw(n,o),q(a.querySelector("svg"))}(e):o?function(e){var t=document.createElement("div"),n=new D.Flow.Renderer(t,D.Flow.Renderer.Backends.SVG),a=n.getContext();n.resize(325,380),a.scale(1.75,1.75);var o=new D.Flow.Stave(0,40,185);o.addClef("treble"),o.setContext(a).draw();var r=[new D.Flow.StaveNote({clef:"treble",keys:[e],duration:"w"})],s=new D.Flow.Voice({num_beats:4,beat_value:4});return s.addTickables(r),(new D["Flow"].Formatter).joinVoices([s]).format([s],150),s.draw(a,o),q(t.querySelector("svg"))}(e):""}function J(){var e=document.createElement("div"),t=new D.Flow.Renderer(e,D.Flow.Renderer.Backends.SVG),n=t.getContext();return t.resize(325,380),n.scale(1.75,1.75),"dark"===R.getState().settings.theme&&(n.setFillStyle("#efefe9"),n.setStrokeStyle("#efefe9")),{context:n,div:e}}function q(e){return"data:image/svg+xml;base64,".concat(window.btoa((new XMLSerializer).serializeToString(e)))}function P(e){var t=e.settings,n=e.setBassClef,a=e.setGrandStaff,r=e.setTrebleClef,s=e.toggleNotes,i=e.setTheme;if(!e.visible)return null;var c=t.clef,l=t.notes,u=t.theme,d=c.treble&&c.bass,f=c.treble&&!c.bass,v=c.bass&&!c.treble;return o.a.createElement("div",{className:"SettingsMenu"},o.a.createElement("h2",null,"Settings"),o.a.createElement("div",{className:"section"},o.a.createElement("h3",null,"Staff"),o.a.createElement("div",{className:"selector"},o.a.createElement("div",{onClick:a,className:"option".concat(d?" selected":"")},"Grand (Piano)"),o.a.createElement("div",{onClick:r,className:"option".concat(f?" selected":"")},"Treble (G)"),o.a.createElement("div",{onClick:n,className:"option".concat(v?" selected":"")},"Bass (F)"))),o.a.createElement("div",{className:"section"},o.a.createElement("h3",null,"Notes"),o.a.createElement("div",{className:"selector"},o.a.createElement("div",{onClick:function(){return s("root")},className:"option".concat(l.root?" selected":"")},"Root"),o.a.createElement("div",{onClick:function(){return s("second")},className:"option".concat(l.second?" selected":"")},"2",o.a.createElement("sup",null,o.a.createElement("small",null,"nd"))," & 7",o.a.createElement("sup",null,o.a.createElement("small",null,"th"))),o.a.createElement("div",{onClick:function(){return s("third")},className:"option".concat(l.third?" selected":"")},"3",o.a.createElement("sup",null,o.a.createElement("small",null,"rd"))," & 6",o.a.createElement("sup",null,o.a.createElement("small",null,"th"))))),o.a.createElement("div",{className:"section"},o.a.createElement("h3",null,"Theme"),o.a.createElement("div",{className:"selector"},o.a.createElement("div",{onClick:function(){return i("light")},className:"option".concat("light"===u?" selected":"")},"Light"),o.a.createElement("div",{onClick:function(){return i("dark")},className:"option".concat("dark"===u?" selected":"")},"Dark"))))}function X(e){var t=e.clef,n=e.note,a=e.noteVisible,r=e.visible,s=e.onMouseDown;if(!r)return null;var i=I(n,t),c="Staff displaying ".concat(n," on the ").concat(t," clef.");return o.a.createElement("div",{className:"FlashCard",onMouseDown:s},o.a.createElement("div",{className:"Staff"},o.a.createElement("img",{src:i,alt:c})),o.a.createElement("div",{className:"Answer ".concat(a?"visible":"")},a?n.replace("/","").toUpperCase():"?"))}var $,H=function(e){function t(e){var n;Object(i.a)(this,t),n=Object(l.a)(this,Object(u.a)(t).call(this,e));var a=z.next(),o=a.clef,r=a.note;return n.state={clef:o,note:r,noteVisible:!1,settingsOpen:!1},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"App ".concat(this.state.settingsOpen?"settings":""," theme-").concat(this.props.settings.theme)},o.a.createElement("header",{className:"clearfix"},o.a.createElement("h1",null,"Landmark",o.a.createElement("div",{className:"menu-toggle",onClick:this.onToggleSettings},o.a.createElement("i",{className:"material-icons md-36"},"menu")))),o.a.createElement("main",null,o.a.createElement(X,{visible:!this.state.settingsOpen,clef:this.state.clef,note:this.state.note,noteVisible:this.state.noteVisible,onMouseDown:this.onFlashCardClick}),o.a.createElement(P,{visible:this.state.settingsOpen,settings:this.props.settings,setTrebleClef:this.props.setTrebleClef,setBassClef:this.props.setBassClef,setGrandStaff:this.props.setGrandStaff,toggleNotes:this.props.toggleNotes,setTheme:this.props.setTheme})))}},{key:"onFlashCardClick",get:function(){var e=this;return function(){return e.setState((function(e){if(!e.noteVisible)return{noteVisible:!0};var t=z.next();return{clef:t.clef,note:t.note,noteVisible:!1}}))}}},{key:"onToggleSettings",get:function(){var e=this;return function(){return e.setState((function(e){return{settingsOpen:!e.settingsOpen}}))}}}]),t}(a.Component),K=($=H,f.b(x,V)($)),Q=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function Y(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}s.a.render(o.a.createElement(f.a,{store:R},o.a.createElement(K,null)),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/landmark",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/landmark","/service-worker.js");Q?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):Y(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):Y(t,e)}))}}()},55:function(e,t,n){e.exports=n(131)},60:function(e,t,n){},61:function(e,t,n){}},[[55,1,2]]]);
//# sourceMappingURL=main.6a5e10e9.chunk.js.map