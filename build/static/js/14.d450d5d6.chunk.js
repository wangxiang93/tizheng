(this["webpackJsonp_react-admin"]=this["webpackJsonp_react-admin"]||[]).push([[14],{1001:function(e,t,n){var a={"./index.js":995,"./system.js":1002};function c(e){var t=r(e);return n(t)}function r(e){if(!n.o(a,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return a[e]}c.keys=function(){return Object.keys(a)},c.resolve=r,e.exports=c,c.id=1001},1002:function(e,t,n){"use strict";n.r(t);var a=n(5),c=n.n(a),r=n(11),i=(n(511),n(370)),l=n(151),u=n(9);t.default={menuTarget:[{value:"menu",label:"\u5e94\u7528\u83dc\u5355"},{value:"qiankun",label:"\u4e7e\u5764\u5b50\u5e94\u7528"},{value:"iframe",label:"iframe\u5185\u5d4c\u7b2c\u4e09\u65b9"},{value:"_self",label:"\u5f53\u524d\u7a97\u53e3\u6253\u5f00\u7b2c\u4e09\u65b9"},{value:"_blank",label:"\u65b0\u5f00\u7a97\u53e3\u6253\u5f00\u7b2c\u4e09\u65b9"}],yesNo:[{value:!0,label:"\u662f",tag:Object(u.jsx)(i.a,{color:"green",children:"\u662f"})},{value:!1,label:"\u5426",tag:Object(u.jsx)(i.a,{color:"red",children:"\u5426"})}],enabled:[{value:!0,label:"\u542f\u7528",tag:Object(u.jsx)(i.a,{color:"green",children:"\u542f\u7528"})},{value:!1,label:"\u7981\u7528",tag:Object(u.jsx)(i.a,{color:"red",children:"\u7981\u7528"})}],sex:[{value:"1",label:"\u7537"},{value:"2",label:"\u5973"},{value:"3",label:"\u672a\u77e5"}],system:function(){return Object(r.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l.b.get("/menu/queryTopMenus");case 2:return t=e.sent,e.abrupt("return",t.map((function(e){return{value:e.id,label:e.title,meta:e}})));case 4:case"end":return e.stop()}}),e)})))()},action:function(){return[{value:"add",label:"\u6dfb\u52a0"}]},get demo(){return[]}}},982:function(e,t,n){"use strict";n.r(t);n(310);var a=n(171),c=(n(107),n(39)),r=n(5),i=n.n(r),l=n(11),u=n(26),s=(n(369),n(232)),o=n(49),b=n(0),j=n(15),d=n(170),O=(n(995),n(996),n(998)),f=(n(997),n(999)),m=n(9),x=Object(d.a)({modal:{title:function(e){var t;return null!==e&&void 0!==e&&null!==(t=e.record)&&void 0!==t&&t.isDetail?"\u67e5\u770b\u90e8\u95e8":e.isEdit?"\u7f16\u8f91\u90e8\u95e8":"\u65b0\u589e\u90e8\u95e8"},width:"40%",top:100}})((function(e){var t=e.record,n=e.isEdit,a=e.onOk,r=e.onCancel,d=Object(b.useState)(!1),x=Object(o.a)(d,2),p=x[0],h=x[1],v=s.a.useForm(),g=Object(o.a)(v,1)[0],k=null===t||void 0===t?void 0:t.isDetail;Object(b.useMemo)((function(){return{id:null===t||void 0===t?void 0:t.id}}),[t]);g.setFieldsValue(t);var y=e.ajax.usePost("/depart/save",null,{setLoading:h,successTip:"\u521b\u5efa\u6210\u529f\uff01"}).run,w=e.ajax.usePost("/depart/update",null,{setLoading:h,successTip:"\u4fee\u6539\u6210\u529f\uff01"}).run,C=(e.ajax.useGet("/user/getOneUser").run,Object(b.useCallback)(function(){var e=Object(l.a)(i.a.mark((function e(t){var c;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(c=Object(u.a)({},t),console.log(t,"values"),!n){e.next=7;break}return e.next=5,w(c);case 5:e.next=9;break;case 7:return e.next=9,y(c);case 9:a();case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[n,w,y,a])),S=k,E={labelCol:{flex:"140px"},disabled:S};return Object(m.jsx)(s.a,{form:g,name:"roleEdit",onFinish:C,initialValues:{},children:Object(m.jsxs)(j.k,{width:300,loading:p,okText:"\u4fdd\u5b58",okHtmlType:"submit",cancelText:"\u53d6\u6d88",onCancel:function(){return r()},footer:S?Object(m.jsx)(c.a,{onClick:r,children:"\u5173\u95ed"}):void 0,children:[n?Object(m.jsx)(j.e,{hidden:!0,name:"id"}):null,Object(m.jsxs)(O.a,{gutter:24,children:[Object(m.jsx)(f.a,{span:24,children:Object(m.jsx)(j.e,Object(u.a)(Object(u.a)({},E),{},{label:"\u90e8\u95e8\u540d\u79f0",name:"bumengmingcheng",required:!0,noSpace:!0}))}),Object(m.jsx)(f.a,{span:24,children:Object(m.jsx)(j.e,Object(u.a)(Object(u.a)({},E),{},{label:"\u90e8\u95e8\u7f16\u53f7",name:"bumengbianhao",required:!0,noSpace:!0}))}),Object(m.jsx)(f.a,{span:24,children:Object(m.jsx)(j.e,Object(u.a)(Object(u.a)({},E),{},{label:"\u7236\u7ea7\u90e8\u95e8",name:"parentid",noSpace:!0}))}),Object(m.jsx)(f.a,{span:24,children:Object(m.jsx)(j.e,Object(u.a)(Object(u.a)({},E),{},{label:"\u5907\u6ce8",name:"beizhu",noSpace:!0}))})]})]})})}));t.default=Object(d.a)({path:"/system/depart"})((function(e){var t=Object(b.useState)(!1),n=Object(o.a)(t,2),r=n[0],d=n[1],O=Object(b.useState)(1),f=Object(o.a)(O,2),p=f[0],h=f[1],v=Object(b.useState)(20),g=Object(o.a)(v,2),k=g[0],y=(g[1],Object(b.useState)({})),w=Object(o.a)(y,2),C=w[0],S=w[1],E=Object(b.useState)(!1),T=Object(o.a)(E,2),F=T[0],q=T[1],D=Object(b.useState)(null),L=Object(o.a)(D,2),N=L[0],_=L[1],z=s.a.useForm(),I=Object(o.a)(z,1)[0],M=Object(b.useMemo)((function(){return Object(u.a)(Object(u.a)({},C),{},{pageNum:p,pageSize:k})}),[C,p,k]),V=Object(b.useCallback)((function(){S(I.getFieldsValue())}),[I]),P=e.ajax.useGet("/depart/queryListByPage",M,[M],{setLoading:d,formatResult:function(e){return{dataSource:(null===e||void 0===e?void 0:e.content)||[],total:(null===e||void 0===e?void 0:e.totalElements)||0}}}).data,U=(P=void 0===P?{}:P).dataSource,G=(P.total,e.ajax.useDel("/depart/:id",null,{setLoading:d,successTip:"\u5220\u9664\u6210\u529f\uff01"}).run),H=[{title:"\u90e8\u95e8\u540d\u79f0",dataIndex:"bumengmingcheng"},{title:"\u90e8\u95e8\u7f16\u53f7",dataIndex:"bumengbianhao"},{title:"\u5907\u6ce8",dataIndex:"beizhu"},{title:"\u7236\u7ea7\u90e8\u95e8",dataIndex:"parentName"},{title:"\u64cd\u4f5c",key:"operator",width:200,render:function(e,t){var n=t.id,a=t.zhuantimingcheng,c=[{label:"\u67e5\u770b",onClick:function(){return _(Object(u.a)(Object(u.a)({},t),{},{isDetail:!0}))||q(!0)}},{label:"\u4fee\u6539",onClick:function(){return _(t)||q(!0)}},{label:"\u914d\u7f6e",onClick:function(){return _(t)||q(!0)}},{label:"\u5220\u9664",color:"red",confirm:{title:"\u60a8\u786e\u5b9a\u5220\u9664\u300c".concat(a,"\u300d\u5417\uff1f"),onConfirm:function(){return J(n)}}}];return Object(m.jsx)(j.l,{items:c})}}],J=Object(b.useCallback)(function(){var e=Object(l.a)(i.a.mark((function e(t){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,G(t);case 2:V();case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[G,V]),K={style:{width:300}},R=Object(b.useState)([]),B=Object(o.a)(R,2),Z=B[0],A=B[1],Q=Object(b.useCallback)((function(e){A(e)}),[]);return Object(m.jsxs)(j.m,{loading:r,children:[Object(m.jsx)(j.o,{children:Object(m.jsxs)(s.a,{name:"user",layout:"inline",form:I,initialValues:{position:"01"},onFinish:function(e){return h(1)||S(e)},children:[Object(m.jsx)(j.e,Object(u.a)(Object(u.a)({},K),{},{label:"\u90e8\u95e8\u540d\u79f0",name:"bumengmingcheng"})),Object(m.jsx)(j.e,Object(u.a)(Object(u.a)({},K),{},{label:"\u90e8\u95e8\u7f16\u53f7",name:"bumengbianhao"})),Object(m.jsx)(j.e,{children:Object(m.jsxs)(a.b,{children:[Object(m.jsx)(c.a,{type:"primary",htmlType:"submit",children:"\u67e5\u8be2"}),Object(m.jsx)(c.a,{onClick:function(){return I.resetFields()},children:"\u91cd\u7f6e"})]})})]})}),Object(m.jsxs)(j.q,{children:[Object(m.jsx)(c.a,{type:"primary",onClick:function(){return _(null)||q(!0)},children:"\u65b0\u589e\u90e8\u95e8"}),Object(m.jsx)(c.a,{danger:!0,onClick:function(){return _(null)||q(!0)},children:"\u6279\u91cf\u5220\u9664"})]}),Object(m.jsx)(j.p,{pageNum:p,pageSize:k,fitHeight:!0,dataSource:U,columns:H,rowSelection:{selectedRowKeys:Z,onChange:Q},rowKey:"id"}),Object(m.jsx)(x,{visible:F,record:N,isEdit:!!N,onOk:function(){q(!1),V()},onCancel:function(){return q(!1)}})]})}))},995:function(e,t,n){"use strict";n.r(t);var a=n(49),c=n(15),r={},i=n(1001);i.keys().forEach((function(e){if(!["./index.js"].includes(e)){var t=i(e).default;Object.entries(t).forEach((function(t){var n=Object(a.a)(t,2),c=n[0],i=n[1];if(c in r)throw Error("".concat(e," \u6587\u4ef6\u4e2d key \u300c").concat(c,"\u300d\u5df2\u88ab\u4f7f\u7528\uff01\u8bf7\u66f4\u6362\uff01"));r[c]=i}))}})),Object(c.Z)(r,5e3),t.default=r},996:function(e,t,n){"use strict";n(35),n(510)},997:function(e,t,n){"use strict";n(35),n(510)},998:function(e,t,n){"use strict";var a=n(484);t.a=a.a},999:function(e,t,n){"use strict";var a=n(288);t.a=a.a}}]);
//# sourceMappingURL=14.d450d5d6.chunk.js.map