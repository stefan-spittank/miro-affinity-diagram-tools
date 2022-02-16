import * as React from "react";
import { Grid, StickerEditor } from "./ShowMinutesMetadata.styles";
import { useEffect, useState } from "react";
import { appId } from "../sharedConsts";
import { getMiroInstance } from "../miroInstance";
import { useMiro } from "../MiroProvider/MiroProvider";

type OriginalMinuteEditorProps = {
  originalText: string;
  setEditStickerId: (id?: string) => void;
  sticker: SDK.IStickerWidget;
};

const OriginalMinuteEditor = ({
  originalText,
  setEditStickerId,
  sticker,
}: OriginalMinuteEditorProps) => {
  const [text, setText] = useState("");
  const miroInstance = getMiroInstance();
  const { refreshSticker } = useMiro();
  useEffect(() => {
    setText(originalText);
  }, [originalText, setText]);

  useEffect(() => {
    const eventHandler = (evt: Event) => {
      if (evt instanceof KeyboardEvent && evt.key.toLowerCase() == "escape") {
        // Escape key pressed
        setText(originalText);
        setEditStickerId(undefined);
      }
    };
    document.addEventListener("keydown", eventHandler);
    return () => document.removeEventListener("keydown", eventHandler);
  }, []);

  return (
    <Grid>
      <StickerEditor
        className="textarea"
        value={text}
        onChange={(event) => setText(event.target.value)}
        autoFocus
        onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
          // Todo: Allow Shift+Enter to enter a new line
          // so far the diffing view will not handle this correctly
          if (e.key.toLowerCase() === "enter") {
            e.preventDefault();
            e.currentTarget.blur();
          }
        }}
        onBlur={async () => {
          setEditStickerId(undefined);
          if (text !== originalText) {
            const updatedSticker = {
              ...sticker,
              ...(sticker.text === originalText ? { text } : {}),
              metadata: {
                [appId]: {
                  ...sticker.metadata[appId],
                  originalText: text,
                },
              },
            };
            await miroInstance.board.widgets.update(updatedSticker);
            await refreshSticker();
          }
        }}
      />
      {/* The following div is needed to keep the widget size between edit and non edit */}
      <div>{originalText}</div>
    </Grid>
  );
};

export default OriginalMinuteEditor;
