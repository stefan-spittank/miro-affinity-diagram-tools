import * as React from "react";
import { appId, ViewProps } from "../sharedConsts";
import {
  Container,
  Sticker,
  StickerContainer,
  StickerData,
} from "./ShowProtocolReference.styles";
import { Breadcrumb } from "../SharedComponents/Breadcrumb";

const ShowProtocolReference = ({ setView, selectedSticker }: ViewProps) => {
  return (
    <Container>
      <div className="cs1 ce12">
        <h2>
          <Breadcrumb
            href=""
            onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
              e.preventDefault();
              setView("Overview");
            }}
          >
            Affinity Diagram Tools /
          </Breadcrumb>
          View original interview notes
        </h2>
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
