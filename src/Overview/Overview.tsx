import * as React from "react";
import { getMiroInstance } from "../miroInstance";

const Overview = () => {
  const miroInstance = getMiroInstance();
  return (
    <>
      <h1>Affinity Diagram Tools</h1>
      <p className="p-medium">
        This miro plugin is intended for people doing user interviews (User
        Experience Designers, Requirements Engineers,...). It helps importing
        notes from your user interviews, to be able to create an affinity
        diagram in a shared interpretation session. Optionally you can assign a
        user code to each interview you are importing. This could be helpful to
        easily identify the source interview in future discussions.
      </p>

      <h2>Import minutes</h2>
      <p className="p-medium">
        Paste the raw text minutes in the importer and the plugin will create a
        sticker for each paragraph.
      </p>
      <button
        className="button button-primary"
        onClick={async () => {
          await miroInstance.board.ui.openModal(
            "src/ImportProtocol/ImportProtocol.html",
            {
              fullscreen: true,
            }
          );
          await miroInstance.board.ui.closeLeftSidebar();
        }}
      >
        Import minutes
      </button>
      <h2>Review the orginal minutes</h2>
      <p className="p-medium">
        You can safely modify the sticker text (e.g. for brevity) while the
        plugin makes sure, the original text is still available to you. You can
        review the original minutes for the selected stickers any time.
      </p>
      <button
        className="button button-secondary"
        onClick={async () => {
          await miroInstance.board.ui.openLeftSidebar(
            "src/ShowProtocolReference/ShowProtocolReference.html"
          );
        }}
      >
        View original minutes
      </button>
    </>
  );
};

export default Overview;
