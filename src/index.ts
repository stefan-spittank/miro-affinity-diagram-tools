import affinityDiagramIcon from "./assets/affinity-diagram.svg?raw";
import { getMiroInstance } from "./miroInstance";
import { IS_DEV_MODE } from "./sharedConsts";

// https://developers.miro.com/docs/web-plugins-features

// Exported so, that the tests can import it and therefore
// trigger the execution of this file
export const miroInstance = getMiroInstance();

miroInstance.onReady(async () => {
  console.log("miro ready");
  await miroInstance.initialize({
    extensionPoints: {
      toolbar: {
        title: `${IS_DEV_MODE ? "(DEV) " : ""}Affinity Diagram Tools`,
        toolbarSvgIcon: affinityDiagramIcon,
        librarySvgIcon: affinityDiagramIcon,
        async onClick() {
          const isAuthorized = await miroInstance.isAuthorized();

          if (!isAuthorized) {
            // Ask the user to authorize the app.
            await miroInstance.requestAuthorization();
          }
          await miroInstance.board.ui.openLeftSidebar(
            "src/SidebarApp/SidebarApp.html"
          );
        },
      },
    },
  });
});
