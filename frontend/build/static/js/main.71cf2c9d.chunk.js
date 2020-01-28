(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{103:function(e,t,a){},105:function(e,t,a){},106:function(e,t,a){},107:function(e,t,a){},113:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(21),o=a.n(s),l=a(4),c=a(5),i=a(7),u=a(6),m=a(8),p=a(25),d=a(56),h=a.n(d),g=a(11),f=a(27),E=a.n(f),b=function(e,t,a){return{type:e,payload:{msg:t,status:a}}},y=function(e,t){return{type:e,payload:{msg:t}}},w=function(e,t,a,n,r){E.a.post(e,t,{headers:{"Content-Type":"application/json"}}).then(function(e){r({type:"HTTP_CALL_COMPLETED"}),r({type:n,payload:e.data}),r(y("MESSAGE",{loginSuccess:a}))}).catch(function(e){return r({type:"HTTP_CALL_COMPLETED"}),e.response?r(b("ERROR",e.response.data,e.response.status)):e.status&&e.statusText?r(b("ERROR",e.statusText,e.status)):r(b("ERROR",e.message,500))})},O=a(15),v=a(1),N=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).submitLogin=function(e){e.preventDefault(),a.props.login(a.state.username,a.state.password)},a.onChange=function(e){a.setState(Object(p.a)({},e.target.name,e.target.value))},a.state={username:"",password:""},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props.state.isAuthenticated&&this.props.state.currentUser,t=h.a.parse(this.props.location.search).next;return r.a.createElement(n.Fragment,null,e?r.a.createElement(O.a,{to:t}):r.a.createElement(v.Section,{className:this.props.state.isLoading?"opacity-25":""},r.a.createElement(v.Container,null,r.a.createElement("form",{onSubmit:this.submitLogin},r.a.createElement(v.Field,null,r.a.createElement(v.Label,null,"Username"),r.a.createElement(v.Control,null,r.a.createElement(v.Input,{type:"text",onChange:this.onChange,name:"username",placeholder:"Enter username",required:!0}))),r.a.createElement(v.Field,null,r.a.createElement(v.Label,null,"Password"),r.a.createElement(v.Control,null,r.a.createElement(v.Input,{type:"password",onChange:this.onChange,name:"password",placeholder:"Enter password",required:!0}))),r.a.createElement(v.Field,null,r.a.createElement(v.Control,null,r.a.createElement(v.Button,{isColor:"info",type:"submit"},"Submit")))))))}}]),t}(n.Component),C=Object(g.b)(function(e){return{state:e.login}},{login:function(e,t){return function(a){var n=JSON.stringify({username:e,password:t});a({type:"HTTP_CALL_INITIATED"}),w("/api/auth/login/",n,"logged in successfully","LOGIN",a)}}})(N),_=a(32),x=a(59),S=(a(103),function(e){function t(){return Object(l.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidUpdate",value:function(e,t){var a=this.props,n=a.errors,r=a.alert,s=a.messages;n!==e.errors&&(n.msg.name&&r.error("Name: ".concat(n.msg.name.join())),n.msg.email&&r.error("".concat(n.status," : Email: ").concat(n.msg.email.join())),n.msg.non_field_errors&&r.error("".concat(n.status," : ").concat(n.msg.non_field_errors.join())),n.msg.username&&r.error(n.msg.username.join()),n.msg.emptyMessage&&r.error(n.msg.emptyMessage),n.msg.genericError&&r.error("".concat(n.msg.genericError))),s!==e.messages&&(s.msg.loginSuccess&&r.success(s.msg.loginSuccess),s.msg.genericMessage&&r.success(s.msg.genericMessage))}},{key:"render",value:function(){return r.a.createElement(n.Fragment,null)}}]),t}(n.Component)),j=Object(g.b)(function(e){return{errors:e.errors,messages:e.messages}})(Object(_.d)()(S)),L=a(40),k=a(22),T=a(60),I=a(61),F=a(35),R=a(104),A={isAuthenticated:!!R.get("authToken"),currentUser:JSON.parse(localStorage.getItem("currentUser")),isLoading:!1,signupSuccess:!1},M=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:A,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LOGIN":var a=t.payload.token;return R.set("authToken",a,{path:"/",expires:new Date(t.payload.expiry)}),localStorage.setItem("currentUser",JSON.stringify(t.payload.user)),Object(F.a)({},e,{isAuthenticated:!0,currentUser:t.payload.user});case"SIGNUP":return Object(F.a)({},e,{signupSuccess:!e.signupSuccess});case"HTTP_CALL_INITIATED":return Object(F.a)({},e,{isLoading:!0});case"HTTP_CALL_COMPLETED":return Object(F.a)({},e,{isLoading:!1});default:return e}},D={msg:{},status:""},U=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:D,t=arguments.length>1?arguments[1]:void 0;return"ERROR"===t.type?{msg:t.payload.msg,status:t.payload.status}:e},P={msg:{}},q=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:P,t=arguments.length>1?arguments[1]:void 0;return"MESSAGE"===t.type?t.payload:e},H=Object(k.combineReducers)({login:M,errors:U,messages:q}),G=[I.a],J=Object(k.createStore)(H,{},Object(T.composeWithDevTools)(k.applyMiddleware.apply(void 0,G))),B=function(e){function t(){return Object(l.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement(n.Fragment,null,this.props.isLoading&&r.a.createElement("div",{className:"spinner"},r.a.createElement("img",{src:"assets/spinner.gif",alt:"loading"})))}}]),t}(n.Component),z=Object(g.b)(function(e){return{isLoading:e.login.isLoading}})(B),W=a(37),Q=function(e){function t(){return Object(l.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,"Home Page")}}]),t}(n.Component),Y=a(28),K=a(23),V=a(62),$=a(63),X=(a(105),a(29)),Z=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).enterRoom=function(e){e.preventDefault(),a.props.history.push("/room/"+a.state.roomName)},a.roomNameChange=function(e){var t=e.target.value;a.setState(function(e){return{roomName:t}})},a.keyDownHandler=function(e){13===e.keyCode&&a.enterRoom(e)},a.state={roomName:""},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement(Y.Section,{className:"room_enter__section"},r.a.createElement(K.Container,{className:"room__container"},r.a.createElement($.Label,{className:"room__label"},"Enter a room name:"),r.a.createElement(V.Input,{type:"text",className:"room__input",onChange:this.roomNameChange,onKeyDown:this.keyDownHandler}),r.a.createElement(X.Button,{isColor:"primary",className:"large__btn",onClick:this.enterRoom},"Enter")))}}]),t}(n.Component),ee=a(33),te="/app";function ae(e){var t=function(t){function a(){return Object(l.a)(this,a),Object(i.a)(this,Object(u.a)(a).apply(this,arguments))}return Object(m.a)(a,t),Object(c.a)(a,[{key:"render",value:function(){var t,a=this.props.state.isAuthenticated&&this.props.state.currentUser;return r.a.createElement(n.Fragment,null,a?r.a.createElement(e,this.props):r.a.createElement(O.a,{to:"/login?next=".concat(encodeURIComponent((t=this.props.location.pathname+this.props.location.search,t.split(te).join(""))))}))}}]),a}(r.a.Component);return Object(g.b)(function(e){return{state:e.login}},null)(Object(L.b)(t))}var ne=a(31),re=a(38),se=(a(106),a(39)),oe=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";return function(n){"ERROR"===e&&n(b("ERROR",t,a)),n(y("MESSAGE",t))}},le=function(e){function t(e){var a;Object(l.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).sendMessage=function(e){e.preventDefault(),a.state.message?(a.state.socket.send(JSON.stringify({message:a.state.message,room_name:a.state.roomName})),a.setState(function(e){return{message:""}})):a.props.alert("ERROR",{emptyMessage:"please enter a message"})},a.keyDownHandler=function(e){13===e.keyCode&&a.sendMessage(e)};var n=a.props.match.params.roomName;return a.state={socket:null,chatLog:[],message:"",roomName:n,users:[]},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this.props.cookies.get("authToken"),t="https:"===window.location.protocol?"wss:":"ws:",a=window.location.host,n=new WebSocket("".concat(t,"//").concat(a,"/ws/chat/").concat(this.state.roomName,"/")),r=this;n.onopen=function(e){console.log("opened connection...")},n.onmessage=function(e){var t=JSON.parse(e.data);if("INITIAL_STATUS"===t.type)r.setState({users:t.data});else if("MESSAGE"===t.type)r.setState(function(e){return{chatLog:[].concat(Object(ee.a)(e.chatLog),[t.data])}});else if("ONLINE"===t.type){if(t.data.username!==r.props.state.currentUser.username){var a=r.state.users;(a=a.filter(function(e){return e.username!==t.data.username})).push(t.data),r.setState({users:a})}}else if("OFFLINE"===t.type&&t.data.username!==r.props.state.currentUser.username){var n=r.state.users;n=n.filter(function(e){return e.username!==t.data.username}),r.setState({users:n})}},n.onerror=function(e){console.log("socket connection closed unexcpectedly"),console.error(e)},n.onclose=function(e){console.log("closing connection...")},this.setState({socket:n}),E.a.get("/api/message/room/".concat(this.state.roomName,"/"),{headers:{Authorization:"Token ".concat(e)}}).then(function(e){var t=[],a=!0,n=!1,s=void 0;try{for(var o,l=e.data[Symbol.iterator]();!(a=(o=l.next()).done);a=!0){var c=o.value;t.push({key:c.id,message:c.text,username:c.sender_name,created:c.created_on})}}catch(i){n=!0,s=i}finally{try{a||null==l.return||l.return()}finally{if(n)throw s}}r.setState(function(e){return{chatLog:[].concat(Object(ee.a)(e.chatLog),t)}})}).catch(function(e){e.response&&404!==e.response.status&&console.log(e.response.statusText,e.response.statusMessage)})}},{key:"render",value:function(){var e=this,t=this.state.chatLog;return r.a.createElement(Y.Section,{className:"bg-purple-800 h-screen"},r.a.createElement(K.Container,{className:"h-full"},r.a.createElement("div",{className:"flex flex-col h-full"},r.a.createElement("div",{className:"text-3xl text-center p-2 flex-auto room__name w-full border-solid border-2 border-white-500 flex-auto"},"Room Name : ",this.props.match.params.roomName),r.a.createElement("div",{className:"chat_log__flex flex-auto flex flex-row w-full border-solid border-2 border-t-0 border-white-500 flex-auto"},r.a.createElement("div",{className:"chat_log w-10/12 p-2 border-solid border-r-2 border-white-500 flex-auto flex flex-col overflow-y-scroll"},t.map(function(t){return r.a.createElement("div",{key:t.key,className:"p-1"},r.a.createElement("span",{className:"message__username has-text-primary"},t.username===e.props.state.currentUser.username?"You":t.username," ",":"," "),r.a.createElement("span",{className:"message__message break-words"},t.message))})),r.a.createElement("div",{className:"user_list w-2/12 flex-auto flex flex-col"},r.a.createElement("span",{className:"has-text-primary text-center"},"Online Users"),r.a.createElement("ul",null,this.state.users.map(function(e){return r.a.createElement("div",{key:e.username,className:"flex"},r.a.createElement("span",{className:"rounded-full h-3 w-3 mt-2 ml-3 "+("OFFLINE"===e.status?"bg-red-500":"bg-green-500")}),r.a.createElement("li",{className:"text-center has-text-info tooltip room__name ml-4","data-tooltip":"Last Seen at ".concat(e.last_seen)},e.username))})))),r.a.createElement(K.Container,{className:"mt-4"},r.a.createElement(ne.Field,null,r.a.createElement(se.TextArea,{isSize:"medium",placeholder:"Enter message",onChange:function(t){var a=t.target.value;e.setState(function(e){return{message:a}})},onKeyDown:this.keyDownHandler,className:"resize-none shadow rounded border max-w-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500",value:this.state.message})),r.a.createElement(ne.Field,null,r.a.createElement(re.Control,null,r.a.createElement(X.Button,{isColor:"primary",onClick:this.sendMessage},r.a.createElement("span",{className:"has-text-info"}," Submit "))))))))}}]),t}(n.Component),ce=Object(g.b)(null,{alert:oe})(ae(le)),ie=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).onChange=function(e){a.setState(Object(p.a)({},e.target.name,e.target.value))},a.submitSignup=function(e){return e.preventDefault(),a.state.password!==a.state.password2?a.setState({formErrors:{passwordMismatch:"Password and Confirm Password must match"}}):a.props.signup(a.state.username,a.state.password,a.state.first_name,a.state.last_name,a.state.security_question1,a.state.security_answer1,a.state.security_question2,a.state.security_answer2)},a.state={username:"",password:"",password2:"",first_name:"",last_name:"",security_question1:"",security_question2:"",security_answer1:"",security_answer2:"",formErrors:{}},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props.state.signupSuccess,t=this.props.state.isAuthenticated,a="passwordMismatch"in this.state.formErrors;return t?r.a.createElement(O.a,{to:"/"}):r.a.createElement(n.Fragment,null,e?r.a.createElement(O.a,{to:"/login/"}):r.a.createElement(v.Section,{className:this.props.state.isLoading?"opacity-25":""},r.a.createElement("form",{onSubmit:this.submitSignup},r.a.createElement(v.Field,null,r.a.createElement(v.Label,null,"Username"),r.a.createElement(v.Control,null,r.a.createElement(v.Input,{type:"text",onChange:this.onChange,name:"username",placeholder:"Enter username",required:!0}))),r.a.createElement(v.Field,null,r.a.createElement(v.Label,null,"Password"),r.a.createElement(v.Control,null,r.a.createElement(v.Input,{type:"password",onChange:this.onChange,name:"password",placeholder:"Enter password",required:!0}))),r.a.createElement(v.Field,null,r.a.createElement(v.Label,null,"Confirm Password"),r.a.createElement(v.Control,null,r.a.createElement(v.Input,{type:"password",onChange:this.onChange,name:"password2",placeholder:"Re-Enter password",required:!0,isColor:a?"danger":""})),r.a.createElement(v.Help,{className:a?"block":"hidden",isColor:a?"danger":""},"Password and Confirm Password must match")),r.a.createElement(v.Field,null,r.a.createElement(v.Label,null,"First Name"),r.a.createElement(v.Control,null,r.a.createElement(v.Input,{type:"text",onChange:this.onChange,name:"first_name",placeholder:"Enter First Name",required:!0}))),r.a.createElement(v.Field,null,r.a.createElement(v.Label,null,"Last Name"),r.a.createElement(v.Control,null,r.a.createElement(v.Input,{type:"text",onChange:this.onChange,name:"last_name",placeholder:"Enter Last Name",required:!0}))),r.a.createElement(v.Field,null,r.a.createElement(v.Label,null,"Security Question 1"),r.a.createElement(v.Control,null,r.a.createElement(v.Input,{type:"text",onChange:this.onChange,name:"security_question1",placeholder:"Enter Security Question",required:!0})),r.a.createElement(v.Help,{isColor:"info"},"Since we are not taking your email, we recommend you to set security questions and remember the answers")),r.a.createElement(v.Field,null,r.a.createElement(v.Label,null,"Security Answer 1"),r.a.createElement(v.Control,null,r.a.createElement(v.Input,{type:"text",onChange:this.onChange,name:"security_answer1",placeholder:"Enter Answer",required:!0}))),r.a.createElement(v.Field,null,r.a.createElement(v.Label,null,"Security Question 2"),r.a.createElement(v.Control,null,r.a.createElement(v.Input,{type:"text",onChange:this.onChange,name:"security_question2",placeholder:"Enter Security Question",required:!0}))),r.a.createElement(v.Field,null,r.a.createElement(v.Label,null,"Security Answer 2"),r.a.createElement(v.Control,null,r.a.createElement(v.Input,{type:"text",onChange:this.onChange,name:"security_answer2",placeholder:"Enter Answer",required:!0}))),r.a.createElement(v.Field,null,r.a.createElement(v.Control,null,r.a.createElement(v.Button,{isColor:"info",type:"submit"},"Submit"))))))}}]),t}(n.Component),ue=Object(g.b)(function(e){return{state:e.login}},{signup:function(e,t,a,n,r,s,o,l){return function(c){var i=JSON.stringify({username:e,password:t,first_name:a,last_name:n,security_question1:r,security_answer1:s,security_question2:o,security_answer2:l});c({type:"HTTP_CALL_INITIATED"}),w("/api/auth/register/",i,"signup successful. please login now","SIGNUP",c)}}})(ie),me=function(e){function t(e){var a;Object(l.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).sendMessage=function(e){e.preventDefault(),a.state.message?(a.state.socket.send(JSON.stringify({message:a.state.message,to:a.state.peerName})),a.setState(function(e){return{message:""}})):a.props.alert("ERROR",{emptyMessage:"please enter a message"})},a.keyDownHandler=function(e){13===e.keyCode&&a.sendMessage(e)};var n=a.props.match.params.peerName;return a.state={socket:null,chatLog:[],message:"",peerName:n,peer:{}},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this.props.cookies.get("authToken"),t="https:"===window.location.protocol?"wss:":"ws:",a=window.location.host,n=new WebSocket("".concat(t,"//").concat(a,"/ws/p2p/")),r=this;n.onopen=function(e){console.log("opened connection...")},n.onmessage=function(e){console.log("message received : ".concat(e.data));var t=JSON.parse(e.data);if("MESSAGE"===t.type&&t.from===r.state.peerName&&t.to===r.props.state.currentUser.username||"MESSAGE"===t.type&&t.from===r.props.state.currentUser.username&&t.to===r.state.peerName)r.setState(function(e){return{chatLog:[].concat(Object(ee.a)(e.chatLog),[t.data])}});else if("ONLINE"===t.type&&t.data.username===r.state.peerName&&t.data.username!==r.props.state.currentUser.username){var a=t.data;r.setState({peer:a})}else"OFFLINE"===t.type&&t.data.username===r.state.peerName&&t.data.username!==r.props.state.currentUser.username&&r.setState({peer:{}})},n.onerror=function(e){console.log("socket connection closed unexcpectedly"),console.error(e)},n.onclose=function(e){console.log("closing connection...")},this.setState({socket:n}),E.a.get("/api/message/room/inbox/",{headers:{Authorization:"Token ".concat(e)}}).then(function(e){var t=[],a=!0,n=!1,s=void 0;try{for(var o,l=e.data[Symbol.iterator]();!(a=(o=l.next()).done);a=!0){var c=o.value;t.push({key:c.id,message:c.text,username:c.sender_name,created:c.created_on})}}catch(i){n=!0,s=i}finally{try{a||null==l.return||l.return()}finally{if(n)throw s}}r.setState(function(e){return{chatLog:[].concat(Object(ee.a)(e.chatLog),t)}})}).catch(function(e){e.response&&404!==e.response.status&&console.log(e.response.statusText,e.response.statusMessage)})}},{key:"render",value:function(){var e=this,t=this.state.chatLog;return r.a.createElement(Y.Section,{className:"bg-purple-800 h-screen"},r.a.createElement(K.Container,{className:"h-full"},r.a.createElement("div",{className:"flex flex-col h-full"},r.a.createElement("div",{className:"text-3xl text-center p-2 flex-auto room__name w-full border-solid border-2 border-white-500 flex-auto"},"You are chatting with : ",this.state.peerName),r.a.createElement("div",{className:"chat_log__flex flex-auto flex flex-row w-full border-solid border-2 border-t-0 border-white-500 flex-auto"},r.a.createElement("div",{className:"chat_log w-10/12 p-2 border-solid border-r-2 border-white-500 flex-auto flex flex-col overflow-y-scroll"},t.map(function(t){return r.a.createElement("div",{key:t.key,className:"p-1"},r.a.createElement("span",{className:"message__username has-text-primary"},t.username===e.props.state.currentUser.username?"You":t.username," :"," "),r.a.createElement("span",{className:"message__message break-words"},t.message))})),r.a.createElement("div",{className:"user_list w-2/12 flex-auto flex flex-col"},r.a.createElement("span",{className:"has-text-primary text-center"},"Online Users"),Object.entries(this.state.peer).length>0&&r.a.createElement("ul",{className:"flex"},r.a.createElement("span",{className:"rounded-full h-3 w-3 mt-2 ml-3 "+("OFFLINE"===this.state.peer.status?"bg-red-500":"bg-green-500")}),r.a.createElement("li",{className:"text-center has-text-info tooltip room__name ml-4","data-tooltip":"Last Seen at ".concat(this.state.peer.last_seen)},this.state.peer.username)))),r.a.createElement(K.Container,{className:"mt-4"},r.a.createElement(ne.Field,null,r.a.createElement(se.TextArea,{isSize:"medium",placeholder:"Enter message",onChange:function(t){var a=t.target.value;e.setState(function(e){return{message:a}})},onKeyDown:this.keyDownHandler,className:"resize-none shadow rounded border max-w-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500",value:this.state.message})),r.a.createElement(ne.Field,null,r.a.createElement(re.Control,null,r.a.createElement(X.Button,{isColor:"primary",onClick:this.sendMessage},r.a.createElement("span",{className:"has-text-info"}," Submit "))))))))}}]),t}(n.Component),pe=Object(g.b)(null,{alert:oe})(ae(me)),de={position:_.b.BOTTOM_CENTER,timeout:5e3,offset:"30px",transition:_.c.SCALE},he=function(e){return r.a.createElement(n.Fragment,null,r.a.createElement(z,null),r.a.createElement(j,null),r.a.createElement(ue,e))},ge=function(e){return r.a.createElement(n.Fragment,null,r.a.createElement(z,null),r.a.createElement(j,null),r.a.createElement(C,e))},fe=function(e){return r.a.createElement(n.Fragment,null,r.a.createElement(j,null),r.a.createElement(ce,e))},Ee=function(e){return r.a.createElement(n.Fragment,null,r.a.createElement(j,null),r.a.createElement(pe,e))},be=function(e){function t(){return Object(l.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement(g.a,{store:J},r.a.createElement(L.a,null,r.a.createElement(_.a,Object.assign({template:x.a},de),r.a.createElement(W.a,{basename:te},r.a.createElement(O.d,null,r.a.createElement(O.b,{path:"/",exact:!0,component:Q}),r.a.createElement(O.b,{path:"/signup",component:he}),r.a.createElement(O.b,{path:"/login",component:ge}),r.a.createElement(O.b,{path:"/room",exact:!0,component:Z}),r.a.createElement(O.b,{path:"/room/:roomName",component:fe}),r.a.createElement(O.b,{path:"/p2p/:peerName",component:Ee}))))))}}]),t}(n.Component);a(107),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var ye=a(64);a.n(ye).a.config(Object({NODE_ENV:"production",PUBLIC_URL:""}).REACT_APP_SENTRY_URL).install();var we=document.getElementById("root");o.a.render(r.a.createElement(be,null),we),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},65:function(e,t,a){e.exports=a(113)}},[[65,1,2]]]);
//# sourceMappingURL=main.71cf2c9d.chunk.js.map