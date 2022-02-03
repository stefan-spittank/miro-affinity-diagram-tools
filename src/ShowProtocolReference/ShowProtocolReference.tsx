import * as React from "react";
import { useEffect, useState } from "react";
import { appId } from "../sharedConsts";
import {
  Container,
  Sticker,
  StickerContainer,
  StickerData,
} from "./ShowProtocolReference.styles";
import { isProtocolEntryStickers } from "./ShowProtocolReference.helper";
import { getMiroInstance } from "../miroInstance";

const ShowProtocolReference = () => {
  const miroInstance = getMiroInstance();

  const [selectedSticker, setSelectedSticker] = useState<SDK.IWidget[]>([]);

  useEffect(() => {
    miroInstance.addListener("SELECTION_UPDATED", (event) => {
      setSelectedSticker(event.data.filter(isProtocolEntryStickers));
    });
    miroInstance.board.selection
      .get()
      .then((widgets) =>
        setSelectedSticker(widgets.filter(isProtocolEntryStickers))
      );
  }, []);

  return (
    <Container>
      <div className="cs1 ce12">
        <h1>Affinity Diagram</h1>
        <p>Original protocol reference</p>
      </div>
      <StickerContainer>
        {selectedSticker.map((sticker: SDK.IWidget, index) => {
          return (
            <StickerData key={index}>
              <strong>{sticker.metadata[appId]?.protocolReference}</strong>
              <Sticker>{sticker.metadata[appId]?.originalText}</Sticker>
            </StickerData>
          );
        })}
      </StickerContainer>
    </Container>
  );
};

export default ShowProtocolReference;
