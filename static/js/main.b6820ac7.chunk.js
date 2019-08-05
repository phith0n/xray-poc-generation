(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{186:function(e,t,a){e.exports=a(391)},192:function(e,t,a){},391:function(e,t,a){"use strict";a.r(t);var n=a(1),l=a.n(n),r=a(8),s=a.n(r),u=(a(191),a(192),a(193),a(183)),i=(a(130),a(44)),c=(a(82),a(34)),o=(a(131),a(27)),d=(a(132),a(36)),h=(a(105),a(32)),p=(a(393),a(103)),m=(a(166),a(78)),y=a(65),f=(a(203),a(182)),v=a(37),b=a(48),g=a(63),E=a(59),O=a(24),k=a(62),H=(a(205),a(80)),C=a(49),j=a.n(C),w=a(167),x=a.n(w),I=a(168),R=a.n(I),N=a(169),V=a.n(N),S=(a(392),a(181)),T=(a(234),a(179)),B=(a(394),a(128)),P=(a(238),a(10)),A=function(e){function t(e){var a;return Object(v.a)(this,t),(a=Object(g.a)(this,Object(E.a)(t).call(this,e))).changeInputValue=a.changeInputValue.bind(Object(O.a)(a)),a}return Object(k.a)(t,e),Object(b.a)(t,[{key:"changeInputValue",value:function(e){this.props.updateHandler(this.props.header.index,e.target.name,e.target.value)}},{key:"render",value:function(){var e=this;return l.a.createElement(l.a.Fragment,null,l.a.createElement(h.a.Group,{compact:!0,style:{width:"90%"}},l.a.createElement(h.a,{style:{width:"20%"},name:"key",value:this.props.header.key,onChange:this.changeInputValue,placeholder:"User-Agent"}),l.a.createElement(h.a,{style:{width:"80%"},name:"value",value:this.props.header.value,onChange:this.changeInputValue,placeholder:"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36"})),this.props.showDeleteButton?l.a.createElement(P.a,{className:"dynamic-delete-button color-red",type:"minus-circle-o",style:{color:"#ff6868"},onClick:function(t){return e.props.deleteHandler(e.props.header.index)}}):null,this.props.showAddButton?l.a.createElement(P.a,{className:"dynamic-delete-button color-grey",type:"plus-circle-o",onClick:this.props.addHandler}):null)}}]),t}(l.a.Component),z=0,G=function e(){Object(v.a)(this,e),this.index=++z,this.key="",this.value=""};function $(e,t){for(var a in e)if(e[a].index===t)return a;return-1}var D=function(e){function t(e){var a;return Object(v.a)(this,t),(a=Object(g.a)(this,Object(E.a)(t).call(this,e))).state={pathHelp:{status:"success",help:""},headersHelp:{status:"success",help:""}},a.changeInputValue=a.changeInputValue.bind(Object(O.a)(a)),a.changeInputValueByName=a.changeInputValueByName.bind(Object(O.a)(a)),a.addHeader=a.addHeader.bind(Object(O.a)(a)),a.updateHeader=a.updateHeader.bind(Object(O.a)(a)),a.deleteHeader=a.deleteHeader.bind(Object(O.a)(a)),a}return Object(k.a)(t,e),Object(b.a)(t,[{key:"checkRule",value:function(e,t){var a;if("path"===e)a=t.startsWith("/")?{status:"success",help:""}:{status:"error",help:"path\u9700\u8981\u4ee5/\u5f00\u5934"},this.setState({pathHelp:a});else if("headers"===e){var n={status:"success",help:""},l=!0,r=!1,s=void 0;try{for(var u,i=t[Symbol.iterator]();!(l=(u=i.next()).done);l=!0){u.value.key||(n={status:"error",help:"HTTP\u5934Key\u4e0d\u80fd\u4e3a\u7a7a"})}}catch(c){r=!0,s=c}finally{try{l||null==i.return||i.return()}finally{if(r)throw s}}this.setState({headersHelp:n})}}},{key:"changeInputValue",value:function(e){this.checkRule(e.target.name,e.target.value),this.props.updateHandler(this.props.rule.index,e.target.name,e.target.value)}},{key:"changeInputValueByName",value:function(e,t){this.checkRule(e,t),this.props.updateHandler(this.props.rule.index,e,t)}},{key:"addHeader",value:function(){var e=j()(this.props.rule.headers,{$push:[new G]});this.changeInputValueByName("headers",e)}},{key:"updateHeader",value:function(e,t,a){var n=$(this.props.rule.headers,e);if(n>=0){var l=j()(this.props.rule.headers,Object(y.a)({},n,Object(y.a)({},t,{$set:a})));this.changeInputValueByName("headers",l)}}},{key:"deleteHeader",value:function(e){var t=$(this.props.rule.headers,e);if(t>=0){var a=j()(this.props.rule.headers,{$splice:[[t,1]]});this.changeInputValueByName("headers",a)}}},{key:"render",value:function(){var e=this;return l.a.createElement(S.a,{title:"\u89c4\u5219\uff08Rule\uff09",size:"small",className:"rule-card",style:{marginBottom:"24px"},extra:l.a.createElement(c.a.Group,{size:"small"},l.a.createElement(c.a,{onClick:function(t){return e.props.deleteHandler(e.props.rule.index)},disabled:this.props.ruleSize<=1},"\u5220\u9664Rule"),l.a.createElement(c.a,{onClick:this.props.addHandler},"\u589e\u52a0\u4e00\u4e2aRule"))},l.a.createElement(d.a.Item,{label:"\u8bf7\u6c42\u65b9\u6cd5",className:"rule-item"},l.a.createElement(B.a,{defaultValue:this.props.rule.method,style:{width:120},name:"method",onChange:function(t){return e.changeInputValueByName("method",t)}},["HEAD","GET","POST","PUT","PATCH","DELETE","CONNECT","OPTIONS","TRACE"].map(function(e,t){return l.a.createElement(B.a.Option,{value:e,key:e},e)}))),l.a.createElement(d.a.Item,{label:"\u8bf7\u6c42\u8def\u5f84",className:"rule-item",validateStatus:this.state.pathHelp.status,help:this.state.pathHelp.help},l.a.createElement(h.a,{placeholder:"/path/to/request",type:"text",name:"path",value:this.props.rule.path,onChange:this.changeInputValue})),l.a.createElement(d.a.Item,{label:"\u8bf7\u6c42\u5934",className:"rule-item",validateStatus:this.state.headersHelp.status,help:this.state.headersHelp.help},this.props.rule.headers.map(function(t,a){return l.a.createElement(A,{key:t.index,header:t,showAddButton:a===e.props.rule.headers.length-1,showDeleteButton:e.props.rule.headers.length>1,addHandler:e.addHeader,updateHandler:e.updateHeader,deleteHandler:e.deleteHeader})})),l.a.createElement(d.a.Item,{label:"\u8bf7\u6c42\u4f53",className:"rule-item"},l.a.createElement(h.a.TextArea,{autosize:{minRows:2},name:"body",value:this.props.rule.body,onChange:this.changeInputValue})),l.a.createElement(d.a.Item,{label:"\u5141\u8bb8\u8df3\u8f6c",className:"rule-item"},l.a.createElement(T.a,{checked:this.props.rule.followRedirects,name:"allowRedirects",onChange:function(t){return e.changeInputValueByName("followRedirects",t)}})),l.a.createElement(d.a.Item,{label:"CEL\u8868\u8fbe\u5f0f",className:"rule-item"},l.a.createElement(h.a,{placeholder:"status==200",type:"text",value:this.props.rule.expression,name:"expression",onChange:this.changeInputValue})),l.a.createElement(d.a.Item,{label:"\u63d0\u53d6\u89c4\u5219",className:"rule-item"},l.a.createElement(h.a,{placeholder:"",type:"text",value:this.props.rule.search,name:"search",onChange:this.changeInputValue})))}}]),t}(l.a.Component),W=0,K=function(){function e(){Object(v.a)(this,e),this.index=++W,this.method="GET",this.path="",this.headers=[new G],this.body="",this.followRedirects=!0,this.expression="",this.search=""}return Object(b.a)(e,[{key:"addHeader",value:function(){}}]),e}(),L=H.a.Header,M=H.a.Content,F=H.a.Footer,J=function(e){function t(e){var a;return Object(v.a)(this,t),(a=Object(g.a)(this,Object(E.a)(t).call(this,e))).state={name:"poc-yaml-",rules:[new K],detail:{},poc:""},a.updateRule=a.updateRule.bind(Object(O.a)(a)),a.generatePOC=a.generatePOC.bind(Object(O.a)(a)),a.addRule=a.addRule.bind(Object(O.a)(a)),a.deleteRule=a.deleteRule.bind(Object(O.a)(a)),a.notify=a.notify.bind(Object(O.a)(a)),a}return Object(k.a)(t,e),Object(b.a)(t,[{key:"componentDidMount",value:function(){var e=this;new V.a("#copy-btn").on("success",function(t){e.notify("\u590d\u5236\u6210\u529f","POC\u5185\u5bb9\u5df2\u6210\u529f\u590d\u5236\u5230\u526a\u5207\u677f")})}},{key:"notify",value:function(e,t){f.a.success({message:e,description:t,duration:3})}},{key:"updateRule",value:function(e,t,a){var n=$(this.state.rules,e);if(n>=0){var l=j()(this.state.rules,Object(y.a)({},n,Object(y.a)({},t,{$set:a})));this.setState({rules:l})}}},{key:"deleteRule",value:function(e){var t=$(this.state.rules,e);if(t>=0){var a=j()(this.state.rules,{$splice:[[t,1]]});this.setState({rules:a})}}},{key:"generatePOC",value:function(){var e={name:this.state.name,rules:R()(this.state.rules)},t=!0,a=!1,n=void 0;try{for(var l,r=e.rules[Symbol.iterator]();!(t=(l=r.next()).done);t=!0){var s=l.value;delete s.index;var u={},i=!0,c=!1,o=void 0;try{for(var d,h=s.headers[Symbol.iterator]();!(i=(d=h.next()).done);i=!0){var p=d.value;p.key&&(u[p.key]=p.value)}}catch(y){c=!0,o=y}finally{try{i||null==h.return||h.return()}finally{if(c)throw o}}Object.keys(u).length>0?s.headers=u:delete s.headers,s.body.length||delete s.body,s.path.length||delete s.path,s.search.length||delete s.search}}catch(y){a=!0,n=y}finally{try{t||null==r.return||r.return()}finally{if(a)throw n}}var m=x.a.safeDump(e);this.setState({poc:m})}},{key:"addRule",value:function(){var e=j()(this.state.rules,{$push:[new K]});this.setState({rules:e})}},{key:"render",value:function(){var e=this;return l.a.createElement(H.a,{className:"layout"},l.a.createElement(L,null,l.a.createElement("div",{className:"logo"},l.a.createElement("span",{role:"img","aria-label":"dna","aria-hidden":"true"},"\ud83e\uddec")," XRay POC Generation"),l.a.createElement(m.b,{theme:"dark",mode:"horizontal",defaultSelectedKeys:["2"],style:{lineHeight:"64px"}})),l.a.createElement(M,{style:{padding:"0 50px"}},l.a.createElement(p.a,{style:{margin:"16px 0"}},l.a.createElement(p.a.Item,null,"\u9996\u9875"),l.a.createElement(p.a.Item,null,"POC\u751f\u6210")),l.a.createElement("div",{style:{background:"#fff",padding:24,minHeight:280}},l.a.createElement(i.a,{gutter:16,type:"flex"},l.a.createElement(o.a,{span:12},l.a.createElement(d.a,{layout:"horizontal",labelAlign:"left"},l.a.createElement(d.a.Item,Object.assign({label:"POC\u540d"},{labelCol:{span:2},wrapperCol:{span:22}}),l.a.createElement(h.a,{placeholder:"\u7531\u6570\u5b57\u3001\u5b57\u6bcd\u3001\u77ed\u6a2a\u7ebf\u7ec4\u6210",type:"text",value:this.state.name,onChange:function(t){return e.setState({name:t.target.value})}})),this.state.rules.map(function(t,a){return l.a.createElement(D,{key:t.index,rule:t,ruleSize:e.state.rules.length,updateHandler:e.updateRule,addHandler:e.addRule,deleteHandler:e.deleteRule})}))),l.a.createElement(o.a,{span:12,style:{paddingTop:"4px"}},l.a.createElement(u.a,{offsetTop:8},l.a.createElement(h.a.TextArea,{autosize:{minRows:20},placeholder:"\u751f\u6210POC\u5185\u5bb9",value:this.state.poc,id:"poc-detail",readOnly:!0,style:{marginBottom:"15px"}}),l.a.createElement(i.a,{justify:"end",type:"flex"},l.a.createElement(c.a,{type:"primary",size:"default",onClick:this.generatePOC,className:"br"},"\u751f\u6210"),l.a.createElement(c.a,{type:"dashed",icon:"copy",id:"copy-btn","data-clipboard-text":this.state.poc},"\u590d\u5236POC"))))))),l.a.createElement(F,{style:{textAlign:"center"}},"\xa92019 XRay POC Generation"))}}]),t}(l.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(l.a.createElement(J,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[186,1,2]]]);