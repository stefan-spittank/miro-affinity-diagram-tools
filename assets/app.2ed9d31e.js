var M=Object.defineProperty,S=Object.defineProperties;var T=Object.getOwnPropertyDescriptors;var x=Object.getOwnPropertySymbols;var z=Object.prototype.hasOwnProperty,B=Object.prototype.propertyIsEnumerable;var h=(t,r,o)=>r in t?M(t,r,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[r]=o,w=(t,r)=>{for(var o in r||(r={}))z.call(r,o)&&h(t,o,r[o]);if(x)for(var o of x(r))B.call(r,o)&&h(t,o,r[o]);return t},y=(t,r)=>S(t,T(r));import{g as N}from"./miroInstance.b01b0cd8.js";import{s as i,r as e,R as O}from"./vendor.836cfe6a.js";import{a as R}from"./sharedConsts.98c66354.js";const j=i.input`
  font-family: var(--body-font);
  font-size: 1rem;
  padding: 0.25rem;
  border-radius: 0;
  border: 1px solid lightgrey;
  width: 100%;
`,F=i.textarea`
  width: 100%;
  height: 2rem;
  font-family: var(--body-font);
  font-size: 1rem;
  padding: 0.25rem;
  border-radius: 0;
  border: 1px solid lightgrey;
`,L=i.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 2rem;
`,W=i.div`
  display: flex;
  flex-direction: column;
`,$=i.button`
  font-family: var(--body-font);
  font-size: 1rem;
  padding: 14px;
  border-color: rgba(66, 98, 255, 1);
  border-color: var(--blue700);
  background-color: rgba(66, 98, 255, 1);
  background-color: var(--blue700);
  border-radius: var(--radiusM);
`,D=i.div`
  max-height: 100%;
  overflow-y: auto;
`,q=i.div`
  background-color: #fff9b8;
  border-radius: 4px;
  padding: 0.5rem;
  margin-bottom: 1.5rem;
  margin-right: 0.5rem;
`,v=(t,r)=>r?`${r}-${t+1}`:`#${t+1}`,J=()=>{const[t,r]=e.exports.useState(""),[o,E]=e.exports.useState(""),[l,u]=e.exports.useState([]);e.exports.useEffect(()=>{u(t?t.split(/\r?\n/):[])},[t,u]);const a=N(),k=async()=>{const s=await a.board.viewport.get(),d=s.y+110,b=s.x+110,g=220,p=Math.ceil(Math.sqrt(l.length)),I=l.map((n,c)=>{const f=Math.floor(c/p),P=c%p;return{type:"sticker",text:n,x:b+P*g,y:d+f*g,metadata:{[R]:{protocolReference:v(c,o),originalText:n}}}});let m=[];try{m=await a.board.widgets.create(I)}catch(n){await a.showErrorNotification("Could not create widgets. Error: "+JSON.stringify(n)),await a.board.ui.closeLibrary()}if(o){const n=await a.board.tags.get({title:o});if(n&&n.length>0){const c=n[0];a.board.tags.update(y(w({},c),{widgetIds:[...c.widgetIds,...m.map(f=>f.id)]}))}else a.board.tags.create({title:o,color:"#F24726",widgetIds:m})}await a.board.selection.selectWidgets(m);const C={x:b,y:d+-100,width:p*g,height:p*g};await a.board.viewport.set(C),await a.board.ui.closeLibrary(),await a.showNotification(l.length+" sticker created")};return e.exports.createElement(L,null,e.exports.createElement("div",null,"Create stickers from your recent protocol"),e.exports.createElement("div",null,e.exports.createElement("label",{htmlFor:"protocolPrefix"},"Protocol reference prefix"),e.exports.createElement(j,{id:"protocolPrefix",value:o,onChange:s=>E(s.target.value)})),e.exports.createElement(W,null,e.exports.createElement("label",{htmlFor:"protocolEntries"},"Paste the protocol below"),e.exports.createElement(F,{id:"protocolEntries",value:t,onChange:s=>{r(s.target.value)}})),e.exports.createElement("label",null,"Preview"),e.exports.createElement(D,null,l.length>0?l.map((s,d)=>e.exports.createElement("div",{key:d},e.exports.createElement("strong",null,v(d,o)),e.exports.createElement(q,null,s))):e.exports.createElement("div",null,"No content")),e.exports.createElement($,{onClick:k,disabled:l.length<1},"Create sticker"))};O.render(e.exports.createElement(J,null),document.getElementById("root"));
