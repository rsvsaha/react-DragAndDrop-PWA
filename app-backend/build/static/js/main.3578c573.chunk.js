(this.webpackJsonppublishing=this.webpackJsonppublishing||[]).push([[0],{12:function(e,t,n){"use strict";n.r(t),function(e){var t=n(28),i=n(25).functionComponent;n(55),new Map;e.exports=function(e,n){for(var o=Object(t.a)(e);o.length>0;){var a=o.shift(),c=(a.id,a.functionName),r=a.functionType,s=a.functionArgs;i[r][c](s,n)}}}.call(this,n(53)(e))},25:function(e,t,n){var i={BasicFunctions:{createVariable:function(e,t){t.set(e[0],null)},assignFunction:function(e,t){var n=e[1];t.set(e[0],n)},assignToVariableFunction:function(e,t){var n=t.get(e[0]);t.set(e[1],n)},printFunction:function(e,t){console.log(t.get(e[0]))}},LogicBlocks:{ifElseBlock:function(e,t){var n=o(e[0],t);o(n?e[1]:e[2],t)},executionBlock:function(e,t){n(12)(e,t)}},LogicalFunctions:{greaterThan:function(e,t){return t.get(e[0])>t.get(e[1])},lessThan:function(e,t){return t.get(e[0])<t.get(e[1])},greaterThanEqual:function(e,t){return t.get(e[0])>=t.get(e[1])},lessThanEqual:function(e,t){return t.get(e[0])<=t.get(e[1])},equalTo:function(e,t){return t.get(e[0])===t.get(e[1])}},LoopBlocks:{forLoop:function(e,t){for(var n=t.get(e[0]),i=t.get(e[1]),a=n;a<=i;a++)t.set(e[0],a),o(e[2],t)}},NetworkBlocks:{networkGET:function(e,t){n(54).networkGET(e,t)}}},o=function(e,t){var n=e,o=(n.id,n.functionName),a=n.functionType,c=n.functionArgs;return i[a][o](c,t)};t.functionComponent=i,t.blocksExecutor=o},26:function(e,t){e.exports=[{id:"id1",functionName:"assignFunction",functionType:"BasicFunctions",functionArgs:["variable3","Hello it is Succuussful"]},{id:"id2",functionName:"printFunction",functionType:"BasicFunctions",functionArgs:["variable3"]}]},29:function(e,t,n){e.exports=n(57)},34:function(e,t,n){},52:function(e,t,n){},54:function(e,t,n){var i=n(10),o=n(25).blocksExecutor;t.networkGET=function(e,t){var n=t.get(e[0]);i.get(n).then((function(n){var i=n.data;t.set(e[1],i),o(e[2],t)}))}},55:function(e,t,n){var i=[{id:"id1",functionName:"createVariable",functionType:"BasicFunctions",functionArgs:["variable1"]},{id:"id2",functionName:"assignFunction",functionType:"BasicFunctions",functionArgs:["variable1",5]},{id:"id3",functionName:"printFunction",functionType:"BasicFunctions",functionArgs:["variable1"]},{id:"id4",functionName:"createVariable",functionType:"BasicFunctions",functionArgs:["variable2"]},{id:"id5",functionName:"assignFunction",functionType:"BasicFunctions",functionArgs:["variable2",7]},{id:"id6",functionName:"printFunction",functionType:"BasicFunctions",functionArgs:["variable2"]},{id:"id7",functionName:"ifElseBlock",functionType:"LogicBlocks",functionArgs:[{id:"id2",functionName:"executionBlock",functionType:"LogicBlocks",functionArgs:[{id:"id1",functionName:"greaterThan",functionType:"LogicalFunctions",functionArgs:["variable1","variable2"]}]},,{id:"id2",functionName:"executionBlock",functionType:"LogicBlocks",functionArgs:n(26)},{id:"id3",functionName:"executionBlock",functionType:"LogicBlocks",functionArgs:[{id:"id6",functionName:"printFunction",functionType:"BasicFunctions",functionArgs:["variable1"]},{id:"id6",functionName:"printFunction",functionType:"BasicFunctions",functionArgs:["variable2"]}]}]},{id:"id8",functionName:"createVariable",functionType:"BasicFunctions",functionArgs:["variable3"]},{id:"id9",functionName:"assignFunction",functionType:"BasicFunctions",functionArgs:["variable3",6]},n(56)];e.exports=i},56:function(e,t,n){e.exports={id:"id10",functionName:"forLoop",functionType:"LoopBlocks",functionArgs:["variable3","variable2",{id:"id11",functionName:"executionBlock",functionType:"LogicBlocks",functionArgs:n(26)}]}},57:function(e,t,n){"use strict";n.r(t);var i=n(0),o=n.n(i),a=n(27),c=n.n(a),r=(n(34),new Map),s=n(10),u=n.n(s),l="",f=n(2),g=n(58),p=n(9),h=n(3),d=n(4),b=n(1),v=n(8),m=n(6),y=n(7),w=(n(52),function(e){var t,n,a,c,r=Object(i.useState)(e.width+10),s=Object(f.a)(r,2),u=s[0],l=s[1];Object(i.useEffect)((function(){l(e.width+10)}),[e.width]),Object(i.useEffect)((function(){e.isSelected&&console.log({X:e.posX,Y:e.posY,width:e.width,height:e.height})}));var g=function(e){e.stopPropagation(),console.log("Start Resizing Height:"+e.pageY),t=e.pageY},p=function(i,o){console.log("Stop Resizing Height:"+i.pageY),i.stopPropagation(),n=i.pageY,o?(e.handleYChanges(n),e.handleHeightChanges(-(n-t))):e.handleHeightChanges(n-t)},h=function(e){e.stopPropagation(),console.log("Start Resizing Width:"+e.pageX),a=e.pageX},d=function(t,n){t.stopPropagation(),console.log("Stop Resizing Width:"+t.pageX),c=t.pageX,n?(e.handleXChanges(c),e.handleWidthChanges(-(c-a))):e.handleWidthChanges(c-a)};return console.log("Resizable Component Render",e.posX,e.posY),o.a.createElement("div",{onDragEnd:function(t){t.stopPropagation(),e.isSelected&&(e.handleXChanges(t.pageX-e.width/2),e.handleYChanges(t.pageY-e.height/2))},onClick:function(e){!function(e){e.stopPropagation()}(e)},style:{position:"absolute",top:e.posY+"px",left:e.posX+"px",display:"flex",flexDirection:"column"}},o.a.createElement("div",{draggable:e.isSelected,onDragStart:g,onDragEnd:function(e){p(e,!0)},style:{visibility:e.isSelected?"visible":"hidden",height:"5px",width:u+"px",cursor:"ns-resize",backgroundColor:"yellow"}}),o.a.createElement("div",{style:{display:"flex",flexDirection:"row"}},o.a.createElement("div",{draggable:e.isSelected,onDragStart:h,onDragEnd:function(e){d(e,!0)},style:{visibility:e.isSelected?"visible":"hidden",height:e.height+"px",width:"5px",cursor:"ew-resize",backgroundColor:"yellow"}}),e.children,o.a.createElement("div",{draggable:e.isSelected,onDragStart:h,onDragEnd:function(e){d(e,!1)},style:{visibility:e.isSelected?"visible":"hidden",height:e.height+"px",width:"5px",cursor:"ew-resize",backgroundColor:"yellow"}})),o.a.createElement("div",{draggable:e.isSelected,onDragStart:g,onDragEnd:function(e){p(e,!1)},style:{visibility:e.isSelected?"visible":"hidden",height:"5px",width:u+"px",cursor:"ns-resize",backgroundColor:"yellow"}}))}),k=function(e){var t=Object(i.useState)(e.height?e.height:200),n=Object(f.a)(t,2),a=n[0],c=n[1],r=Object(i.useState)(e.width?e.width:200),s=Object(f.a)(r,2),u=s[0],l=s[1],g=Object(i.useState)(e.X?e.X:200),p=Object(f.a)(g,2),h=p[0],d=p[1],b=Object(i.useState)(e.Y?e.Y:200),v=Object(f.a)(b,2),m=v[0],y=v[1];return Object(i.useEffect)((function(){j(h,m,u,a,d,y,l,c,e)}),[h,m,a,u,e]),console.log("Movable Component Render",u,a),o.a.createElement(w,{width:u,height:a,posX:h,posY:m,handleHeightChanges:function(t){console.log("Height Changes",t),e.setHeight((function(e){return e+t})),c((function(e){return e+t}))},handleWidthChanges:function(t){console.log("Width Changes",t),e.setWidth((function(e){return e+t})),l((function(e){return e+t}))},handleXChanges:function(t){e.setX(t),d(t)},handleYChanges:function(t){e.setY(t),y(t)},isSelected:e.isSelected,id:e.id},e.children)},j=function(e,t,n,i,o,a,c,r,s){e<0&&(s.setX(0),o(0)),t<0&&(s.setY(0),a(0)),e+n+5>1024&&(s.setX(1024-n-10),o(1024-n-10)),t+i+5>576&&(s.setY(576-i-10),a(576-i-10)),i>566&&(s.setHeight(566),r(566)),n>1014&&(s.setWidth(566),c(1014))},O=function(){function e(t){var n=this;Object(h.a)(this,e),this.type="",this.production=!1,this.setProduction=function(e){n.setProduction=e},this.setX=function(e){n.X=e},this.setY=function(e){n.Y=e},this.setWidth=function(e){n.width=e},this.setHeight=function(e){n.height=e},this.setDimensions=function(e,t,i,o){console.log(e,t,i,o),n.X=e,n.Y=t,n.width=i,n.height=o},this.properties={},this.events={},this.setEventWorkflowName=function(e,t){n.events[e].workFlowName=t},this.inputVariable={},this.setInputVariable=function(e,t){n.inputVariable[e].value=t},this.type=t,this.width=100,this.height=100,this.X=100,this.Y=100}return Object(d.a)(e,[{key:"getProperties",value:function(){return this.properties}},{key:"getDetails",value:function(){return{X:this.X,Y:this.Y,Width:this.width,Height:this.height,Type:this.type}}},{key:"render",value:function(e){var t=this;return this.production?function(n){return o.a.createElement(o.a.Fragment,null,e(!1,{position:"absolute",left:t.X,top:t.Y,width:t.width+"px",height:t.height+"px"}))}:function(n){var a=Object(i.useState)(t.width),c=Object(f.a)(a,2),r=c[0],s=c[1],u=Object(i.useState)(t.height),l=Object(f.a)(u,2),g=l[0],p=l[1],h=Object(i.useState)(t.X),d=Object(f.a)(h,2),b=d[0],v=d[1],m=Object(i.useState)(t.Y),y=Object(f.a)(m,2),w=y[0],j=y[1];return Object(i.useEffect)((function(){t.setX(b),t.setY(w),t.setWidth(r),t.setHeight(g)})),console.log("Base Component Render",r,g),o.a.createElement(k,{setWidth:s,setHeight:p,setX:v,setY:j,height:g,width:r,X:b,Y:w,isSelected:n.isSelected,id:n.id,type:t.type},e(n.isSelected,{width:r+"px",height:g+"px"}))}}}]),e}(),C=function(e){Object(y.a)(n,e);var t=Object(m.a)(n);function n(e){var i;return Object(h.a)(this,n),(i=t.call(this,n.classNameUnique)).properties={textValue:{type:"text",value:"Hello Text"},backgroundColor:{type:"text",value:"#fff000"}},i.setProperty=function(e,t){i.properties[e].value=t},i.id=e,i}return Object(d.a)(n,[{key:"getProperties",value:function(){return this.properties}},{key:"getNewClass",value:function(){var e=this;return Object(v.a)(Object(b.a)(n.prototype),"render",this).call(this,(function(t,n){return o.a.createElement("div",{draggable:t,style:Object(p.a)({},n,{backgroundColor:e.properties.backgroundColor.value})},o.a.createElement("div",{style:{width:"100%"}},"This is my component"),o.a.createElement("div",{style:{width:"100%"}},"This is my component"))}))}}]),n}(O);C.classNameUnique="CompositeComponent";var x=function(e){Object(y.a)(n,e);var t=Object(m.a)(n);function n(e){var i;return Object(h.a)(this,n),(i=t.call(this,n.classNameUnique)).properties={textValue:{type:"text",value:"Hello Text"},backgroundColor:{type:"text",value:"#fff000"}},i.setProperty=function(e,t){i.properties[e].value=t},i.id=e,i}return Object(d.a)(n,[{key:"getProperties",value:function(){return this.properties}},{key:"getNewClass",value:function(){var e=this;return Object(v.a)(Object(b.a)(n.prototype),"render",this).call(this,(function(t,n){return o.a.createElement("div",{draggable:t,style:Object(p.a)({},n,{backgroundColor:e.properties.backgroundColor.value})},e.properties.textValue.value)}))}}]),n}(O);x.classNameUnique="TextComponent";var E=function(e){Object(y.a)(i,e);var t=Object(m.a)(i);function i(e){var n;return Object(h.a)(this,i),(n=t.call(this,i.classNameUnique)).inputVariable={fieldVariable:{type:"variable",value:null}},n.setInputVariable=function(e,t){n.inputVariable[e].value=t},n.id=e,n}return Object(d.a)(i,[{key:"getNewClass",value:function(){var e=this;return Object(v.a)(Object(b.a)(i.prototype),"render",this).call(this,(function(t,i){return o.a.createElement("input",{type:"text",draggable:t,style:i,onChange:function(t){null!==e.inputVariable.fieldVariable.value&&n(12)([{id:Object(g.a)(),functionName:"assignFunction",functionType:"BasicFunctions",functionArgs:[e.inputVariable.fieldVariable.value,t.target.value]}],r)}})}))}}]),i}(O);E.classNameUnique="TextInputComponent";var N=n(14),T=function(e){Object(y.a)(i,e);var t=Object(m.a)(i);function i(e){var o;return Object(h.a)(this,i),(o=t.call(this,i.classNameUnique)).properties={textValue:{type:"text",value:"Hello Text"},backgroundColor:{type:"text",value:"#fff000"}},o.events={clickEvent:{workFlowName:null}},o.setEventWorkflowName=function(e,t){console.log(e,t),o.events[e].workFlowName=t},o.setProperty=function(e,t){o.properties[e].value=t},o.clickFunction=function(){null!==o.events.clickEvent.workFlowName&&u.a.get(l+"/workFlows/"+o.events.clickEvent.workFlowName+".json").then((function(e){var t=e.data;n(12)(t,r),X(Object(g.a)())})).catch((function(e){console.log(e)}))},o.id=e,o}return Object(d.a)(i,[{key:"getNewClass",value:function(){var e=this;return Object(v.a)(Object(b.a)(i.prototype),"render",this).call(this,(function(t,n){return o.a.createElement("button",Object(N.a)({onClick:function(e){console.log(e)},draggable:t,style:Object(p.a)({},n,{backgroundColor:e.properties.backgroundColor.value})},"onClick",e.clickFunction),e.properties.textValue.value)}))}}]),i}(O);T.classNameUnique="ButtonComponent";var F=function(e){Object(y.a)(n,e);var t=Object(m.a)(n);function n(e){var i;return Object(h.a)(this,n),(i=t.call(this,n.classNameUnique)).properties={imgSrcValue:{type:"text",value:"logo 640.png"},backgroundColor:{type:"text",value:"#fff000"}},i.id=e,i}return Object(d.a)(n,[{key:"setProperty",value:function(e,t){this.properties[e].value=t}},{key:"getNewClass",value:function(){var e=this;return Object(v.a)(Object(b.a)(n.prototype),"render",this).call(this,(function(t,n){return o.a.createElement("img",{draggable:t,src:e.properties.imgSrcValue.value,style:n})}))}}]),n}(O);F.classNameUnique="ImageComponent";var S=function(e){Object(y.a)(n,e);var t=Object(m.a)(n);function n(e){var i;return Object(h.a)(this,n),(i=t.call(this,n.classNameUnique)).properties={messageVariable:{type:"text",value:"variable1"},backgroundColor:{type:"text",value:"#fff000"}},i.setProperty=function(e,t){i.properties[e].value=t},i.id=e,i}return Object(d.a)(n,[{key:"getProperties",value:function(){return this.properties}},{key:"getNewClass",value:function(){var e=this;return Object(v.a)(Object(b.a)(n.prototype),"render",this).call(this,(function(t,n){return o.a.createElement("div",{draggable:t,style:Object(p.a)({},n,{backgroundColor:e.properties.backgroundColor.value})},r.get(e.properties.messageVariable.value))}))}}]),n}(O);S.classNameUnique="MessageComponent";var B={ButtonComponent:function(){return new T},CompositeComponent:function(){return new C},TextComponent:function(){return new x},TextInputComponent:function(){return new E},ImageComponent:function(){return new F},MessageComponent:function(){return new S}},X=function(e){},Y=function(e){var t=Object(i.useState)([]),n=Object(f.a)(t,2),a=n[0],c=n[1],r=Object(i.useState)(Object(g.a)()),s=Object(f.a)(r,2),p=(s[0],s[1]);Object(i.useEffect)((function(){return u.a.get(l+"/designs/App1.json").then((function(e){console.log(e.data),c(e.data.map((function(e){return function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:window.innerWidth,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:window.innerHeight,o=B[e.type]();if(t){console.log(n),console.log(i);var a=n/1024,c=i/576,r=a*e.width,s=c*e.height,u=a*e.X,l=c*e.Y;console.log(u,l,r,s),o.setDimensions(u,l,r,s)}else o.setDimensions(e.X,e.Y,e.width,e.height);return o.setProduction(t),o.events=e.events,o.inputVariable=e.inputVariable,o.properties=e.properties,o.id=e.id,o}(e)})))})),X=p,function(){console.log("UnMount"),X=function(e){}}}),[]);var h=a.map((function(e){var t=e.getNewClass();return o.a.createElement(t,{id:e.id,key:e.id,isSelected:!1})}));return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",null,o.a.createElement("div",{style:{position:"absolute",top:"0px",left:"0px",width:"100%",height:"100%",backgroundColor:"#f0f0f0",border:"2px solid black"}},h)))},V=r;u.a.get(l+"/workFlows/appInit.json").then((function(e){var t=e.data;n(12)(t,V)})).catch((function(e){console.log(e)}));var A=function(){return console.log("Render Called"),o.a.createElement(Y,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));"serviceWorker"in navigator&&navigator.serviceWorker.register("/sw.js").then((function(e){console.log("Service Worker Registered")})).catch((function(e){console.log(e)})),c.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(A,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[29,1,2]]]);
//# sourceMappingURL=main.3578c573.chunk.js.map