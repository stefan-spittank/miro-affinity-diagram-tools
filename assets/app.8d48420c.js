var M=Object.defineProperty,T=Object.defineProperties;var S=Object.getOwnPropertyDescriptors;var b=Object.getOwnPropertySymbols;var z=Object.prototype.hasOwnProperty,B=Object.prototype.propertyIsEnumerable;var h=(t,o,r)=>o in t?M(t,o,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[o]=r,w=(t,o)=>{for(var r in o||(o={}))z.call(o,r)&&h(t,r,o[r]);if(b)for(var r of b(o))B.call(o,r)&&h(t,r,o[r]);return t},v=(t,o)=>T(t,S(o));import{g as R,a as F}from"./sharedConsts.a1e3bac4.js";import{s as n,r as e,R as O}from"./vendor.238d59ea.js";const W=n.input`
  font-family: var(--body-font);
  font-size: 1rem;
  padding: 0.25rem;
  border-radius: 0;
  border: 1px solid lightgrey;
  width: 100%;
`,$=n.textarea`
  width: 100%;
  height: 2rem;
  font-family: var(--body-font);
  font-size: 1rem;
  padding: 0.25rem;
  border-radius: 0;
  border: 1px solid lightgrey;
`,j=n.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 2rem;
`,D=n.div`
  display: flex;
  flex-direction: column;
`,L=n.button`
  font-family: var(--body-font);
  font-size: 1rem;
  padding: 14px;
  border-color: rgba(66, 98, 255, 1);
  border-color: var(--blue700);
  background-color: rgba(66, 98, 255, 1);
  background-color: var(--blue700);
  border-radius: var(--radiusM);
`,N=n.div`
  max-height: 100%;
  overflow-y: auto;
`,q=n.div`
  background-color: #fff9b8;
  border-radius: 4px;
  padding: 0.5rem;
  margin-bottom: 1.5rem;
  margin-right: 0.5rem;
`,y=(t,o)=>o?`${o}-${t+1}`:`#${t+1}`,X=()=>{const[t,o]=e.exports.useState(""),[r,E]=e.exports.useState(""),[l,m]=e.exports.useState([]);e.exports.useEffect(()=>{m(t?t.split(/\r?\n/):[])},[t,m]);const a=R(),k=async()=>{const s=await a.board.viewport.get(),d=s.y+110,x=s.x+110,g=220,p=Math.ceil(Math.sqrt(l.length)),I=l.map((i,c)=>{const f=Math.floor(c/p),C=c%p;return{type:"sticker",text:i,x:x+C*g,y:d+f*g,metadata:{[F]:{protocolReference:y(c,r),originalText:i}}}}),u=await a.board.widgets.create(I);if(r){const i=await a.board.tags.get({title:r});if(i&&i.length>0){const c=i[0];a.board.tags.update(v(w({},c),{widgetIds:[...c.widgetIds,...u.map(f=>f.id)]}))}else a.board.tags.create({title:r,color:"#F24726",widgetIds:u})}await a.board.selection.selectWidgets(u);const P={x,y:d+-100,width:p*g,height:p*g};await a.board.viewport.set(P),await a.board.ui.closeLibrary(),await a.showNotification(l.length+" sticker created")};return e.exports.createElement(j,null,e.exports.createElement("div",null,"Create stickers from your recent protocol"),e.exports.createElement("div",null,e.exports.createElement("label",{htmlFor:"protocolPrefix"},"Protocol reference prefix"),e.exports.createElement(W,{id:"protocolPrefix",value:r,onChange:s=>E(s.target.value)})),e.exports.createElement(D,null,e.exports.createElement("label",{htmlFor:"protocolEntries"},"Paste the protocol below"),e.exports.createElement($,{id:"protocolEntries",value:t,onChange:s=>{o(s.target.value)}})),e.exports.createElement("label",null,"Preview"),e.exports.createElement(N,null,l.length>0?l.map((s,d)=>e.exports.createElement("div",{key:d},e.exports.createElement("strong",null,y(d,r)),e.exports.createElement(q,null,s))):e.exports.createElement("div",null,"No content")),e.exports.createElement(L,{onClick:k,disabled:l.length<1},"Create sticker"))};O.render(e.exports.createElement(X,null),document.getElementById("root"));
