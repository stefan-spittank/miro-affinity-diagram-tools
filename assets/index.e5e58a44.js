import{g as e}from"./miroInstance.b01b0cd8.js";var i=`<svg width="48px" height="48px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>Artboard</title>
    <g id="Artboard" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <rect id="Rectangle" fill="#FFD700" x="2" y="34" width="11" height="6"></rect>
        <rect id="Rectangle-Copy" fill="#FFD700" x="16" y="34" width="11" height="6"></rect>
        <rect id="Rectangle-Copy-2" fill="#FFD700" x="2" y="25" width="11" height="6"></rect>
        <rect id="Rectangle-Copy-3" fill="#FFD700" x="16" y="25" width="11" height="6"></rect>
        <rect id="Rectangle-Copy-6" fill="#44BDFF" x="9" y="16" width="11" height="6"></rect>
        <rect id="Rectangle-Copy-7" fill="#44BDFF" x="34" y="16" width="12" height="6"></rect>
        <rect id="Rectangle-Copy-8" fill="#E40606" x="22" y="7" width="12" height="6"></rect>
        <rect id="Rectangle-Copy-4" fill="#FFD700" x="34" y="25" width="12" height="6"></rect>
        <rect id="Rectangle-Copy-5" fill="#FFD700" x="34" y="34" width="12" height="6"></rect>
    </g>
</svg>`;const t=e();t.onReady(async()=>{console.log("miro ready"),await t.initialize({extensionPoints:{toolbar:{title:"Affinity Diagram Tools",toolbarSvgIcon:i,librarySvgIcon:i,async onClick(){await t.isAuthorized()||await t.requestAuthorization(),await t.board.ui.openLeftSidebar("src/SidebarApp/SidebarApp.html")}}}})});
