import{a,g as d}from"./sharedConsts.df45c4bf.js";import{s as n,r as e,R as p}from"./vendor.238d59ea.js";const f=n.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 2rem;
`,g=n.div`
  margin-top: 1rem;
`,u=n.div`
  max-height: 100%;
  overflow-y: auto;
`,x=n.div`
  background-color: #fff9b8;
  border-radius: 4px;
  padding: 0.5rem;
  margin-bottom: 1.5rem;
  margin-right: 0.5rem;
`,i=r=>{var o;return r.type==="STICKER"&&Boolean((o=r.metadata[a])==null?void 0:o.protocolReference)},E=()=>{const r=d(),[o,c]=e.exports.useState([]);return e.exports.useEffect(()=>{r.addListener("SELECTION_UPDATED",t=>{c(t.data.filter(i))}),r.board.selection.get().then(t=>c(t.filter(i)))},[]),e.exports.createElement(f,null,e.exports.createElement("div",{className:"cs1 ce12"},e.exports.createElement("h1",null,"Affinity Diagram"),e.exports.createElement("p",null,"Original protocol reference")),e.exports.createElement(u,null,o.map((t,m)=>{var s,l;return e.exports.createElement(g,{key:m},e.exports.createElement("strong",null,(s=t.metadata[a])==null?void 0:s.protocolReference),e.exports.createElement(x,null,(l=t.metadata[a])==null?void 0:l.originalText))})))};p.render(e.exports.createElement(E,null),document.getElementById("root"));
