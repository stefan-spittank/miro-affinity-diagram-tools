import * as React from "react";
import { useState } from "react";
import { appId, ViewProps } from "../sharedConsts";
import {
  ChangedWord,
  Container,
  OriginalWord,
  Sticker,
  StickerContainer,
  StickerData,
  Wrap,
} from "./ShowMinutesMetadata.styles";
import { Breadcrumb } from "../SharedComponents/Breadcrumb";
import { useMiro } from "../MiroProvider/MiroProvider";
import MinuteStickerActions from "./MinuteStickerActions";
import OriginalMinuteEditor from "./OriginalMinuteEditor";

const ShowMinutesMetadata = ({ setView }: ViewProps) => {
  const { selectedSticker } = useMiro();
  const [editStickerId, setEditStickerId] = useState<string | undefined>();
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
          selectedSticker.map((sticker: SDK.IWidget) => {
            const originalText = sticker.metadata[appId]?.originalText || "";
            const wordsInOriginal = originalText.split(/\b/);
            const stickerText = (sticker as SDK.IStickerWidget).plainText || "";
            const wordsInSticker = stickerText.split(/\s*\b\s*/);
            const textHasChanged = stickerText !== originalText;
            return (
              <div key={sticker.id}>
                <StickerData>
                  <Wrap>
                    <strong>{sticker.metadata[appId]?.minutesReference}</strong>

                    <MinuteStickerActions
                      stickerText={stickerText}
                      sticker={sticker}
                      setEditStickerId={setEditStickerId}
                      showSetAndRestoreActions={textHasChanged}
                    />
                  </Wrap>
                  <Sticker
                    data-testid={"sticker-" + sticker.id}
                    onDoubleClick={() => {
                      setEditStickerId(sticker.id);
                    }}
                  >
                    {editStickerId === sticker.id ? (
                      <OriginalMinuteEditor
                        sticker={sticker as SDK.IStickerWidget}
                        originalText={originalText}
                        setEditStickerId={setEditStickerId}
                      />
                    ) : (
                      wordsInOriginal.map((word: string, i: number) => {
                        if (!textHasChanged) {
                          return <span key={i}>{word}</span>;
                        }
                        return wordsInSticker.includes(word) ? (
                          <OriginalWord key={i}>{word}</OriginalWord>
                        ) : (
                          <ChangedWord key={i}>{word}</ChangedWord>
                        );
                      })
                    )}
                  </Sticker>
                </StickerData>
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

export default ShowMinutesMetadata;
