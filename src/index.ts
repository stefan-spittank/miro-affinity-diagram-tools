import sourceInformationIcon from "./assets/SourceInformation.svg?raw";
import affinityDiagramIcon from "./assets/affinity-diagram.svg?raw";
import { getMiroInstance } from "./miroInstance";
import { IS_DEV_MODE } from "./sharedConsts";

// https://developers.miro.com/docs/web-plugins-features

// Exported so, that the tests can import it and therefore
// trigger the execution of this file
export const miroInstance = getMiroInstance();

miroInstance.onReady(async () => {
  await miroInstance.initialize({
    extensionPoints: {
      bottomBar: {
        title: `${IS_DEV_MODE ? "(DEV) " : ""}View original minutes`,
        svgIcon: sourceInformationIcon,
        onClick: async () => {
          const isAuthorized = await miroInstance.isAuthorized();

          if (!isAuthorized) {
            // Ask the user to authorize the app.
            await miroInstance.requestAuthorization();
          }

          await miroInstance.board.ui.openLeftSidebar(
            "src/ShowProtocolReference/ShowProtocolReference.html"
          );
        },
      },
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
            "src/Overview/Overview.html"
          );
        },
      },
    },
  });
});
