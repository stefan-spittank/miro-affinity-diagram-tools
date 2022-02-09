import { DeepPartial } from "../../testHelper/mockMiro";
import { setupUserEventAndRender } from "../../testHelper/setupUserEventAndRender";
import { act, screen } from "@testing-library/react";
import * as React from "react";
import CreateRandomStacks from "./CreateRandomStacks";
import {
  mockProtocolSticker,
  mockProtocolSticker2,
} from "../../testHelper/mockData";

const mockMiroInst = {
  addListener: jest.fn(),
  board: {
    selection: {
      get: jest.fn(),
      selectWidgets: jest.fn(),
    },
    ui: {
      closeLeftSidebar: jest.fn(),
    },
    viewport: {
      get: jest.fn(),
      set: jest.fn(),
    },
    widgets: {
      update: jest.fn(),
    },
  },
  showNotification: jest.fn(),
  showErrorNotification: jest.fn(),
};

jest.mock("../miroInstance", () => ({
  getMiroInstance: jest.fn((): DeepPartial<SDK.Root> => mockMiroInst),
}));

describe("CreateRandomStacks", () => {
  let resolveBoardGetSelection: (selection: Partial<SDK.IWidget>[]) => void;
  beforeEach(() => {
    (mockMiroInst.board.selection.get as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveBoardGetSelection = resolve;
        })
    );
  });

  beforeEach(() => {
    (mockMiroInst.board.viewport.get as jest.Mock).mockReturnValue({
      x: 0,
      y: 0,
    });
    (mockMiroInst.board.widgets.update as jest.Mock).mockImplementation(
      (widgetsToBeUpdated: SDK.IWidget[]) => widgetsToBeUpdated
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the header", () => {
    setupUserEventAndRender(<CreateRandomStacks />);
    expect(screen.getByText("Create Random Stacks")).toBeVisible();
  });
  it("should display the number of selected stickers with notes", async () => {
    setupUserEventAndRender(<CreateRandomStacks />);
    await act(async () => {
      await resolveBoardGetSelection([
        mockProtocolSticker,
        mockProtocolSticker2,
      ]);
    });

    expect(
      screen.getByText("Selected number of stickers with notes: 2")
    ).toBeVisible();
  });

  it("should disable the 'Create random stacks' button with an explaining label if there are no note stickers selected", async () => {
    setupUserEventAndRender(<CreateRandomStacks />);
    await act(async () => {
      await resolveBoardGetSelection([]);
    });

    const button = screen.getByRole("button", {
      name: "No interview stickers selected",
    });

    expect(button).toBeVisible();
    expect(button).toBeDisabled();
  });

  it("should enable the 'Create random stacks' button if there are note stickers selected", async () => {
    setupUserEventAndRender(<CreateRandomStacks />);
    await act(async () => {
      await resolveBoardGetSelection([mockProtocolSticker2]);
    });

    const button = screen.getByRole("button", { name: "Create random stacks" });
    expect(button).toBeVisible();
    expect(button).toBeEnabled();
  });

  it("should move the stickers ", async () => {
    setupUserEventAndRender(<CreateRandomStacks />);
    await act(async () => {
      await resolveBoardGetSelection([mockProtocolSticker2]);
    });

    const button = screen.getByRole("button", { name: "Create random stacks" });
    expect(button).toBeVisible();
    expect(button).toBeEnabled();
  });
});
