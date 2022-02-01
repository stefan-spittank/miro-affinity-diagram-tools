import toolbarIcon from "./assets/SourceInformation.svg?raw";
import libraryIcon from "./assets/affinity-diagram.svg?raw";

// https://developers.miro.com/docs/web-plugins-features

miro.onReady(async () => {
  miro.initialize({
    extensionPoints: {
      bottomBar: {
        title: "Affinity Diagram: show source information",
        svgIcon: toolbarIcon,
        onClick: async () => {
          miro.board.ui.openLeftSidebar("sidebar.html");
        },
      },
      toolbar: {
        title: "Affinity Diagram: import protocol",
        toolbarSvgIcon: toolbarIcon,
        librarySvgIcon: libraryIcon,
        async onClick() {
          // Remember that 'app.html' resolves relative to index.js file. So app.html have to be in the /dist/ folder.
          await miro.board.ui.openLibrary("app.html", {
            title: "Import protocol",
          });
        },
      },
    },
  });
});
