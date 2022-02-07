import sourceInformationIcon from "./assets/SourceInformation.svg?raw";
import affinityDiagramIcon from "./assets/affinity-diagram.svg?raw";
import { getMiroInstance } from "./miroInstance";
import { IS_DEV_MODE } from "./sharedConsts";

// https://developers.miro.com/docs/web-plugins-features

// Exported so, that the tests can import it and therefore
// trigger the execution of this file
export const miroInstance = getMiroInstance();

miroInstance.onReady(async () => {
  miroInstance.initialize({
    extensionPoints: {
      bottomBar: {
        title: `${
          IS_DEV_MODE ? "(DEV) " : ""
        }Affinity Diagram: show source information`,
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
        title: `${
          IS_DEV_MODE ? "(DEV) " : ""
        }Affinity Diagram: import protocol`,
        toolbarSvgIcon: affinityDiagramIcon,
        librarySvgIcon: affinityDiagramIcon,
        async onClick() {
          const isAuthorized = await miroInstance.isAuthorized();

          if (!isAuthorized) {
            // Ask the user to authorize the app.
            await miroInstance.requestAuthorization();
          }

          // Remember that 'app.html' resolves relative to index.js file. So app.html have to be in the /dist/ folder.
          await miroInstance.board.ui.openModal(
            "src/ImportProtocol/ImportProtocol.html",
            {
              fullscreen: true,
            }
          );
        },
      },
    },
  });
});
