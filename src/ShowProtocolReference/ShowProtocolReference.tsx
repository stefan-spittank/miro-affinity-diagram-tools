import * as React from "react";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { appId } from "../sharedConsts";
import styled from "styled-components";
import IWidget = SDK.IWidget;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 2rem;
`;

const StickerData = styled.div`
  margin-top: 1rem;
`;

const StickerContainer = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

const Sticker = styled.div`
  background-color: #fff9b8;
  border-radius: 4px;
  padding: 0.5rem;
  margin-bottom: 1.5rem;
  margin-right: 0.5rem;
`;

const isProtocolEntryStickers = (widget: IWidget): boolean =>
  widget.type === "STICKER" && widget.metadata[appId]?.protocolReference;

const ShowProtocolReference = () => {
  const [selectedSticker, setSelectedSticker] = useState<IWidget[]>([]);

  useEffect(() => {
    miro.addListener("SELECTION_UPDATED", (event) => {
      setSelectedSticker(event.data.filter(isProtocolEntryStickers));
    });
    miro.board.selection
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
        {selectedSticker.map((sticker: IWidget, index) => {
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

ReactDOM.render(<ShowProtocolReference />, document.getElementById("root"));
