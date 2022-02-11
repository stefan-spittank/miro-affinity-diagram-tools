import * as React from "react";
import { useEffect, useState } from "react";
import { appId, ViewProps } from "../sharedConsts";
import {
  ChangedWord,
  Container,
  OriginalWord,
  Sticker,
  StickerContainer,
  StickerData,
} from "./ShowProtocolReference.styles";
import { isProtocolEntrySticker } from "../Tools/interviewStickerTools";
import { getMiroInstance } from "../miroInstance";
import { Breadcrumb } from "../SharedComponents/Breadcrumb";

const ShowProtocolReference = ({ setView }: ViewProps) => {
  const miroInstance = getMiroInstance();

  const [selectedSticker, setSelectedSticker] = useState<SDK.IWidget[]>([]);

  useEffect(() => {
    miroInstance.addListener("SELECTION_UPDATED", async (event) => {
      console.log("selection updated", event);
      // event.data doesn't give the complete widget, only parts of it.
      const selection = await miroInstance.board.selection.get();
      setSelectedSticker(selection.filter(isProtocolEntrySticker));
    });
    miroInstance.board.selection
      .get()
      .then((widgets) =>
        setSelectedSticker(widgets.filter(isProtocolEntrySticker) || [])
      );
  }, []);

  return (
    <Container>
      <div className="cs1 ce12">
        <h2>
          <Breadcrumb href="" onClick={() => setView("Overview")}>
            Affinity Diagram Tools /
          </Breadcrumb>
          View original notes
        </h2>
      </div>
      <StickerContainer>
        {selectedSticker.length > 0 ? (
          selectedSticker.map((sticker: SDK.IWidget, index) => {
            const originalText = sticker.metadata[appId]?.originalText || "";
            const wordsInOriginal = originalText.split(" ");
            const stickerText = (sticker as SDK.IStickerWidget).plainText || "";
            const wordsInSticker = stickerText.split(" ");
            const textHasChanged = stickerText !== originalText;
            return (
              <div key={sticker.id}>
                <StickerData key={index}>
                  <strong>{sticker.metadata[appId]?.protocolReference}</strong>
                  <Sticker>
                    {wordsInOriginal.map((word: string) => {
                      if (!textHasChanged) {
                        return <span>{word} </span>;
                      }
                      return wordsInSticker.includes(word) ? (
                        <OriginalWord>{word} </OriginalWord>
                      ) : (
                        <ChangedWord>{word} </ChangedWord>
                      );
                    })}
                  </Sticker>
                </StickerData>
                {textHasChanged && (
                  <button
                    className={"button button-danger button-small"}
                    onClick={async () => {
                      await miroInstance.board.widgets.update({
                        ...sticker,
                        metadata: {
                          [appId]: {
                            ...sticker.metadata[appId],
                            originalText: stickerText,
                          },
                        },
                      });
                      const selection =
                        await miroInstance.board.selection.get();
                      setSelectedSticker(
                        selection.filter(isProtocolEntrySticker)
                      );
                    }}
                  >
                    Update note from sticker text
                  </button>
                )}
              </div>
            );
          })
        ) : (
          <p className="p-medium">No interview sticker selected</p>
        )}
      </StickerContainer>
    </Container>
  );
};

export default ShowProtocolReference;
