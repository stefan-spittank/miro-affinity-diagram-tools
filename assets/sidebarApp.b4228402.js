var F=Object.defineProperty,T=Object.defineProperties;var B=Object.getOwnPropertyDescriptors;var w=Object.getOwnPropertySymbols;var L=Object.prototype.hasOwnProperty,U=Object.prototype.propertyIsEnumerable;var S=(t,r,a)=>r in t?F(t,r,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[r]=a,N=(t,r)=>{for(var a in r||(r={}))L.call(r,a)&&S(t,a,r[a]);if(w)for(var a of w(r))U.call(r,a)&&S(t,a,r[a]);return t},y=(t,r)=>T(t,B(r));import{g as b}from"./miroInstance.b01b0cd8.js";import{r as e,s as f,R as V}from"./vendor.836cfe6a.js";import{w as d,g as z,a as O,i as I}from"./interviewStickerTools.1fc8bc22.js";const _=({setView:t})=>{const r=b();return e.exports.createElement(e.exports.Fragment,null,e.exports.createElement("h1",null,"Affinity Diagram Tools"),e.exports.createElement("h2",null,"Import notes"),e.exports.createElement("p",{className:"p-medium"},"Paste the raw text notes in the importer and the plugin will create a sticker for each paragraph."),e.exports.createElement("button",{className:"button button-primary",onClick:async()=>{await r.board.ui.openModal("src/ImportProtocol/ImportProtocol.html",{fullscreen:!0})}},"Import notes"),e.exports.createElement("h2",null,"Review the orginal notes"),e.exports.createElement("p",{className:"p-medium"},"You can safely modify the sticker text (e.g. for brevity) while the plugin makes sure, the original text is still available to you. You can review the original notes for the selected stickers any time."),e.exports.createElement("button",{className:"button button-secondary",onClick:()=>{t("ShowProtocolReference")}},"View original notes"),e.exports.createElement("h2",null,"Create random stacks"),e.exports.createElement("p",{className:"p-medium"},"Split the stickers into random stacks for the interpretation session."),e.exports.createElement("button",{className:"button button-secondary",onClick:()=>{t("CreateRandomStacks")}},"Create random stacks"))};function j(t){return Math.floor(Math.random()*t)}const H=(t,r,a)=>{const o=Math.ceil(t.length/r),c=Math.min(a||Number.MAX_SAFE_INTEGER,o),n=[];for(let i=0;i<r;++i){const m=[];for(let p=0;p<c&&t.length>0;++p){const l=j(t.length),u=t.splice(l,1)[0];m.push(u)}n.push({elements:m})}return n},Y=(t,r,a)=>t.flatMap((o,c)=>{const n=Math.ceil(Math.sqrt(o.elements.length)),i=c*d,p=n*c*d+i;return o.elements.map((l,u)=>{const x=Math.floor(u/n),h=u%n;return y(N({},l),{x:r+h*d+p,y:a+x*d})})}),C=f.a`
  font-family: var(--body-font);
  font-size: var(--font-size-small);
  text-decoration: none;
  display: block;
`,G=({setView:t,selectedSticker:r})=>{const a=b(),[o,c]=e.exports.useState("2"),[n,i]=e.exports.useState(2),[m,p]=e.exports.useState(!1),[l,u]=e.exports.useState(""),[x,h]=e.exports.useState(),[g,P]=e.exports.useState(!1),R=async()=>{const s=H(r,n,x),k=await a.board.viewport.get(),M=k.y+d/2,A=k.x+d/2,D=Y(s,A,M),E=await a.board.widgets.update(D);await a.board.selection.selectWidgets(E);const v=z(E);v&&await a.board.viewport.set(v),await a.board.ui.closeLeftSidebar()};return e.exports.createElement(e.exports.Fragment,null,e.exports.createElement("h2",null,e.exports.createElement(C,{href:"",onClick:s=>{s.preventDefault(),t("Overview")}},"Affinity Diagram Tools /"),"Create Random Stacks"),e.exports.createElement("p",{className:"p-small"},"Selected number of stickers with notes: ",r.length),e.exports.createElement("p",{className:"p-medium"},"In an interpretation session, each participant will be given a stack of random stickers, to help building the affinity map (see \u201CContextual Design (2nd Edition)\u201D by Karen Holtzblatt, p. 139)."),e.exports.createElement("p",{className:"p-medium"},"Use this screen to create random stack of stickers from your selection."),e.exports.createElement("div",{className:"form-group"+(m?" error":"")},e.exports.createElement("label",{htmlFor:"numberOfParticipants"},"Number of participants"),e.exports.createElement("input",{className:"input",id:"numberOfParticipants",value:o,type:"number",onChange:s=>{c(s.target.value)},onBlur:()=>{const s=parseInt(o);isNaN(s)?p(!0):i(s)}})),e.exports.createElement("div",{className:"form-group"+(g?" error":"")},e.exports.createElement("label",{htmlFor:"maxNumberOfStickers"},"Max. number of stickers per participant"),e.exports.createElement("p",{className:"p-small"},"Leave this field empty to distribute all available stickers"),e.exports.createElement("input",{className:"input",id:"maxNumberOfStickers",placeholder:!m&&r.length>0?Math.ceil(r.length/n).toString():"",value:l,onChange:s=>u(s.target.value),onBlur:()=>{const s=l!==void 0&&l!==""?parseInt(l):void 0;s&&isNaN(s)?P(!0):h(s)}})),e.exports.createElement("button",{className:"button button-primary",onClick:R,disabled:r.length===0||m||g},r.length===0?"No interview stickers selected":"Create random stacks"))},W=f.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 2rem;
`,X=f.div`
  margin-top: 1rem;
`,q=f.div`
  max-height: 100%;
  overflow-y: auto;
`,K=f.div`
  background-color: #fff9b8;
  border-radius: 4px;
  padding: 0.5rem;
  margin-bottom: 1.5rem;
  margin-right: 0.5rem;
`,J=({setView:t,selectedSticker:r})=>e.exports.createElement(W,null,e.exports.createElement("div",{className:"cs1 ce12"},e.exports.createElement("h2",null,e.exports.createElement(C,{href:"",onClick:a=>{a.preventDefault(),t("Overview")}},"Affinity Diagram Tools /"),"View original interview notes")),e.exports.createElement(q,null,r.length>0?r.map((a,o)=>{var c,n;return e.exports.createElement(X,{key:o},e.exports.createElement("strong",null,(c=a.metadata[O])==null?void 0:c.protocolReference),e.exports.createElement(K,null,(n=a.metadata[O])==null?void 0:n.originalText))}):e.exports.createElement("p",{className:"p-medium"},"No interview sticker selected"))),Q=(t,r)=>async()=>{const a=await t.board.selection.get();r(a.filter(I))},Z=()=>{const t=b(),[r,a]=e.exports.useState("Overview"),[o,c]=e.exports.useState([]);switch(e.exports.useEffect(()=>{const n=Q(t,c);return t.addListener("SELECTION_UPDATED",n),t.board.selection.get().then(i=>c(i.filter(I)||[])),()=>{t.removeListener("SELECTION_UPDATED",n)}},[t,c]),r){case"CreateRandomStacks":return e.exports.createElement(G,{setView:a,selectedSticker:o});case"ShowProtocolReference":return e.exports.createElement(J,{setView:a,selectedSticker:o});default:return e.exports.createElement(_,{setView:a,selectedSticker:o})}};V.render(e.exports.createElement(Z,null),document.getElementById("root"));
