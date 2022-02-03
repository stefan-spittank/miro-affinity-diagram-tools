import toolbarIcon from "./assets/SourceInformation.svg?raw";
import libraryIcon from "./assets/affinity-diagram.svg?raw";
import { getMiroInstance } from "./miroInstance";

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
          miroInstance.board.ui.openLeftSidebar("sidebar.html");
        },
      },
      toolbar: {
        title: "Affinity Diagram: import protocol",
        toolbarSvgIcon: toolbarIcon,
        librarySvgIcon: libraryIcon,
        async onClick() {
          // Remember that 'app.html' resolves relative to index.js file. So app.html have to be in the /dist/ folder.
          await miroInstance.board.ui.openLibrary("ImportProtocol.html", {
            title: "Import protocol",
          });
        },
      },
    },
  });
});
