var L=Object.defineProperty,B=Object.defineProperties;var W=Object.getOwnPropertyDescriptors;var O=Object.getOwnPropertySymbols;var H=Object.prototype.hasOwnProperty,Y=Object.prototype.propertyIsEnumerable;var I=(r,t,a)=>t in r?L(r,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):r[t]=a,f=(r,t)=>{for(var a in t||(t={}))H.call(t,a)&&I(r,a,t[a]);if(O)for(var a of O(t))Y.call(t,a)&&I(r,a,t[a]);return r},h=(r,t)=>B(r,W(t));import{g as v}from"./miroInstance.b01b0cd8.js";import{r as e,s as p,R as j}from"./vendor.836cfe6a.js";import{w as E,i as w,g as z,a as g}from"./interviewStickerTools.3e51b9ff.js";const _=({setView:r})=>{const t=v();return e.exports.createElement(e.exports.Fragment,null,e.exports.createElement("h1",null,"Affinity Diagram Tools"),e.exports.createElement("h2",null,"Import notes"),e.exports.createElement("p",{className:"p-medium"},"Paste the raw text notes in the importer and the plugin will create a sticker for each paragraph."),e.exports.createElement("button",{className:"button button-primary",onClick:async()=>{await t.board.ui.openModal("src/ImportMinutes/ImportMinutes.html",{fullscreen:!0})}},"Import notes"),e.exports.createElement("h2",null,"Review the orginal notes"),e.exports.createElement("p",{className:"p-medium"},"You can safely modify the sticker text (e.g. for brevity) while the plugin makes sure, the original text is still available to you. You can review the original notes for the selected stickers any time."),e.exports.createElement("button",{className:"button button-secondary",onClick:()=>{r("ShowMinutesMetadata")}},"View original notes"),e.exports.createElement("h2",null,"Create random stacks"),e.exports.createElement("p",{className:"p-medium"},"Split the stickers into random stacks for the interpretation session."),e.exports.createElement("button",{className:"button button-secondary",onClick:()=>{r("CreateRandomStacks")}},"Create random stacks"))};function G(r){return Math.floor(Math.random()*r)}const K=(r,t,a)=>{const o=Math.ceil(r.length/t),n=Math.min(a||Number.MAX_SAFE_INTEGER,o),i=[];for(let c=0;c<t;++c){const s=[];for(let l=0;l<n&&r.length>0;++l){const u=G(r.length),d=r.splice(u,1)[0];s.push(d)}i.push({elements:s})}return i},V=(r,t,a)=>r.flatMap((o,n)=>{const i=Math.ceil(Math.sqrt(o.elements.length)),c=n*E,l=i*n*E+c;return o.elements.map((u,d)=>{const k=Math.floor(d/i),x=d%i;return h(f({},u),{x:t+x*E+l,y:a+k*E})})}),A=p.a`
  font-family: var(--body-font);
  font-size: var(--font-size-small);
  text-decoration: none;
  display: block;
`,P=e.exports.createContext({selectedSticker:[],refreshSticker:()=>Promise.resolve()}),X=(r,t)=>async()=>{const a=await r.board.selection.get();t(a.filter(w))},$=({children:r})=>{const t=v(),[a,o]=e.exports.useState([]);e.exports.useEffect(()=>{const i=X(t,o);return t.addListener("SELECTION_UPDATED",i),t.board.selection.get().then(c=>o(c.filter(w)||[])),()=>{t.removeListener("SELECTION_UPDATED",i)}},[t,o]);const n=e.exports.useMemo(()=>async()=>{const i=await t.board.selection.get();o(i.filter(w))},[t,o]);return e.exports.createElement(P.Provider,{value:{selectedSticker:a,refreshSticker:n}},r)},S=()=>e.exports.useContext(P),q=({setView:r})=>{const t=v(),{selectedSticker:a}=S(),[o,n]=e.exports.useState("2"),[i,c]=e.exports.useState(2),[s,l]=e.exports.useState(!1),[u,d]=e.exports.useState(""),[k,x]=e.exports.useState(),[b,N]=e.exports.useState(!1),D=async()=>{const m=K(a,i,k),y=await t.board.viewport.get(),T=y.y+E/2,U=y.x+E/2,F=V(m,U,T),C=await t.board.widgets.update(F);await t.board.selection.selectWidgets(C);const M=z(C);M&&await t.board.viewport.set(M),await t.board.ui.closeLeftSidebar()};return e.exports.createElement(e.exports.Fragment,null,e.exports.createElement("h2",null,e.exports.createElement(A,{href:"",onClick:m=>{m.preventDefault(),r("Overview")}},"Affinity Diagram Tools /"),"Create Random Stacks"),e.exports.createElement("p",{className:"p-small"},"Selected number of stickers with notes: ",a.length),e.exports.createElement("p",{className:"p-medium"},"In an interpretation session, each participant will be given a stack of random stickers, to help building the affinity map (see \u201CContextual Design (2nd Edition)\u201D by Karen Holtzblatt, p. 139)."),e.exports.createElement("p",{className:"p-medium"},"Use this screen to create random stack of stickers from your selection."),e.exports.createElement("div",{className:"form-group"+(s?" error":"")},e.exports.createElement("label",{htmlFor:"numberOfParticipants"},"Number of participants"),e.exports.createElement("input",{className:"input",id:"numberOfParticipants",value:o,type:"number",onChange:m=>{n(m.target.value)},onBlur:()=>{const m=parseInt(o);isNaN(m)||m<=0?l(!0):(l(!1),c(m))}}),s&&e.exports.createElement("div",{className:"status-text"},"Number of participants must be a number greater 0")),e.exports.createElement("div",{className:"form-group"+(b?" error":"")},e.exports.createElement("label",{htmlFor:"maxNumberOfStickers"},"Max. number of stickers per participant"),e.exports.createElement("p",{className:"p-small"},"Leave this field empty to distribute all available stickers"),e.exports.createElement("input",{className:"input",id:"maxNumberOfStickers",placeholder:!s&&a.length>0?Math.ceil(a.length/i).toString():"",value:u,onChange:m=>d(m.target.value),onBlur:()=>{const m=u!==void 0&&u!==""?parseInt(u):void 0;m!==void 0&&(isNaN(m)||m<=0)?N(!0):(N(!1),x(m))}}),b&&e.exports.createElement("div",{className:"status-text"},"Number of stickers must be a number greater 0")),e.exports.createElement("button",{className:"button button-primary",onClick:D,disabled:a.length===0||s||b},a.length===0?"No interview stickers selected":"Create random stacks"))},J=p.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`,Q=p.div`
  display: flex;
  flex-direction: row;
