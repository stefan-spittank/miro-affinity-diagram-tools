import * as React from "react";
import { getMiroInstance } from "../miroInstance";
import { ViewProps } from "../sharedConsts";

const Overview = ({ setView }: ViewProps) => {
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
        }}
      >
        Import notes
      </button>
      <h2>View orginal notes</h2>
      <p className="p-medium">
        You can safely modify the sticker text (e.g. for brevity) while the
        plugin makes sure, the original text is still available to you. You can
        view the original notes for the selected stickers any time.
      </p>
      <button
        className="button button-secondary"
        onClick={() => {
          setView("ShowProtocolReference");
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
        onClick={() => {
          setView("CreateRandomStacks");
        }}
      >
        Create random stacks
      </button>
    </>
  );
};

export default Overview;
