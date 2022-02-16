import * as React from "react";
import { setupUserEventAndRender } from "../../testHelper/setupUserEventAndRender";
import { mockMinutesSticker } from "../../testHelper/mockData";
import { screen } from "@testing-library/react";
import MinuteActionConfirmationDialog from "./MinuteActionConfirmationDialog";
import { DeepPartial } from "../../testHelper/mockMiro";
import { appId } from "../sharedConsts";

const mockMiroInst = {
  board: {
    widgets: {
      update: jest.fn(),
    },
  },
};

jest.mock("../miroInstance", () => ({
  getMiroInstance: jest.fn((): DeepPartial<SDK.Root> => mockMiroInst),
}));

describe("MinuteActionConfirmationDialog", () => {
  it("should render the warning message", () => {
    const warningMessage = "test warning message";
    setupUserEventAndRender(
      <MinuteActionConfirmationDialog
        sticker={mockMinutesSticker as SDK.IStickerWidget}
        stickerText="mock Sticker"
        warningMessage={warningMessage}
        setWarningMessage={() => {}}
        setShowActions={() => {}}
        action={"UpdateNote"}
      />
    );
    expect(screen.getByText(warningMessage)).toBeVisible();
  });

  it("should call setWarningMessage with undefined if the user clicks on cancel", async () => {
    const mockSetWarningMessage = jest.fn();

    const { user } = setupUserEventAndRender(
      <MinuteActionConfirmationDialog
        sticker={mockMinutesSticker as SDK.IStickerWidget}
        stickerText="mock Sticker"
        warningMessage="mock warning message"
        setWarningMessage={mockSetWarningMessage}
        setShowActions={() => {}}
        action={"UpdateNote"}
      />
    );

    await user.click(screen.getByRole("button", { name: "Cancel" }));

    expect(mockSetWarningMessage).toHaveBeenCalledWith(undefined);
  });

  it(
    "should update the sticker text with the original note if the action is 'UpdateSticker' " +
      "and the user clicks on 'Yes, update the sticker'",
    async () => {
      const { user } = setupUserEventAndRender(
        <MinuteActionConfirmationDialog
          sticker={mockMinutesSticker as SDK.IStickerWidget}
          stickerText="mock Sticker"
          warningMessage="mock warning message"
          setWarningMessage={() => {}}
          setShowActions={() => {}}
          action={"UpdateSticker"}
        />
      );
      await user.click(
        screen.getByRole("button", { name: "Yes, update the sticker" })
      );

      expect(mockMiroInst.board.widgets.update).toHaveBeenCalledWith({
        ...mockMinutesSticker,
        text: mockMinutesSticker.metadata[appId].originalText,
      });
    }
  );

  it(
    "should update the original note with the sticker text if the action is 'UpdateNote' " +
      "and the user clicks on 'Yes, update the sticker'",
    async () => {
      const mockStickerText = "Modified sticker text from board";
      const { user } = setupUserEventAndRender(
        <MinuteActionConfirmationDialog
          sticker={mockMinutesSticker as SDK.IStickerWidget}
          stickerText={mockStickerText}
          warningMessage="mock warning message"
          setWarningMessage={() => {}}
          setShowActions={() => {}}
          action={"UpdateNote"}
        />
      );
      await user.click(
        screen.getByRole("button", { name: "Yes, update the note" })
      );

      expect(mockMiroInst.board.widgets.update).toHaveBeenCalledWith({
        ...mockMinutesSticker,
        metadata: {
          [appId]: {
            ...mockMinutesSticker.metadata[appId],
            originalText: mockStickerText,
          },
        },
      });
    }
  );
});
