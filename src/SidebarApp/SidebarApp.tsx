import * as React from "react";
import { useEffect, useState } from "react";
import Overview from "../Overview/Overview";
import CreateRandomStacks from "../CreateRandomStacks/CreateRandomStacks";
import { Views } from "../sharedConsts";
import ShowProtocolReference from "../ShowProtocolReference/ShowProtocolReference";
import { getMiroInstance } from "../miroInstance";
import { isProtocolEntrySticker } from "../Tools/interviewStickerTools";

const getOnSelectionUpdatedHandler =
  (
    miroInstance: SDK.Root,
    setSelectedSticker: (sticker: SDK.IWidget[]) => void
  ) =>
  async () => {
    // event.data doesn't give the complete widget, only parts of it.
    // so read the real widgets from the miro instance
    const selection = await miroInstance.board.selection.get();
    setSelectedSticker(selection.filter(isProtocolEntrySticker));
  };

const SidebarApp = () => {
  const miroInstance = getMiroInstance();

  const [view, setView] = useState<Views>("Overview");
  const [selectedSticker, setSelectedSticker] = useState<SDK.IWidget[]>([]);

  useEffect(() => {
    const selectionHandler = getOnSelectionUpdatedHandler(
      miroInstance,
      setSelectedSticker
    );
    miroInstance.addListener("SELECTION_UPDATED", selectionHandler);
    miroInstance.board.selection
      .get()
      .then((widgets) =>
        setSelectedSticker(widgets.filter(isProtocolEntrySticker) || [])
      );
    return () => {
      miroInstance.removeListener("SELECTION_UPDATED", selectionHandler);
    };
  }, [miroInstance, setSelectedSticker]);

  switch (view) {
    case "CreateRandomStacks":
      return (
        <CreateRandomStacks
          setView={setView}
          selectedSticker={selectedSticker}
        />
      );
    case "ShowProtocolReference":
      return (
        <ShowProtocolReference
          setView={setView}
          selectedSticker={selectedSticker}
        />
      );
    default:
      return <Overview setView={setView} selectedSticker={selectedSticker} />;
  }
};

export default SidebarApp;
