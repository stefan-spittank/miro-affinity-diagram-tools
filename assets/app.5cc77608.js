var P=Object.defineProperty,T=Object.defineProperties;var $=Object.getOwnPropertyDescriptors;var y=Object.getOwnPropertySymbols;var z=Object.prototype.hasOwnProperty,D=Object.prototype.propertyIsEnumerable;var h=(o,t,r)=>t in o?P(o,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):o[t]=r,v=(o,t)=>{for(var r in t||(t={}))z.call(t,r)&&h(o,r,t[r]);if(y)for(var r of y(t))D.call(t,r)&&h(o,r,t[r]);return o},E=(o,t)=>T(o,$(t));import{g as L}from"./miroInstance.b01b0cd8.js";import{s as l,r as e,R as O}from"./vendor.238d59ea.js";import{w as d,a as R}from"./interviewStickerTools.53507176.js";l.input`
  // font-family: var(--body-font);
  // font-size: 1rem;
  // padding: 0.25rem;
  // border-radius: 0;
  // border: 1px solid lightgrey;
  width: 100%;
`;l.textarea`
  width: 100%;
  height: 2rem;
  // font-family: var(--body-font);
  // font-size: 1rem;
  // padding: 0.25rem;
  // border-radius: 0;
  // border: 1px solid lightgrey;
`;const j=l.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`,B=l.div`
  display: flex;
  flex-direction: column;
`;l.button`
  font-family: var(--body-font);
  font-size: 1rem;
  padding: 14px;
  border-color: rgba(66, 98, 255, 1);
  border-color: var(--blue700);
  background-color: rgba(66, 98, 255, 1);
  background-color: var(--blue700);
  border-radius: var(--radiusM);
`;const F=l.div`
  max-height: 100%;
  overflow-y: auto;
`,W=l.div`
  background-color: #fff9b8;
  border-radius: 4px;
  padding: 0.5rem;
  margin-bottom: 1.5rem;
  margin-right: 0.5rem;
`,k=(o,t)=>t?`${t}-${o+1}`:`#${o+1}`,K=o=>t=>{t instanceof KeyboardEvent&&t.key.toLowerCase()=="escape"&&o.board.ui.closeModal()},q=()=>{const[o,t]=e.exports.useState(""),[r,C]=e.exports.useState(""),[x,u]=e.exports.useState(!1),[c,f]=e.exports.useState([]);e.exports.useEffect(()=>{f(o?o.split(/\r?\n/).filter(s=>s!==""):[])},[o,f]);const a=L();e.exports.useEffect(()=>{const s=K(a);return document.addEventListener("keydown",s),()=>document.removeEventListener("keydown",s)},[a]);const I=async()=>{u(!0);const s=await a.board.viewport.get(),m=s.y+d/2,w=s.x+d/2,p=Math.ceil(Math.sqrt(c.length)),M=c.map((n,i)=>{const b=Math.floor(i/p),S=i%p;return{type:"sticker",text:n,x:w+S*d,y:m+b*d,metadata:{[R]:{protocolReference:k(i,r),originalText:n}}}});let g=[];try{g=await a.board.widgets.create(M)}catch(n){const i=n instanceof Error?n.message:JSON.stringify(n);await a.showErrorNotification(`Could not create widgets. Error: ${i}`),u(!1),await a.board.ui.closeModal()}if(r){const n=await a.board.tags.get({title:r});if(n&&n.length>0){const i=n[0];a.board.tags.update(E(v({},i),{widgetIds:[...i.widgetIds,...g.map(b=>b.id)]}))}else a.board.tags.create({title:r,color:"#F24726",widgetIds:g})}await a.board.selection.selectWidgets(g);const N={x:w,y:m+-100,width:p*d,height:p*d};await a.board.viewport.set(N),await a.board.ui.closeModal(),u(!1),await a.showNotification(c.length+" sticker created")};return e.exports.createElement(j,null,e.exports.createElement("h1",null,"Affinity Diagram Import"),e.exports.createElement("h2",null,"Create stickers for your recent user interview"),e.exports.createElement("div",{className:"form-group"},e.exports.createElement("label",{htmlFor:"protocolPrefix"},"User Code (optional)"),e.exports.createElement("input",{type:"text",className:"input",id:"protocolPrefix",value:r,onChange:s=>C(s.target.value)})),e.exports.createElement(B,{className:"form-group"},e.exports.createElement("label",{htmlFor:"protocolEntries"},"Paste the protocol below"),e.exports.createElement("textarea",{className:"textarea",id:"protocolEntries",value:o,onChange:s=>{t(s.target.value)}})),e.exports.createElement("h2",null,"Preview"),e.exports.createElement(F,null,c.length>0?c.map((s,m)=>e.exports.createElement("div",{key:m},e.exports.createElement("strong",null,k(m,r)),e.exports.createElement(W,null,s))):e.exports.createElement("div",null,"No content")),e.exports.createElement("button",{className:`button button-primary${x?" button-loading":""}`,onClick:I,disabled:x||c.length<1,type:"button"},"Create sticker"),e.exports.createElement("button",{className:"button button-secondary",onClick:async()=>{await a.board.ui.closeModal()}},"Cancel"))};O.render(e.exports.createElement(q,null),document.getElementById("root"));
