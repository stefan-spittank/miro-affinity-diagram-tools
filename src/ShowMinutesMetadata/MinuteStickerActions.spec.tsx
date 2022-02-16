import * as React from "react";
import { setupUserEventAndRender } from "../../testHelper/setupUserEventAndRender";
import MinuteStickerActions from "./MinuteStickerActions";
import { mockMinutesSticker } from "../../testHelper/mockData";
import { act, screen } from "@testing-library/react";
import * as MinuteActionConfirmationDialogModule from "./MinuteActionConfirmationDialog";

describe("MinuteStickerActions", () => {
  it("should render the edit button", () => {
    setupUserEventAndRender(
      <MinuteStickerActions
        sticker={mockMinutesSticker as SDK.IStickerWidget}
        stickerText="mock Sticker"
        setEditMode={() => {}}
        showSetAndRestoreActions={false}
      />
    );
    expect(
      screen.getByRole("button", {
        name: "Edit original note",
      })
    ).toBeVisible();
  });

  it("should not render the more options button if showSetAndRestoreActions is false", () => {
    setupUserEventAndRender(
      <MinuteStickerActions
        sticker={mockMinutesSticker as SDK.IStickerWidget}
        stickerText="mock Sticker"
        setEditMode={() => {}}
        showSetAndRestoreActions={false}
      />
    );

    expect(
      screen.queryByRole("button", {
        name: "Show more note sticker options",
      })
    ).not.toBeInTheDocument();
  });

  it("should render the more options button if showSetAndRestoreActions is true", () => {
    setupUserEventAndRender(
      <MinuteStickerActions
        sticker={mockMinutesSticker as SDK.IStickerWidget}
        stickerText="mock Sticker"
        setEditMode={() => {}}
        showSetAndRestoreActions={true}
      />
    );

    expect(
      screen.queryByRole("button", {
        name: "Show more note sticker options",
      })
    ).toBeVisible();
  });

  it("should call setEditMode with true if the user clicks on 'Edit original note'", async () => {
    const mockSetEditMode = jest.fn();
    const { user } = setupUserEventAndRender(
      <MinuteStickerActions
        sticker={mockMinutesSticker as SDK.IStickerWidget}
        stickerText="mock Sticker"
        setEditMode={mockSetEditMode}
        showSetAndRestoreActions={false}
      />
    );

    await user.click(
      screen.getByRole("button", { name: "Edit original note" })
    );

    expect(mockSetEditMode).toHaveBeenCalledWith(true);
  });

  it("should show the additional actions if the user clicks on 'Show more note sticker options'", async () => {
    const { user } = setupUserEventAndRender(
      <MinuteStickerActions
        sticker={mockMinutesSticker as SDK.IStickerWidget}
        stickerText="mock Sticker"
        setEditMode={() => {}}
        showSetAndRestoreActions={true}
      />
    );

    await user.click(
      screen.getByRole("button", { name: "Show more note sticker options" })
    );

    expect(
      screen.getByRole("button", { name: "Update note with sticker text ←" })
    ).toBeVisible();
    expect(
      screen.getByRole("button", { name: "Update sticker with note text →" })
    ).toBeVisible();
  });

  it("should show a confirmation dialog for the action UpdateNote", async () => {
    const mockMinuteActionConfirmationDialog = jest
      .spyOn(MinuteActionConfirmationDialogModule, "default")
      .mockReturnValue(<div>Mock Confirmation Dialog</div>);

    const { user } = setupUserEventAndRender(
      <MinuteStickerActions
        sticker={mockMinutesSticker as SDK.IStickerWidget}
        stickerText="mock Sticker"
        setEditMode={() => {}}
        showSetAndRestoreActions={true}
      />
    );

    await user.click(
      screen.getByRole("button", { name: "Show more note sticker options" })
    );
    await user.click(
      screen.getByRole("button", { name: "Update note with sticker text ←" })
    );

    expect(mockMinuteActionConfirmationDialog).toHaveBeenInstantiatedWith({
      action: "UpdateNote",
      warningMessage:
        "This will update the original note with the current text from the sticker.",
    });
  });

  it("should show a confirmation dialog for the action UpdateSticker", async () => {
    const mockMinuteActionConfirmationDialog = jest
      .spyOn(MinuteActionConfirmationDialogModule, "default")
      .mockReturnValue(<div>Mock Confirmation Dialog</div>);

    const { user } = setupUserEventAndRender(
      <MinuteStickerActions
        sticker={mockMinutesSticker as SDK.IStickerWidget}
        stickerText="mock Sticker"
        setEditMode={() => {}}
        showSetAndRestoreActions={true}
      />
    );

    await user.click(
      screen.getByRole("button", { name: "Show more note sticker options" })
    );
    await user.click(
      screen.getByRole("button", { name: "Update sticker with note text →" })
    );

    expect(mockMinuteActionConfirmationDialog).toHaveBeenInstantiatedWith({
      action: "UpdateSticker",
      warningMessage:
        "The current sticker text will be overwritten with the original note.",
    });
  });

  it("should hide the actions if the confirmation dialog calls the setShowActions callback with false", async () => {
    let setShowActionsCallback: (show: boolean) => void;
    jest
      .spyOn(MinuteActionConfirmationDialogModule, "default")
      .mockImplementation(({ setShowActions }) => {
        setShowActionsCallback = setShowActions;
        return <>Mock Confirmation Dialog</>;
      });

    const { user } = setupUserEventAndRender(
      <MinuteStickerActions
        sticker={mockMinutesSticker as SDK.IStickerWidget}
        stickerText="mock Sticker"
        setEditMode={() => {}}
        showSetAndRestoreActions={true}
      />
    );

    await user.click(
      screen.getByRole("button", { name: "Show more note sticker options" })
    );
    await user.click(
      screen.getByRole("button", { name: "Update sticker with note text →" })
    );

    act(() => {
      setShowActionsCallback!(false);
    });

    expect(
      screen.queryByRole("button", { name: "Update note with sticker text ←" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Update sticker with note text →" })
    ).not.toBeInTheDocument();
  });

  it("should hide the confirmation dialog if it calls the setWarningMessage callback with undefined", async () => {
    let setWarningMessageCallback: (message?: string) => void;
    jest
      .spyOn(MinuteActionConfirmationDialogModule, "default")
      .mockImplementation(({ setWarningMessage }) => {
        setWarningMessageCallback = setWarningMessage;
        return <>Mock Confirmation Dialog</>;
      });

    const { user } = setupUserEventAndRender(
      <MinuteStickerActions
        sticker={mockMinutesSticker as SDK.IStickerWidget}
        stickerText="mock Sticker"
        setEditMode={() => {}}
        showSetAndRestoreActions={true}
      />
    );

    await user.click(
      screen.getByRole("button", { name: "Show more note sticker options" })
    );
    await user.click(
      screen.getByRole("button", { name: "Update sticker with note text →" })
    );

    act(() => {
      setWarningMessageCallback!(undefined);
    });

    expect(
      screen.queryByText(
        "The current sticker text will be overwritten with the original note."
      )
    ).not.toBeInTheDocument();
  });
});
