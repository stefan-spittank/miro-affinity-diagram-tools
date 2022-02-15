import * as React from "react";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getMiroInstance } from "../miroInstance";
import { isMinutesSticker } from "../Tools/interviewStickerTools";

export type MiroContextHook = {
  selectedSticker: SDK.IStickerWidget[];
};
export const MiroContext = createContext<MiroContextHook>({
  selectedSticker: [],
});

export type MiroProviderProps = {
  children: ReactNode;
};

const getOnSelectionUpdatedHandler =
  (
    miroInstance: SDK.Root,
    setSelectedSticker: (sticker: SDK.IStickerWidget[]) => void
  ) =>
  async () => {
    // event.data doesn't give the complete widget, only parts of it.
    // so read the real widgets from the miro instance
    const selection = await miroInstance.board.selection.get();
    setSelectedSticker(
      selection.filter(isMinutesSticker) as SDK.IStickerWidget[]
    );
  };

const MiroProvider = ({ children }: MiroProviderProps) => {
  const miroInstance = getMiroInstance();

  const [selectedSticker, setSelectedSticker] = useState<SDK.IStickerWidget[]>(
    []
  );
  useEffect(() => {
    const selectionHandler = getOnSelectionUpdatedHandler(
      miroInstance,
      setSelectedSticker
    );
    miroInstance.addListener("SELECTION_UPDATED", selectionHandler);
    miroInstance.board.selection
      .get()
      .then((widgets) =>
        setSelectedSticker(
          (widgets.filter(isMinutesSticker) as SDK.IStickerWidget[]) || []
        )
      );
    return () => {
      miroInstance.removeListener("SELECTION_UPDATED", selectionHandler);
    };
  }, [miroInstance, setSelectedSticker]);

  return (
    <MiroContext.Provider value={{ selectedSticker }}>
      {children}
    </MiroContext.Provider>
  );
};

export default MiroProvider;

export const useMiro = () => useContext(MiroContext);
