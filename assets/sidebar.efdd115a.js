import{g as d}from"./miroInstance.b01b0cd8.js";import{s as r,r as e,R as p}from"./vendor.836cfe6a.js";import{i,a as l}from"./interviewStickerTools.1fc8bc22.js";const f=r.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 2rem;
`,g=r.div`
  margin-top: 1rem;
`,u=r.div`
  max-height: 100%;
  overflow-y: auto;
`,x=r.div`
  background-color: #fff9b8;
  border-radius: 4px;
  padding: 0.5rem;
  margin-bottom: 1.5rem;
  margin-right: 0.5rem;
`,E=()=>{const o=d(),[n,a]=e.exports.useState([]);return e.exports.useEffect(()=>{o.addListener("SELECTION_UPDATED",t=>{a(t.data.filter(i))}),o.board.selection.get().then(t=>a(t.filter(i)||[]))},[]),e.exports.createElement(f,null,e.exports.createElement("div",{className:"cs1 ce12"},e.exports.createElement("h2",null,"View original interview notes")),e.exports.createElement(u,null,n.length>0?n.map((t,m)=>{var c,s;return e.exports.createElement(g,{key:m},e.exports.createElement("strong",null,(c=t.metadata[l])==null?void 0:c.protocolReference),e.exports.createElement(x,null,(s=t.metadata[l])==null?void 0:s.originalText))}):e.exports.createElement("p",{className:"p-medium"},"No interview sticker selected")))};p.render(e.exports.createElement(E,null),document.getElementById("root"));
