import * as React from "react";
import { Container } from "./MinuteStickerActions.styles";
import { appId } from "../sharedConsts";
import { MinuteActions } from "./MinuteActions";
import { getMiroInstance } from "../miroInstance";
import { useMiro } from "../MiroProvider/MiroProvider";

type MinuteActionConfirmationDialogProps = {
  sticker: SDK.IWidget;
  stickerText: string;
  warningMessage: string;
  action: MinuteActions;
  setShowActions: (show: boolean) => void;
  setWarningMessage: (show?: string) => void;
};

const MinuteActionConfirmationDialog = ({
  warningMessage,
  action,
  setShowActions,
  setWarningMessage,
  sticker,
  stickerText,
}: MinuteActionConfirmationDialogProps) => {
  const miroInstance = getMiroInstance();
  const { refreshSticker } = useMiro();

  return (
    <Container>
      <p className="p-medium">{warningMessage}</p>
      <p className="p-medium">Are you sure, that you want to do this?</p>
      <button
        className={"button button-danger button-small"}
        onClick={async () => {
          const updatedSticker =
            action === "UpdateSticker"
              ? {
                  ...sticker,
                  text: sticker.metadata[appId].originalText,
                }
              : {
                  ...sticker,
                  metadata: {
                    [appId]: {
                      ...sticker.metadata[appId],
                      originalText: stickerText,
                    },
                  },
                };
          await miroInstance.board.widgets.update(updatedSticker);
          await refreshSticker();
          setShowActions(false);
        }}
      >
        {action === "UpdateSticker"
          ? "Yes, update the sticker"
          : "Yes, update the note"}
      </button>
      <button
        className="button button-small button-secondary"
        onClick={() => setWarningMessage(undefined)}
      >
        Cancel
      </button>
    </Container>
  );
};

export default MinuteActionConfirmationDialog;
