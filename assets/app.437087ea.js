import"./style.7f2dd081.js";import{s as r,R as h,r as e}from"./vendor.ad5305a0.js";import{a as v}from"./sharedConsts.e9a4b341.js";const y=r.input`
  font-family: var(--body-font);
  font-size: 1rem;
  padding: 0.25rem;
  border-radius: 0;
  border: 1px solid lightgrey;
  width: 100%;
`,E=r.textarea`
  width: 100%;
  height: 2rem;
  font-family: var(--body-font);
  font-size: 1rem;
  padding: 0.25rem;
  border-radius: 0;
  border: 1px solid lightgrey;
`,w=r.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 2rem;
`,k=r.div`
  display: flex;
  flex-direction: column;
`,P=r.button`
  font-family: var(--body-font);
  font-size: 1rem;
  padding: 14px;
  border-color: rgba(66, 98, 255, 1);
  border-color: var(--blue700);
  background-color: rgba(66, 98, 255, 1);
  background-color: var(--blue700);
  border-radius: var(--radiusM);
`,C=r.div`
  max-height: 100%;
  overflow-y: auto;
`,M=r.div`
  background-color: #fff9b8;
  border-radius: 4px;
  padding: 0.5rem;
  margin-bottom: 1.5rem;
  margin-right: 0.5rem;
`;function S(){const[n,p]=e.exports.useState(""),[l,u]=e.exports.useState(""),[o,s]=e.exports.useState([]);e.exports.useEffect(()=>{s(n?n.split(/\r?\n/):[])},[n,s]);const g=async()=>{const t=0,a=0,i=220,d=o.length>0?Math.ceil(Math.sqrt(o.length)):0,f=await miro.board.widgets.create(o.map((m,c)=>{const x=Math.floor(c/d),b=c%d;return{type:"sticker",text:m,x:a+b*i,y:t+x*i,metadata:{[v]:{protocolReference:l+"-"+c,originalText:m}}}}));await miro.board.selection.selectWidgets(f),await miro.board.ui.closeLibrary(),await miro.showNotification(o.length+" sticker created")};return e.exports.createElement(w,null,e.exports.createElement("div",null,"Create stickers from your recent protocol"),e.exports.createElement("div",null,e.exports.createElement("label",{htmlFor:"protocolPrefix"},"Protocol reference prefix"),e.exports.createElement(y,{name:"protocolPrefix",value:l,onChange:t=>u(t.target.value)})),e.exports.createElement(k,null,e.exports.createElement("label",{htmlFor:"protocolEntries"},"Paste the protocol below"),e.exports.createElement(E,{name:"protocolEntries",value:n,onChange:t=>{p(t.target.value)}})),e.exports.createElement("label",null,"Preview"),e.exports.createElement(C,null,o.length>0?o.map((t,a)=>e.exports.createElement("div",{key:a},e.exports.createElement("strong",null,l?l+"-"+a:"#"+a),e.exports.createElement(M,null,t))):e.exports.createElement("div",null,"No content")),e.exports.createElement(P,{onClick:g},"Create sticker"))}h.render(e.exports.createElement(S,null),document.getElementById("root"));
