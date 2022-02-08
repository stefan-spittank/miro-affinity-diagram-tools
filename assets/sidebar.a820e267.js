import{g as d}from"./miroInstance.b01b0cd8.js";import{s as n,r as e,R as p}from"./vendor.836cfe6a.js";import{a}from"./sharedConsts.300a8432.js";const f=n.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 2rem;
`,u=n.div`
  margin-top: 1rem;
`,g=n.div`
  max-height: 100%;
  overflow-y: auto;
`,x=n.div`
  background-color: #fff9b8;
  border-radius: 4px;
  padding: 0.5rem;
  margin-bottom: 1.5rem;
  margin-right: 0.5rem;
`,l=r=>{var o;return r.type==="STICKER"&&Boolean((o=r.metadata[a])==null?void 0:o.protocolReference)},E=()=>{const r=d(),[o,s]=e.exports.useState([]);return e.exports.useEffect(()=>{r.addListener("SELECTION_UPDATED",t=>{s(t.data.filter(l))}),r.board.selection.get().then(t=>s(t.filter(l)||[]))},[]),e.exports.createElement(f,null,e.exports.createElement("div",{className:"cs1 ce12"},e.exports.createElement("h2",null,"View original interview minutes")),e.exports.createElement(g,null,o.length>0?o.map((t,m)=>{var c,i;return e.exports.createElement(u,{key:m},e.exports.createElement("strong",null,(c=t.metadata[a])==null?void 0:c.protocolReference),e.exports.createElement(x,null,(i=t.metadata[a])==null?void 0:i.originalText))}):e.exports.createElement("p",{className:"p-medium"},"No interview sticker selected")))};p.render(e.exports.createElement(E,null),document.getElementById("root"));
