import * as React from "react";
import { useEffect, useState } from "react";
import { appId } from "../sharedConsts";
import {
  Container,
  Sticker,
  StickerContainer,
  StickerData,
} from "./ShowProtocolReference.styles";
import { isProtocolEntrySticker } from "../Tools/interviewStickerTools";
import { getMiroInstance } from "../miroInstance";

const ShowProtocolReference = () => {
  const miroInstance = getMiroInstance();

  const [selectedSticker, setSelectedSticker] = useState<SDK.IWidget[]>([]);

  useEffect(() => {
    miroInstance.addListener("SELECTION_UPDATED", (event) => {
      setSelectedSticker(event.data.filter(isProtocolEntrySticker));
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
        <h2>View original interview notes</h2>
      </div>
      <StickerContainer>
        {selectedSticker.length > 0 ? (
          selectedSticker.map((sticker: SDK.IWidget, index) => {
            return (
              <StickerData key={index}>
                <strong>{sticker.metadata[appId]?.protocolReference}</strong>
                <Sticker>{sticker.metadata[appId]?.originalText}</Sticker>
              </StickerData>
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
