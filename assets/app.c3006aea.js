var S=Object.defineProperty,T=Object.defineProperties;var z=Object.getOwnPropertyDescriptors;var w=Object.getOwnPropertySymbols;var O=Object.prototype.hasOwnProperty,R=Object.prototype.propertyIsEnumerable;var y=(t,r,o)=>r in t?S(t,r,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[r]=o,v=(t,r)=>{for(var o in r||(r={}))O.call(r,o)&&y(t,o,r[o]);if(w)for(var o of w(r))R.call(r,o)&&y(t,o,r[o]);return t},E=(t,r)=>T(t,z(r));import{g as $,a as B}from"./sharedConsts.efdedf22.js";import{s as i,r as e,R as D}from"./vendor.836cfe6a.js";i.input`
  // font-family: var(--body-font);
  // font-size: 1rem;
  // padding: 0.25rem;
  // border-radius: 0;
  // border: 1px solid lightgrey;
  width: 100%;
`;i.textarea`
  width: 100%;
  height: 2rem;
  // font-family: var(--body-font);
  // font-size: 1rem;
  // padding: 0.25rem;
  // border-radius: 0;
  // border: 1px solid lightgrey;
`;const F=i.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`,W=i.div`
  display: flex;
  flex-direction: column;
`;i.button`
  font-family: var(--body-font);
  font-size: 1rem;
  padding: 14px;
  border-color: rgba(66, 98, 255, 1);
  border-color: var(--blue700);
  background-color: rgba(66, 98, 255, 1);
  background-color: var(--blue700);
  border-radius: var(--radiusM);
`;const j=i.div`
  max-height: 100%;
  overflow-y: auto;
`,q=i.div`
  background-color: #fff9b8;
  border-radius: 4px;
  padding: 0.5rem;
  margin-bottom: 1.5rem;
  margin-right: 0.5rem;
`,C=(t,r)=>r?`${r}-${t+1}`:`#${t+1}`,A=()=>{const[t,r]=e.exports.useState(""),[o,k]=e.exports.useState(""),[b,u]=e.exports.useState(!1),[l,f]=e.exports.useState([]);e.exports.useEffect(()=>{f(t?t.split(/\r?\n/).filter(s=>s!==""):[])},[t,f]);const a=$(),I=async()=>{u(!0);const s=await a.board.viewport.get(),d=s.y+110,h=s.x+110,g=220,p=Math.ceil(Math.sqrt(l.length)),M=l.map((n,c)=>{const x=Math.floor(c/p),P=c%p;return{type:"sticker",text:n,x:h+P*g,y:d+x*g,metadata:{[B]:{protocolReference:C(c,o),originalText:n}}}});let m=[];try{m=await a.board.widgets.create(M)}catch(n){await a.showErrorNotification("Could not create widgets. Error: "+JSON.stringify(n)),u(!1),await a.board.ui.closeModal()}if(o){const n=await a.board.tags.get({title:o});if(n&&n.length>0){const c=n[0];a.board.tags.update(E(v({},c),{widgetIds:[...c.widgetIds,...m.map(x=>x.id)]}))}else a.board.tags.create({title:o,color:"#F24726",widgetIds:m})}await a.board.selection.selectWidgets(m);const N={x:h,y:d+-100,width:p*g,height:p*g};await a.board.viewport.set(N),await a.board.ui.closeModal(),u(!1),await a.showNotification(l.length+" sticker created")};return e.exports.createElement(F,null,e.exports.createElement("h1",null,"Affinity Diagram Import"),e.exports.createElement("h2",null,"Create stickers for your recent user interview"),e.exports.createElement("div",{className:"form-group"},e.exports.createElement("label",{htmlFor:"protocolPrefix"},"User Code (optional)"),e.exports.createElement("input",{type:"text",className:"input",id:"protocolPrefix",value:o,onChange:s=>k(s.target.value)})),e.exports.createElement(W,{className:"form-group"},e.exports.createElement("label",{htmlFor:"protocolEntries"},"Paste the protocol below"),e.exports.createElement("textarea",{className:"textarea",id:"protocolEntries",value:t,onChange:s=>{r(s.target.value)}})),e.exports.createElement("h2",null,"Preview"),e.exports.createElement(j,null,l.length>0?l.map((s,d)=>e.exports.createElement("div",{key:d},e.exports.createElement("strong",null,C(d,o)),e.exports.createElement(q,null,s))):e.exports.createElement("div",null,"No content")),e.exports.createElement("button",{className:`button button-primary${b?" button-loading":""}`,onClick:I,disabled:b||l.length<1,type:"button"},"Create sticker"))};D.render(e.exports.createElement(A,null),document.getElementById("root"));
