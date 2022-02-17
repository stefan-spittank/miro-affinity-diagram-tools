var P=Object.defineProperty,T=Object.defineProperties;var $=Object.getOwnPropertyDescriptors;var w=Object.getOwnPropertySymbols;var z=Object.prototype.hasOwnProperty,O=Object.prototype.propertyIsEnumerable;var y=(r,t,a)=>t in r?P(r,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):r[t]=a,v=(r,t)=>{for(var a in t||(t={}))z.call(t,a)&&y(r,a,t[a]);if(w)for(var a of w(t))O.call(t,a)&&y(r,a,t[a]);return r},E=(r,t)=>T(r,$(t));import{g as D}from"./miroInstance.b01b0cd8.js";import{s as c,r as e,R as L}from"./vendor.836cfe6a.js";import{w as d,a as R}from"./interviewStickerTools.3e51b9ff.js";c.input`
  // font-family: var(--body-font);
  // font-size: 1rem;
  // padding: 0.25rem;
  // border-radius: 0;
  // border: 1px solid lightgrey;
  width: 100%;
`;c.textarea`
  width: 100%;
  height: 2rem;
  // font-family: var(--body-font);
  // font-size: 1rem;
  // padding: 0.25rem;
  // border-radius: 0;
  // border: 1px solid lightgrey;
`;const j=c.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`,B=c.div`
  display: flex;
  flex-direction: column;
`;c.button`
  font-family: var(--body-font);
  font-size: 1rem;
  padding: 14px;
  border-color: rgba(66, 98, 255, 1);
  border-color: var(--blue700);
  background-color: rgba(66, 98, 255, 1);
  background-color: var(--blue700);
  border-radius: var(--radiusM);
`;const F=c.div`
  max-height: 100%;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  gap: var(--space-large);
  margin-bottom: var(--space-large);

  background:
/* Shadow covers */ linear-gradient(
      white 30%,
      rgba(255, 255, 255, 0)
    ),
    linear-gradient(rgba(255, 255, 255, 0), white 70%) 0 100%,
    /* Shadows */
      radial-gradient(
        50% 0,
        farthest-side,
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0)
      ),
    radial-gradient(
        50% 100%,
        farthest-side,
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0)
      )
      0 100%;
  background:
/* Shadow covers */ linear-gradient(
      white 30%,
      rgba(255, 255, 255, 0)
    ),
    linear-gradient(rgba(255, 255, 255, 0), white 70%) 0 100%,
    /* Shadows */
      radial-gradient(
        farthest-side at 50% 0,
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0)
      ),
    radial-gradient(
        farthest-side at 50% 100%,
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0)
      )
      0 100%;
  background-repeat: no-repeat;
  background-color: white;
  background-size: 100% 40px, 100% 40px, 100% 14px, 100% 14px;

  /* Opera doesn't support this in the shorthand */
  background-attachment: local, local, scroll, scroll;
`,W=c.div`
  max-width: 300px;
  display: flex;
  flex-direction: column;
`,K=c.div`
  background-color: #fff9b8;
  border-radius: 4px;
  padding: 0.5rem;
  flex-grow: 1;
  display: flex;
  align-items: center;
  text-align: center;
`,k=(r,t)=>t?`${t}-${r+1}`:`#${r+1}`,q=r=>t=>{t instanceof KeyboardEvent&&t.key.toLowerCase()=="escape"&&r.board.ui.closeModal()},A=()=>{const[r,t]=e.exports.useState(""),[a,C]=e.exports.useState(""),[x,m]=e.exports.useState(!1),[i,f]=e.exports.useState([]);e.exports.useEffect(()=>{f(r?r.split(/\r?\n/).filter(s=>s!==""):[])},[r,f]);const o=D();e.exports.useEffect(()=>{const s=q(o);return document.addEventListener("keydown",s),()=>document.removeEventListener("keydown",s)},[o]);const S=async()=>{m(!0);const s=await o.board.viewport.get(),g=s.y+d/2,h=s.x+d/2,p=Math.ceil(Math.sqrt(i.length)),M=i.map((n,l)=>{const b=Math.floor(l/p),N=l%p;return{type:"sticker",text:n,x:h+N*d,y:g+b*d,metadata:{[R]:{minutesReference:k(l,a),originalText:n}}}});let u=[];try{u=await o.board.widgets.create(M)}catch(n){const l=n instanceof Error?n.message:JSON.stringify(n);await o.showErrorNotification(`Could not create widgets. Error: ${l}`),m(!1),await o.board.ui.closeModal()}if(a){const n=await o.board.tags.get({title:a});if(n&&n.length>0){const l=n[0];o.board.tags.update(E(v({},l),{widgetIds:[...l.widgetIds,...u.map(b=>b.id)]}))}else o.board.tags.create({title:a,color:"#F24726",widgetIds:u})}await o.board.selection.selectWidgets(u);const I={x:h,y:g+-100,width:p*d,height:p*d};await o.board.viewport.set(I),await o.board.ui.closeModal(),m(!1),await o.showNotification(i.length+" sticker created")};return e.exports.createElement(j,null,e.exports.createElement("h1",null,"Affinity Diagram Import"),e.exports.createElement("h2",null,"Create stickers for your recent user interview"),e.exports.createElement("div",{className:"form-group"},e.exports.createElement("label",{htmlFor:"protocolPrefix"},"User Code (optional)"),e.exports.createElement("input",{type:"text",className:"input",id:"protocolPrefix",value:a,onChange:s=>C(s.target.value)})),e.exports.createElement(B,{className:"form-group"},e.exports.createElement("label",{htmlFor:"protocolEntries"},"Paste the minutes below"),e.exports.createElement("textarea",{className:"textarea",id:"protocolEntries",value:r,onChange:s=>{t(s.target.value)}})),e.exports.createElement("h2",null,"Preview ",i.length>0?`(${i.length} stickers)`:""),e.exports.createElement(F,null,i.length>0?i.map((s,g)=>e.exports.createElement(W,{key:g},e.exports.createElement("strong",null,k(g,a)),e.exports.createElement(K,null,s))):e.exports.createElement("div",null,"No content")),e.exports.createElement("button",{className:`button button-primary${x?" button-loading":""}`,onClick:S,disabled:x||i.length<1,type:"button"},"Create stickers"),e.exports.createElement("button",{className:"button button-secondary",onClick:async()=>{await o.board.ui.closeModal()}},"Cancel"))};L.render(e.exports.createElement(A,null),document.getElementById("root"));
