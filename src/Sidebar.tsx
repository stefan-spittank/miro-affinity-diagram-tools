import * as React from "react";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { appId } from "./sharedConsts";
import styled from "styled-components";
import IWidget = SDK.IWidget;

const StickerData = styled.div`
  margin-top: 1rem;
`;

const Sidebar = () => {
  const [selectedSticker, setSelectedSticker] = useState<IWidget[]>([]);
  useEffect(() => {
    miro.addListener("SELECTION_UPDATED", (event) => {
      setSelectedSticker(
        event.data.filter(
          (widget: IWidget) =>
            widget.type === "STICKER" &&
            widget.metadata[appId]?.protocolReference
        )
      );
      //console.log("event", selectedSticker);
    });
  }, []);

  return (
    <div>
      <div className="cs1 ce12">
        <h1>Affinity Diagram</h1>
        <p>Original protocol reference</p>
      </div>
      <div>
        {selectedSticker.map((sticker, index) => (
          <StickerData key={index}>
            <strong>{sticker.metadata[appId]?.protocolReference}</strong>
            <div>{sticker.metadata[appId]?.originalText}</div>
          </StickerData>
        ))}
      </div>
    </div>
  );
};

ReactDOM.render(<Sidebar />, document.getElementById("root"));
