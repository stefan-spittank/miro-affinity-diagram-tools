import * as React from "react";
import { setupUserEventAndRender } from "../../testHelper/setupUserEventAndRender";
import { mockMinutesSticker } from "../../testHelper/mockData";
import { fireEvent, screen } from "@testing-library/react";
import OriginalMinuteEditor from "./OriginalMinuteEditor";
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

describe("OriginalMinuteEditor", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should render a textarea with given text", () => {
    const mockOriginalText = "mock original text";
    setupUserEventAndRender(
      <OriginalMinuteEditor
        sticker={mockMinutesSticker as SDK.IStickerWidget}
        setEditMode={() => {}}
        originalText={mockOriginalText}
      />
    );
    expect(screen.getByRole("textbox")).toHaveValue(mockOriginalText);
  });

  it("should update the original note if the user changes the text and leaves the field", async () => {
    const orgininalText = "original text";
    const { user } = setupUserEventAndRender(
      <OriginalMinuteEditor
        sticker={mockMinutesSticker as SDK.IStickerWidget}
        setEditMode={() => {}}
        originalText={orgininalText}
      />
    );

    const textEnteredByUser = " added text";
    const textbox = screen.getByRole("textbox");
    await user.type(textbox, textEnteredByUser);
    textbox.blur();

    expect(mockMiroInst.board.widgets.update).toHaveBeenCalledWith(
      expect.objectContaining({
        metadata: {
          [appId]: expect.objectContaining({
            originalText: orgininalText + textEnteredByUser,
          }),
        },
      })
    );
  });

  it("should update the original note if the user changes the text and presses enter", async () => {
    const orgininalText = "original text";
    const { user } = setupUserEventAndRender(
      <OriginalMinuteEditor
        sticker={mockMinutesSticker as SDK.IStickerWidget}
        setEditMode={() => {}}
        originalText={orgininalText}
      />
    );

    const textEnteredByUser = " added text";
    const textbox = screen.getByRole("textbox");
    await user.type(textbox, textEnteredByUser);
    fireEvent.keyDown(textbox, {
      key: "Enter",
      code: "Enter",
    });

    expect(mockMiroInst.board.widgets.update).toHaveBeenCalledWith(
      expect.objectContaining({
        metadata: {
          [appId]: expect.objectContaining({
            originalText: orgininalText + textEnteredByUser,
          }),
        },
      })
    );
  });

  it(
    "should update the sticker text if the user changes the text and leaves the field" +
      " for a widget which text was still the original note",
    async () => {
      const orgininalText = (mockMinutesSticker as SDK.IStickerWidget).text;
      const { user } = setupUserEventAndRender(
        <OriginalMinuteEditor
          sticker={mockMinutesSticker as SDK.IStickerWidget}
          setEditMode={() => {}}
          originalText={orgininalText}
        />
      );

      const textEnteredByUser = " added text";
      const textbox = screen.getByRole("textbox");
      await user.type(textbox, textEnteredByUser);
      textbox.blur();

      expect(mockMiroInst.board.widgets.update).toHaveBeenCalledWith(
        expect.objectContaining({
          text: orgininalText + textEnteredByUser,
        })
      );
    }
  );

  it(
    "should not update the sticker text if the user changes the text and leaves the field" +
      " for a widget whose text was changed and no longer the original note",
    async () => {
      const orgininalText = "Original Text";
      const widgetWhichTextNoLongerMatchesOriginalNote = {
        ...mockMinutesSticker,
        text: "Text had already been changed",
      };
      const { user } = setupUserEventAndRender(
        <OriginalMinuteEditor
          sticker={
            widgetWhichTextNoLongerMatchesOriginalNote as SDK.IStickerWidget
          }
          setEditMode={() => {}}
          originalText={orgininalText}
        />
      );

      const textEnteredByUser = " added text";
      const textbox = screen.getByRole("textbox");
      await user.type(textbox, textEnteredByUser);
      textbox.blur();

      expect(mockMiroInst.board.widgets.update).not.toHaveBeenCalledWith(
        expect.objectContaining({
          text: orgininalText + textEnteredByUser,
        })
      );
    }
  );

  it("should not update the original note if the user changes the text and presses Escape", async () => {
    const orgininalText = "original text";
    const { user } = setupUserEventAndRender(
      <OriginalMinuteEditor
        sticker={mockMinutesSticker as SDK.IStickerWidget}
        setEditMode={() => {}}
        originalText={orgininalText}
      />
    );

    const textEnteredByUser = " added text";
    const textbox = screen.getByRole("textbox");
    await user.type(textbox, textEnteredByUser);
    fireEvent.keyDown(textbox, {
      key: "Escape",
      code: "Escape",
    });
    textbox.blur();

    expect(mockMiroInst.board.widgets.update).not.toHaveBeenCalled();
  });
});