`,Z=p.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`,ee=p.div`
  margin-top: 1rem;
`,te=p.div`
  max-height: 100%;
  overflow-y: auto;
`,re=p.div`
  background-color: #fff9b8;
  border-radius: 4px;
  padding: 0.5rem;
  margin-bottom: 1.5rem;
  margin-right: 0.5rem;
`,ae=p.div`
  display: grid;
  position: relative;
`,ne=p.textarea`
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border: none;
  line-height: 1.5;
`,se=p.span`
  background-color: lightblue;
`,oe=p.span``;p.div`
  display: flex;
`;const R=p.div`
  margin-top: var(--space-small);
  margin-bottom: var(--space-small);
`,ie=({warningMessage:r,action:t,setShowActions:a,setWarningMessage:o,sticker:n,stickerText:i})=>{const c=v(),{refreshSticker:s}=S();return e.exports.createElement(R,null,e.exports.createElement("p",{className:"p-medium"},r),e.exports.createElement("p",{className:"p-medium"},"Are you sure, that you want to do this?"),e.exports.createElement("button",{className:"button button-danger button-small",onClick:async()=>{const l=t==="UpdateSticker"?h(f({},n),{text:n.metadata[g].originalText}):h(f({},n),{metadata:{[g]:h(f({},n.metadata[g]),{originalText:i})}});await c.board.widgets.update(l),await s(),a(!1)}},t==="UpdateSticker"?"Yes, update the sticker":"Yes, update the note"),e.exports.createElement("button",{className:"button button-small button-secondary",onClick:()=>o(void 0)},"Cancel"))},ce=({sticker:r,stickerText:t,showSetAndRestoreActions:a,setEditMode:o})=>{const[n,i]=e.exports.useState(!1),[c,s]=e.exports.useState(),[l,u]=e.exports.useState("UpdateNote"),d=e.exports.createElement(Q,null,e.exports.createElement("button",{title:"Edit original note",className:"button-icon button-icon-small icon-edit",onClick:()=>o(!0)}),a&&e.exports.createElement("button",{title:"Show more note sticker options",className:`button-icon button-icon-small ${n?"icon-close":"icon-more"}`,onClick:()=>{i(!n)}}));return n?e.exports.createElement(e.exports.Fragment,null,d,c?e.exports.createElement(ie,{warningMessage:c,action:l,sticker:r,setShowActions:i,setWarningMessage:s,stickerText:t}):e.exports.createElement(R,null,e.exports.createElement("button",{className:"button button-small button-secondary",onClick:()=>{u("UpdateNote"),s("This will update the original note with the current text from the sticker.")}},"Update note with sticker text \u2190"),e.exports.createElement("button",{className:"button button-small button-secondary",onClick:()=>{u("UpdateSticker"),s("The current sticker text will be overwritten with the original note.")}},"Update sticker with note text \u2192"))):d},le=({originalText:r,setEditMode:t,sticker:a})=>{const[o,n]=e.exports.useState(""),i=v(),{refreshSticker:c}=S();return e.exports.useEffect(()=>{n(r)},[r,n]),e.exports.useEffect(()=>{const s=l=>{l instanceof KeyboardEvent&&l.key.toLowerCase()=="escape"&&(n(r),t(!1))};return document.addEventListener("keydown",s),()=>document.removeEventListener("keydown",s)},[]),e.exports.createElement(ae,null,e.exports.createElement(ne,{className:"textarea",value:o,onChange:s=>n(s.target.value),autoFocus:!0,onKeyDown:s=>{s.key.toLowerCase()==="enter"&&(s.preventDefault(),s.currentTarget.blur())},onBlur:async()=>{if(t(!1),o!==r){const s=h(f(f({},a),a.text===r?{text:o}:{}),{metadata:{[g]:h(f({},a.metadata[g]),{originalText:o})}});await i.board.widgets.update(s),await c()}}}),e.exports.createElement("div",null,r))},me=({setView:r})=>{const{selectedSticker:t}=S(),[a,o]=e.exports.useState(!1);return e.exports.createElement(J,null,e.exports.createElement("div",{className:"cs1 ce12"},e.exports.createElement("h2",null,e.exports.createElement(A,{href:"",onClick:n=>{n.preventDefault(),r("Overview")}},"Affinity Diagram Tools /"),"View original interview notes")),e.exports.createElement(te,null,t.length>0?t.map(n=>{var d,k;const i=((d=n.metadata[g])==null?void 0:d.originalText)||"",c=i.split(/\b/),s=n.plainText||"",l=s.split(/\s*\b\s*/),u=s!==i;return e.exports.createElement("div",{key:n.id},e.exports.createElement(ee,null,e.exports.createElement(Z,null,e.exports.createElement("strong",null,(k=n.metadata[g])==null?void 0:k.minutesReference),e.exports.createElement(ce,{stickerText:s,sticker:n,setEditMode:o,showSetAndRestoreActions:u})),e.exports.createElement(re,{"data-testid":"sticker-"+n.id},a?e.exports.createElement(le,{sticker:n,originalText:i,setEditMode:o}):c.map((x,b)=>u?l.includes(x)?e.exports.createElement(se,{key:b},x):e.exports.createElement(oe,{key:b},x):e.exports.createElement("span",{key:b},x)))))}):e.exports.createElement("p",{className:"p-medium"},"No interview sticker selected")))},ue=(r,t)=>{switch(r){case"CreateRandomStacks":return e.exports.createElement(q,{setView:t});case"ShowMinutesMetadata":return e.exports.createElement(me,{setView:t});default:return e.exports.createElement(_,{setView:t})}},pe=()=>{const[r,t]=e.exports.useState("Overview"),a=ue(r,t);return e.exports.createElement($,null,a)};j.render(e.exports.createElement(pe,null),document.getElementById("root"));
