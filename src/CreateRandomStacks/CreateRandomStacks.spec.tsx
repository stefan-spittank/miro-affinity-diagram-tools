import { DeepPartial } from "../../testHelper/mockMiro";
import { setupUserEventAndRender } from "../../testHelper/setupUserEventAndRender";
import { screen } from "@testing-library/react";
import * as React from "react";
import CreateRandomStacks from "./CreateRandomStacks";
import {
  getMockProtocolSticker,
  mockProtocolSticker,
  mockProtocolSticker2,
} from "../../testHelper/mockData";
import * as CreateRandomStackTools from "./CreateRandomStacks.tools";
import { ArrayStack } from "./CreateRandomStacks.tools";

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
    setupUserEventAndRender(
      <CreateRandomStacks setView={() => {}} selectedSticker={[]} />
    );
    expect(screen.getByText("Create Random Stacks")).toBeVisible();
  });
  it("should display the number of selected stickers with notes", async () => {
    setupUserEventAndRender(
      <CreateRandomStacks
        setView={() => {}}
        selectedSticker={
          [mockProtocolSticker, mockProtocolSticker2] as SDK.IStickerWidget[]
        }
      />
    );
    expect(
      screen.getByText("Selected number of stickers with notes: 2")
    ).toBeVisible();
  });

  it("should disable the 'Create random stacks' button with an explaining label if there are no note stickers selected", async () => {
    setupUserEventAndRender(
      <CreateRandomStacks setView={() => {}} selectedSticker={[]} />
    );

    const button = screen.getByRole("button", {
      name: "No interview stickers selected",
    });

    expect(button).toBeVisible();
    expect(button).toBeDisabled();
  });

  it("should enable the 'Create random stacks' button if there are note stickers selected", async () => {
    setupUserEventAndRender(
      <CreateRandomStacks
        setView={() => {}}
        selectedSticker={[mockProtocolSticker2] as SDK.IStickerWidget[]}
      />
    );

    const button = screen.getByRole("button", { name: "Create random stacks" });
    expect(button).toBeVisible();
    expect(button).toBeEnabled();
  });

  const getMockProtocolStickers = (
    stickerCount: number
  ): Partial<SDK.IStickerWidget>[] => {
    return Array.from({ length: stickerCount }, (_, index) =>
      getMockProtocolSticker("PROT1", "Entry " + index)
    );
  };

  it("should call calculate stacks and pass them to updateStickerPositionsForGivenStacks", async () => {
    const stickers = getMockProtocolStickers(6) as SDK.IStickerWidget[];
    const { user } = setupUserEventAndRender(
      <CreateRandomStacks setView={() => {}} selectedSticker={stickers} />
    );

    const mockStacks: ArrayStack<Partial<SDK.IWidget>>[] = [
      {
        elements: [stickers[5], stickers[1], stickers[2]],
      },
      {
        elements: [stickers[4], stickers[3], stickers[6]],
      },
    ];
    jest
      .spyOn(CreateRandomStackTools, "divideArrayIntoRandomStacks")
      .mockReturnValue(mockStacks);

    jest
      .spyOn(CreateRandomStackTools, "updateStickerPositionsForGivenStacks")
      .mockReturnValue(stickers as SDK.IStickerWidget[]);

    await user.type(screen.getByLabelText("Number of participants"), "2");
    const button = screen.getByRole("button", { name: "Create random stacks" });
    await user.click(button);

    expect(mockMiroInst.board.widgets.update).toHaveBeenCalledWith(stickers);
  });
});