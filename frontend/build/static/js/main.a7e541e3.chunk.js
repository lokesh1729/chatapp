(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{101:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(20),s=a.n(r),c=a(5),l=a(6),i=a(8),u=a(7),m=a(9),p=a(31),d=a(15),h=a(32),g=a.n(h),f=function(e,t,a){return{type:e,payload:{msg:t,status:a}}},b=a(22),E=a(10),O=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).submitLogin=function(e){e.preventDefault(),a.props.login(a.state.username,a.state.password)},a.onChange=function(e){a.setState(Object(p.a)({},e.target.name,e.target.value))},a.state={username:"",password:""},a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props.state.isAuthenticated;return o.a.createElement(n.Fragment,null,e?o.a.createElement(b.a,{to:"/room"}):o.a.createElement(E.Section,{className:this.props.state.isLoading?"opacity-25":""},o.a.createElement(E.Container,null,o.a.createElement("form",{onSubmit:this.submitLogin},o.a.createElement(E.Field,null,o.a.createElement(E.Label,null,"Username"),o.a.createElement(E.Control,null,o.a.createElement(E.Input,{type:"text",onChange:this.onChange,name:"username",placeholder:"Enter username",required:!0}))),o.a.createElement(E.Field,null,o.a.createElement(E.Label,null,"Password"),o.a.createElement(E.Control,null,o.a.createElement(E.Input,{type:"password",onChange:this.onChange,name:"password",placeholder:"Enter password",required:!0}))),o.a.createElement(E.Field,null,o.a.createElement(E.Control,null,o.a.createElement(E.Button,{isColor:"primary",type:"submit"},"Submit")))))))}}]),t}(n.Component),y=Object(d.b)(function(e){return{state:e.login}},{login:function(e,t){return function(a){var n=JSON.stringify({username:e,password:t});a({type:"HTTP_CALL_INITIATED"}),g.a.post("/api/auth/login/",n,{headers:{"Content-Type":"application/json"}}).then(function(e){200===e.status?(a({type:"LOGIN",payload:e.data}),a({type:"MESSAGE",payload:{loginSuccess:"logged in successfully"}})):a(f("ERROR",e.statusText,e.status)),a({type:"HTTP_CALL_COMPLETED"})}).catch(function(e){a({type:"HTTP_CALL_COMPLETED"}),e.response&&a(f("ERROR",e.response.data,e.response.status)),console.log(e),a(f("ERROR",e.message,500))}).catch(function(e){return a(f("ERROR","Something went wrong!!!",e.response.status))})}}})(O),v=a(26),j=a(56),w=(a(91),function(e){function t(){return Object(c.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidUpdate",value:function(e,t){var a=this.props,n=a.errors,o=a.alert,r=a.messages;n!==e.errors&&(n.msg.name&&o.error("Name: ".concat(n.msg.name.join())),n.msg.email&&o.error("".concat(n.status," : Email: ").concat(n.msg.email.join())),n.msg.non_field_errors&&o.error("".concat(n.status," : ").concat(n.msg.non_field_errors.join())),n.msg.username&&o.error(n.msg.username.join())),r!==e.messages&&r.loginSuccess&&o.success(r.loginSuccess)}},{key:"render",value:function(){return o.a.createElement(n.Fragment,null)}}]),t}(n.Component)),N=Object(d.b)(function(e){return{errors:e.errors,messages:e.messages}})(Object(v.d)()(w)),C=a(35),_=a(21),x=a(57),k=a(58),L=a(36),T=a(92),S={isAuthenticated:!!T.get("authToken"),isLoading:!1},R=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:S,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LOGIN":var a=t.payload.token;return T.set("authToken",a,{path:"/",expires:new Date(t.payload.expiry)}),Object(L.a)({},e,{isAuthenticated:!0});case"HTTP_CALL_INITIATED":return Object(L.a)({},e,{isLoading:!0});case"HTTP_CALL_COMPLETED":return Object(L.a)({},e,{isLoading:!1});default:return e}},D={msg:{},status:""},A=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:D,t=arguments.length>1?arguments[1]:void 0;return"ERROR"===t.type?{msg:t.payload.msg,status:t.payload.status}:e},I={msg:{}},P=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:I,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"MESSAGE":return t.payload;default:return e}},M=Object(_.combineReducers)({login:R,errors:A,messages:P}),F=[k.a],H=Object(_.createStore)(M,{},Object(x.composeWithDevTools)(_.applyMiddleware.apply(void 0,F))),B=function(e){function t(){return Object(c.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return o.a.createElement(n.Fragment,null,this.props.isLoading&&o.a.createElement("div",{className:"spinner"},o.a.createElement("img",{src:"assets/spinner.gif",alt:"loading"})))}}]),t}(n.Component),J=Object(d.b)(function(e){return{isLoading:e.login.isLoading}})(B),U=a(30),G=function(e){function t(){return Object(c.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return o.a.createElement("div",null,"Home Page")}}]),t}(n.Component),W=a(33),z=a(28),q=a(59),K=a(60),V=(a(93),a(34)),Y=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).enterRoom=function(e){e.preventDefault(),a.props.history.push("/room/"+a.state.roomName)},a.roomNameChange=function(e){var t=e.target.value;a.setState(function(e){return{roomName:t}})},a.keyDownHandler=function(e){13===e.keyCode&&a.enterRoom(e)},a.state={roomName:""},a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return o.a.createElement(W.Section,{className:"room_enter__section"},o.a.createElement(z.Container,{className:"room__container"},o.a.createElement(K.Label,{className:"room__label"},"Enter a room name:"),o.a.createElement(q.Input,{type:"text",className:"room__input",onChange:this.roomNameChange,onKeyDown:this.keyDownHandler}),o.a.createElement(V.Button,{isColor:"primary",className:"large__btn",onClick:this.enterRoom},"Enter")))}}]),t}(n.Component),$=a(44);var Q=a(43),X=a(61),Z=(a(94),a(62)),ee=function(e){var t=function(t){function a(){return Object(c.a)(this,a),Object(i.a)(this,Object(u.a)(a).apply(this,arguments))}return Object(m.a)(a,t),Object(l.a)(a,[{key:"render",value:function(){var t=this.props.state.isAuthenticated;return o.a.createElement(n.Fragment,null,t?o.a.createElement(e,this.props):o.a.createElement(b.a,{to:"/login"}))}}]),a}(o.a.Component);return Object(d.b)(function(e){return{state:e.login}},null)(Object(C.b)(t))}(function(e){function t(e){var a;Object(c.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).sendMessage=function(e){e.preventDefault(),a.state.socket.send(JSON.stringify({message:a.state.message,room_name:a.state.roomName})),a.setState(function(e){return{message:""}})},a.keyDownHandler=function(e){13===e.keyCode&&a.sendMessage(e)};var n=a.props.match.params.roomName;return a.state={socket:null,chatLog:[],message:"",roomName:n},a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this.props.cookies.get("authToken"),t="https:"===window.location.protocol?"wss:":"ws:",a=window.location.host,n=new WebSocket("".concat(t,"//").concat(a,"/ws/chat/").concat(this.state.roomName,"/")),o=this;n.onopen=function(e){console.log("opened connection...")},n.onmessage=function(e){console.log("message received : ".concat(e.data));var t=JSON.parse(e.data);o.setState(function(e){return{chatLog:[].concat(Object($.a)(e.chatLog),[t])}})},n.onerror=function(e){console.log("socket connection closed unexcpectedly ".concat(e))},n.onclose=function(e){console.log("closing connection...")},this.setState({socket:n}),g.a.get("/api/message/room/".concat(this.state.roomName,"/"),{headers:{Authorization:"Token ".concat(e)}}).then(function(e){var t=[],a=!0,n=!1,r=void 0;try{for(var s,c=e.data[Symbol.iterator]();!(a=(s=c.next()).done);a=!0){var l=s.value;t.push({key:l.id,message:l.text,username:l.sender_name,created:l.created_on})}}catch(i){n=!0,r=i}finally{try{a||null==c.return||c.return()}finally{if(n)throw r}}o.setState(function(e){return{chatLog:[].concat(Object($.a)(e.chatLog),t)}})}).catch(function(e){e.response&&404!==e.response.status&&console.log(e.response.statusText,e.response.statusMessage)})}},{key:"render",value:function(){var e=this,t=this.state.chatLog;return o.a.createElement(W.Section,{className:"bg-purple-400 h-screen"},o.a.createElement(z.Container,{className:"h-full"},o.a.createElement("div",{className:"flex flex-col h-full"},o.a.createElement("div",{className:"text-3xl text-center flex-auto room__name w-full border-solid border-2 border-white-500 flex-auto"},"Room Name : ",this.props.match.params.roomName),o.a.createElement("div",{className:"chat_log__flex flex-auto flex flex-row w-full border-solid border-2 border-t-0 border-white-500 flex-auto"},o.a.createElement("div",{className:"chat_log w-9/12 border-solid border-r-2 border-white-500 flex-auto"},t.map(function(e){return o.a.createElement("div",{key:e.key},o.a.createElement("span",{className:"message__username text-white"},e.username)," :"," ",o.a.createElement("span",{className:"message__message break-words"},e.message))})),o.a.createElement("div",{className:"user_list w-3/12"},o.a.createElement("ul",null,o.a.createElement("li",{className:"text-center has-text-info"},"user1"),o.a.createElement("li",{className:"text-center has-text-info"},"user2"),o.a.createElement("li",{className:"text-center has-text-info"},"user3"),o.a.createElement("li",{className:"text-center has-text-info"},"user4")))),o.a.createElement(z.Container,{className:"mt-4"},o.a.createElement(Q.Field,null,o.a.createElement(Z.TextArea,{isSize:"medium",placeholder:"Enter message",onChange:function(t){var a=t.target.value;e.setState(function(e){return{message:a}})},onKeyDown:this.keyDownHandler,className:"resize-none shadow rounded border max-w-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500",value:this.state.message})),o.a.createElement(Q.Field,null,o.a.createElement(X.Control,null,o.a.createElement(V.Button,{isColor:"primary",onClick:this.sendMessage},"Submit")))))))}}]),t}(n.Component)),te={position:v.b.BOTTOM_CENTER,timeout:5e3,offset:"30px",transition:v.c.SCALE},ae=function(e){return o.a.createElement(n.Fragment,null,o.a.createElement(J,null),o.a.createElement(N,null),o.a.createElement(y,e))},ne=function(e){function t(){return Object(c.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return o.a.createElement(d.a,{store:H},o.a.createElement(C.a,null,o.a.createElement(v.a,Object.assign({template:j.a},te),o.a.createElement(U.a,{basename:"/app"},o.a.createElement(b.d,null,o.a.createElement(b.b,{path:"/",exact:!0,component:G}),o.a.createElement(b.b,{path:"/login",component:ae}),o.a.createElement(b.b,{path:"/room",exact:!0,component:Y}),o.a.createElement(b.b,{path:"/room/:roomName",component:ee}))))))}}]),t}(n.Component);a(95),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var oe=a(63);a.n(oe).a.config(Object({NODE_ENV:"production",PUBLIC_URL:""}).REACT_APP_SENTRY_URL).install();var re=document.getElementById("root");s.a.render(o.a.createElement(ne,null),re),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},64:function(e,t,a){e.exports=a(101)},91:function(e,t,a){},93:function(e,t,a){},94:function(e,t,a){},95:function(e,t,a){}},[[64,1,2]]]);
//# sourceMappingURL=main.a7e541e3.chunk.js.map