import"./style.7f2dd081.js";import{s as a,R as m,r as e}from"./vendor.ad5305a0.js";import{a as n}from"./sharedConsts.e9a4b341.js";const d=a.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 2rem;
`,p=a.div`
  margin-top: 1rem;
`,f=a.div`
  max-height: 100%;
  overflow-y: auto;
`,u=a.div`
  background-color: #fff9b8;
  border-radius: 4px;
  padding: 0.5rem;
  margin-bottom: 1.5rem;
  margin-right: 0.5rem;
`,c=o=>{var r;return o.type==="STICKER"&&((r=o.metadata[n])==null?void 0:r.protocolReference)},x=()=>{const[o,r]=e.exports.useState([]);return e.exports.useEffect(()=>{miro.addListener("SELECTION_UPDATED",t=>{r(t.data.filter(c))}),miro.board.selection.get().then(t=>r(t.filter(c)))},[]),e.exports.createElement(d,null,e.exports.createElement("div",{className:"cs1 ce12"},e.exports.createElement("h1",null,"Affinity Diagram"),e.exports.createElement("p",null,"Original protocol reference")),e.exports.createElement(f,null,o.map((t,i)=>{var l,s;return e.exports.createElement(p,{key:i},e.exports.createElement("strong",null,(l=t.metadata[n])==null?void 0:l.protocolReference),e.exports.createElement(u,null,(s=t.metadata[n])==null?void 0:s.originalText))})))};m.render(e.exports.createElement(x,null),document.getElementById("root"));
