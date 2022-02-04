import toolbarIcon from "./assets/SourceInformation.svg?raw";
import libraryIcon from "./assets/affinity-diagram.svg?raw";
import { getMiroInstance } from "./miroInstance";
import { appId } from "./sharedConsts";

// https://developers.miro.com/docs/web-plugins-features

// Exported so, that the tests can import it and therefore
// trigger the execution of this file
export const miroInstance = getMiroInstance();

miroInstance.onReady(async () => {
  miroInstance.initialize({
    extensionPoints: {
      bottomBar: {
        title: "Affinity Diagram: show source information",
        svgIcon: toolbarIcon,
        onClick: async () => {
          const isAuthorized = await miro.isAuthorized();

          if (!isAuthorized) {
            // Ask the user to authorize the app.
            await miro.requestAuthorization();
          }

          await miroInstance.board.ui.openLeftSidebar(
            "src/ShowProtocolReference/ShowProtocolReference.html"
          );
        },
      },
      toolbar: {
        title: "Affinity Diagram: import protocol",
        toolbarSvgIcon: toolbarIcon,
        librarySvgIcon: libraryIcon,
        async onClick() {
          const isAuthorized = await miro.isAuthorized();

          if (!isAuthorized) {
            // Ask the user to authorize the app.
            await miro.requestAuthorization();
          }

          // Remember that 'app.html' resolves relative to index.js file. So app.html have to be in the /dist/ folder.
          await miroInstance.board.ui.openLibrary(
            "src/ImportProtocol/ImportProtocol.html",
            {
              title: "Import protocol",
            }
          );
        },
      },
    },
  });
});
