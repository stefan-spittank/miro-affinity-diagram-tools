import * as React from "react";
import { getMiroInstance } from "../miroInstance";

const Overview = () => {
  const miroInstance = getMiroInstance();
  return (
    <>
      <h1>Affinity Diagram Tools</h1>
      <h2>Import notes</h2>
      <p className="p-medium">
        Paste the raw text notes in the importer and the plugin will create a
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
        Import notes
      </button>
      <h2>Review the orginal notes</h2>
      <p className="p-medium">
        You can safely modify the sticker text (e.g. for brevity) while the
        plugin makes sure, the original text is still available to you. You can
        review the original notes for the selected stickers any time.
      </p>
      <button
        className="button button-secondary"
        onClick={async () => {
          await miroInstance.board.ui.openLeftSidebar(
            "src/ShowProtocolReference/ShowProtocolReference.html"
          );
        }}
      >
        View original notes
      </button>
      <h2>Create random stacks</h2>
      <p className="p-medium">
        Split the stickers into random stacks for the interpretation session.
      </p>
      <button
        className="button button-secondary"
        onClick={async () => {
          await miroInstance.board.ui.openLeftSidebar(
            "src/CreateRandomStacks/CreateRandomStacks.html"
          );
        }}
      >
        Create random stacks
      </button>
    </>
  );
};

export default Overview;
