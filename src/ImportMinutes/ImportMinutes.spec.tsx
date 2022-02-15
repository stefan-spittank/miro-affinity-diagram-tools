import * as React from "react";
import ImportMinutes from "./ImportMinutes";
import { fireEvent, screen } from "@testing-library/react";
import { DeepPartial } from "../../testHelper/mockMiro";
import { appId } from "../sharedConsts";
import { setupUserEventAndRender } from "../../testHelper/setupUserEventAndRender";

const mockMiroInst = {
  board: {
    tags: {
      get: jest.fn(),
      update: jest.fn(),
      create: jest.fn(),
    },
    selection: {
      selectWidgets: jest.fn(),
    },
    ui: {
      closeModal: jest.fn(),
    },
    viewport: {
      get: jest.fn(),
      set: jest.fn(),
    },
    widgets: {
      create: jest.fn(),
    },
  },
  showNotification: jest.fn(),
  showErrorNotification: jest.fn(),
};

jest.mock("../miroInstance", () => ({
  getMiroInstance: jest.fn((): DeepPartial<SDK.Root> => mockMiroInst),
}));

describe("ImportMinutes", () => {
  beforeEach(() => {
    (mockMiroInst.board.viewport.get as jest.Mock).mockReturnValue({
      x: 0,
      y: 0,
    });
    (mockMiroInst.board.widgets.create as jest.Mock).mockImplementation(
      (widgetsToBeCreated: SDK.WidgetToBeCreated[]) =>
        widgetsToBeCreated.map((widget, index) => ({ ...widget, id: index }))
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the header", () => {
    setupUserEventAndRender(<ImportMinutes />);
    expect(
      screen.getByText("Create stickers for your recent user interview")
    ).toBeVisible();
  });

  it("should render a preview sticker for each line of text pasted into the protocolEntries", async () => {
    const { user } = setupUserEventAndRender(<ImportMinutes />);

    const testProtocolLines = ["First line", "Second line", "Third line"];
    screen.getByLabelText("Paste the minutes below").focus();
    await user.paste(testProtocolLines.join("\n"));

    testProtocolLines.forEach((line) =>
      expect(screen.getByText(line)).toBeVisible()
    );
  });

  it(
    "should render a prefix containing the given metaData and an index starting with 1 for each line of text" +
      " pasted into the protocolEntries",
    async () => {
      const { user } = setupUserEventAndRender(<ImportMinutes />);

      const testProtocolLines = ["First line", "Second line", "Third line"];
      screen.getByLabelText("Paste the minutes below").focus();
      await user.paste(testProtocolLines.join("\n"));
      const metaData = "SSP-IVE";
      await user.type(screen.getByLabelText("User Code (optional)"), metaData);

      testProtocolLines.forEach((_, index) =>
        expect(screen.getByText(`${metaData}-${index + 1}`)).toBeVisible()
      );
    }
  );

  it(
    "should render a prefix containing a hash and an index starting with 1 for each line of text pasted into the" +
      " protocolEntries if no meta data were given",
    async () => {
      const { user } = setupUserEventAndRender(<ImportMinutes />);

      const testProtocolLines = ["First line", "Second line", "Third line"];
      screen.getByLabelText("Paste the minutes below").focus();
      await user.paste(testProtocolLines.join("\n"));

      testProtocolLines.forEach((_, index) =>
        expect(screen.getByText(`#${index + 1}`)).toBeVisible()
      );
    }
  );

  it("should not create any widgets without minutes", async () => {
    const { user } = setupUserEventAndRender(<ImportMinutes />);

    const createButton = screen.getByRole("button", { name: "Create sticker" });
    await user.click(createButton);

    expect(createButton).toBeDisabled();
    expect(mockMiroInst.board.widgets.create).not.toHaveBeenCalled();
  });

  it("should create a widget for each line of the minutes", async () => {
    const { user } = setupUserEventAndRender(<ImportMinutes />);

    const testProtocolLines = ["First line", "Second line", "Third line"];
    screen.getByLabelText("Paste the minutes below").focus();
    await user.paste(testProtocolLines.join("\n"));
    await user.click(screen.getByRole("button", { name: "Create sticker" }));

    expect(mockMiroInst.board.widgets.create).toHaveBeenCalledWith(
      testProtocolLines.map((line) =>
        expect.objectContaining({
          text: line,
          type: "sticker",
        })
      )
    );
  });

  it("should show an error notification, if the widget creation fails", async () => {
    const { user } = setupUserEventAndRender(<ImportMinutes />);

    (mockMiroInst.board.widgets.create as jest.Mock).mockRejectedValue(
      new Error("Forbidden")
    );

    const testProtocolLines = ["First line", "Second line", "Third line"];
    screen.getByLabelText("Paste the minutes below").focus();
    await user.paste(testProtocolLines.join("\n"));
    await user.click(screen.getByRole("button", { name: "Create sticker" }));

    expect(mockMiroInst.showErrorNotification).toHaveBeenCalledWith(
      "Could not create widgets. Error: Forbidden"
    );
  });

  it("should not create a widget for an empty line of the minutes", async () => {
    const { user } = setupUserEventAndRender(<ImportMinutes />);

    const testProtocolLines = ["First line", "", "Third line"];
    screen.getByLabelText("Paste the minutes below").focus();
    await user.paste(testProtocolLines.join("\n"));
    await user.click(screen.getByRole("button", { name: "Create sticker" }));

    expect(mockMiroInst.board.widgets.create).not.toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          text: "",
          type: "sticker",
        }),
      ])
    );
  });

  it("should add the original text to the widgets metadata", async () => {
    const { user } = setupUserEventAndRender(<ImportMinutes />);

    const testProtocolLines = ["First line", "Second line", "Third line"];
    screen.getByLabelText("Paste the minutes below").focus();
    await user.paste(testProtocolLines.join("\n"));
    const metaData = "SSP-IVE";
    await user.type(screen.getByLabelText("User Code (optional)"), metaData);
    await user.click(screen.getByRole("button", { name: "Create sticker" }));

    expect(mockMiroInst.board.widgets.create).toHaveBeenCalledWith(
      testProtocolLines.map((line, index) =>
        expect.objectContaining({
          metadata: {
            [appId]: {
              minutesReference: `${metaData}-${index + 1}`,
              originalText: line,
            },
          },
        })
      )
    );
  });

  it("should create a tag for the minutes and add it to all created widgets", async () => {
    const { user } = setupUserEventAndRender(<ImportMinutes />);

    const testProtocolLines = ["First line", "Second line", "Third line"];

    screen.getByLabelText("Paste the minutes below").focus();
    await user.paste(testProtocolLines.join("\n"));

    const metaData = "SSP-IVE";
    await user.type(screen.getByLabelText("User Code (optional)"), metaData);
    await user.click(screen.getByRole("button", { name: "Create sticker" }));

    expect(mockMiroInst.board.tags.create).toHaveBeenCalledWith({
      title: metaData,
      color: "#F24726",
      widgetIds: testProtocolLines.map((_, index) =>
        expect.objectContaining({
          id: index,
        })
      ),
    });
  });

  it("should add it all created widgets to an existing tag (if the minutes tag exists)", async () => {
    const { user } = setupUserEventAndRender(<ImportMinutes />);
    const metaData = "SSP-IVE";

    const existingTag = {
      id: 1,
      title: metaData,
      widgetIds: [43, 45],
    };
    (mockMiroInst.board.tags.get as jest.Mock).mockReturnValue([existingTag]);

    const testProtocolLines = ["First line", "Second line", "Third line"];

    screen.getByLabelText("Paste the minutes below").focus();
    await user.paste(testProtocolLines.join("\n"));

    await user.type(screen.getByLabelText("User Code (optional)"), metaData);
    await user.click(screen.getByRole("button", { name: "Create sticker" }));

    expect(mockMiroInst.board.tags.create).not.toHaveBeenCalledWith();
    expect(mockMiroInst.board.tags.update).toHaveBeenCalledWith({
      ...existingTag,
      widgetIds: [
        //Keep the existing widgets of the tag
        ...existingTag.widgetIds,
        // Add the new widgets to the tag
        ...testProtocolLines.map((_, index) => index),
      ],
    });
  });

  it("should select the created widgets", async () => {
    const { user } = setupUserEventAndRender(<ImportMinutes />);

    const testProtocolLines = ["First line", "Second line", "Third line"];

    screen.getByLabelText("Paste the minutes below").focus();
    await user.paste(testProtocolLines.join("\n"));

    await user.click(screen.getByRole("button", { name: "Create sticker" }));

    expect(mockMiroInst.board.selection.selectWidgets).toHaveBeenCalledWith(
      testProtocolLines.map((_, index) =>
        expect.objectContaining({ id: index })
      )
    );
  });

  it("should close the modal if the user clicks on cancel", async () => {
    const { user } = setupUserEventAndRender(<ImportMinutes />);

    await user.click(screen.getByRole("button", { name: "Cancel" }));

    expect(mockMiroInst.board.ui.closeModal).toHaveBeenCalled();
  });

  it("should close the modal if the presses escape", async () => {
    setupUserEventAndRender(<ImportMinutes />);
    fireEvent.keyDown(
      screen.getByText("Create stickers for your recent user interview"),
      {
        key: "Escape",
        code: "Escape",
      }
    );
    expect(mockMiroInst.board.ui.closeModal).toHaveBeenCalled();
  });
});
