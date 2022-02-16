import * as React from "react";
import { useState } from "react";
import { Container } from "./MinuteStickerActions.styles";
import { MinuteActions } from "./MinuteActions";
import MinuteActionConfirmationDialog from "./MinuteActionConfirmationDialog";
import { Actions } from "./ShowMinutesMetadata.styles";

type MinuteStickerActionsProps = {
  sticker: SDK.IWidget;
  stickerText: string;
  showSetAndRestoreActions: boolean;
  setEditStickerId: (id?: string) => void;
};

const MinuteStickerActions = ({
  sticker,
  stickerText,
  showSetAndRestoreActions,
  setEditStickerId,
}: MinuteStickerActionsProps) => {
  const [showActions, setShowActions] = useState(false);
  const [warningMessage, setWarningMessage] = useState<string | undefined>();
  const [action, setAction] = useState<MinuteActions>("UpdateNote");

  const editButton = (
    <Actions>
      <button
        title="Edit original note"
        className="button-icon button-icon-small icon-edit"
        onClick={() => setEditStickerId(sticker.id)}
      />
      {showSetAndRestoreActions && (
        <button
          title="Show more note sticker options"
          className={`button-icon button-icon-small ${
            showActions ? "icon-close" : "icon-more"
          }`}
          onClick={() => {
            setShowActions(!showActions);
          }}
        />
      )}
    </Actions>
  );

  if (!showActions) {
    return editButton;
  }

  return (
    <>
      {editButton}
      {!warningMessage ? (
        <Container>
          <button
            className="button button-small button-secondary"
            onClick={() => {
              setAction("UpdateNote");
              setWarningMessage(
                "This will update the original note with the current text from the sticker."
              );
            }}
          >
            Update note with sticker text ←
          </button>
          <button
            className="button button-small button-secondary"
            onClick={() => {
              setAction("UpdateSticker");
              setWarningMessage(
                "The current sticker text will be overwritten with the original note."
              );
            }}
          >
            Update sticker with note text →
          </button>
        </Container>
      ) : (
        <MinuteActionConfirmationDialog
          warningMessage={warningMessage}
          action={action}
          sticker={sticker}
          setShowActions={setShowActions}
          setWarningMessage={setWarningMessage}
          stickerText={stickerText}
        />
      )}
    </>
  );
};

export default MinuteStickerActions;
