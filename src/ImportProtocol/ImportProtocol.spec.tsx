import * as React from "react";
import ImportProtocol from "./ImportProtocol";
import { screen } from "@testing-library/react";
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
      closeLibrary: jest.fn(),
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
};

jest.mock("../miroInstance", () => ({
  getMiroInstance: jest.fn((): DeepPartial<SDK.Root> => mockMiroInst),
}));

describe("ImportProtocol", () => {
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
    setupUserEventAndRender(<ImportProtocol />);
    expect(
      screen.getByText("Create stickers from your recent protocol")
    ).toBeVisible();
  });

  it("should render a preview sticker for each line of text pasted into the protocolEntries", async () => {
    const { user } = setupUserEventAndRender(<ImportProtocol />);

    const testProtocolLines = ["First line", "Second line", "Third line"];
    screen.getByLabelText("Paste the protocol below").focus();
    await user.paste(testProtocolLines.join("\n"));

    testProtocolLines.forEach((line) =>
      expect(screen.getByText(line)).toBeVisible()
    );
  });

  it(
    "should render a prefix containing the given metaData and an index starting with 1 for each line of text" +
      " pasted into the protocolEntries",
    async () => {
      const { user } = setupUserEventAndRender(<ImportProtocol />);

      const testProtocolLines = ["First line", "Second line", "Third line"];
      screen.getByLabelText("Paste the protocol below").focus();
      await user.paste(testProtocolLines.join("\n"));
      const metaData = "SSP-IVE";
      await user.type(
        screen.getByLabelText("Protocol reference prefix"),
        metaData
      );

      testProtocolLines.forEach((_, index) =>
        expect(screen.getByText(`${metaData}-${index + 1}`)).toBeVisible()
      );
    }
  );

  it(
    "should render a prefix containing a hash and an index starting with 1 for each line of text pasted into the" +
      " protocolEntries if no meta data were given",
    async () => {
      const { user } = setupUserEventAndRender(<ImportProtocol />);

      const testProtocolLines = ["First line", "Second line", "Third line"];
      screen.getByLabelText("Paste the protocol below").focus();
      await user.paste(testProtocolLines.join("\n"));

      testProtocolLines.forEach((_, index) =>
        expect(screen.getByText(`#${index + 1}`)).toBeVisible()
      );
    }
  );

  it("should not create any widgets without a protocol", async () => {
    const { user } = setupUserEventAndRender(<ImportProtocol />);

    const createButton = screen.getByRole("button", { name: "Create sticker" });
    await user.click(createButton);

    expect(createButton).toBeDisabled();
    expect(mockMiroInst.board.widgets.create).not.toHaveBeenCalled();
  });

  it("should create a widget for each line of the protocol", async () => {
    const { user } = setupUserEventAndRender(<ImportProtocol />);

    const testProtocolLines = ["First line", "Second line", "Third line"];
    screen.getByLabelText("Paste the protocol below").focus();
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

  it("should add the original text to the widgets metadata", async () => {
    const { user } = setupUserEventAndRender(<ImportProtocol />);

    const testProtocolLines = ["First line", "Second line", "Third line"];
    screen.getByLabelText("Paste the protocol below").focus();
    await user.paste(testProtocolLines.join("\n"));
    const metaData = "SSP-IVE";
    await user.type(
      screen.getByLabelText("Protocol reference prefix"),
      metaData
    );
    await user.click(screen.getByRole("button", { name: "Create sticker" }));

    expect(mockMiroInst.board.widgets.create).toHaveBeenCalledWith(
      testProtocolLines.map((line, index) =>
        expect.objectContaining({
          metadata: {
            [appId]: {
              protocolReference: `${metaData}-${index + 1}`,
              originalText: line,
            },
          },
        })
      )
    );
  });

  it("should create a tag for the protocol and add it to all created widgets", async () => {
    const { user } = setupUserEventAndRender(<ImportProtocol />);

    const testProtocolLines = ["First line", "Second line", "Third line"];

    screen.getByLabelText("Paste the protocol below").focus();
    await user.paste(testProtocolLines.join("\n"));

    const metaData = "SSP-IVE";
    await user.type(
      screen.getByLabelText("Protocol reference prefix"),
      metaData
    );
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

  it("should add it all created widgets to an existing tag (if the protocol tag exists)", async () => {
    const { user } = setupUserEventAndRender(<ImportProtocol />);
    const metaData = "SSP-IVE";

    const existingTag = {
      id: 1,
      title: metaData,
      widgetIds: [43, 45],
    };
    (mockMiroInst.board.tags.get as jest.Mock).mockReturnValue([existingTag]);

    const testProtocolLines = ["First line", "Second line", "Third line"];

    screen.getByLabelText("Paste the protocol below").focus();
    await user.paste(testProtocolLines.join("\n"));

    await user.type(
      screen.getByLabelText("Protocol reference prefix"),
      metaData
    );
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
    const { user } = setupUserEventAndRender(<ImportProtocol />);

    const testProtocolLines = ["First line", "Second line", "Third line"];

    screen.getByLabelText("Paste the protocol below").focus();
    await user.paste(testProtocolLines.join("\n"));

    await user.click(screen.getByRole("button", { name: "Create sticker" }));

    expect(mockMiroInst.board.selection.selectWidgets).toHaveBeenCalledWith(
      testProtocolLines.map((_, index) =>
        expect.objectContaining({ id: index })
      )
    );
  });
});
