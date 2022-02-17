import { DeepPartial } from "../../testHelper/mockMiro";
import { setupUserEventAndRender } from "../../testHelper/setupUserEventAndRender";
import { screen } from "@testing-library/react";
import * as React from "react";
import CreateRandomStacks from "./CreateRandomStacks";
import {
  getMockMinutesSticker,
  mockMinutesSticker,
  mockMinutesSticker2,
} from "../../testHelper/mockData";
import * as CreateRandomStackTools from "./CreateRandomStacks.tools";
import { ArrayStack } from "./CreateRandomStacks.tools";
import * as MiroProviderModule from "../MiroProvider/MiroProvider";

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
    setupUserEventAndRender(<CreateRandomStacks setView={() => {}} />);
    expect(screen.getByText("Create Random Stacks")).toBeVisible();
  });

  it("should open the Overview screen if the user clicks the 'Affinity Diagram Tools /' breadcrumb", async () => {
    const mockSetView = jest.fn();
    const { user } = setupUserEventAndRender(
      <CreateRandomStacks setView={mockSetView} />
    );

    const breadcrumb = screen.getByRole("link", {
      name: "Affinity Diagram Tools /",
    });
    await user.click(breadcrumb);

    expect(mockSetView).toHaveBeenCalledWith("Overview");
  });

  it("should display the number of selected stickers with notes", async () => {
    jest.spyOn(MiroProviderModule, "useMiro").mockReturnValue({
      selectedSticker: [
        mockMinutesSticker,
        mockMinutesSticker2,
      ] as SDK.IStickerWidget[],
      refreshSticker: () => Promise.resolve(),
    });
    setupUserEventAndRender(<CreateRandomStacks setView={() => {}} />);
    expect(
      screen.getByText("Selected number of stickers with notes: 2")
    ).toBeVisible();
  });

  it("should disable the 'Create random stacks' button with an explaining label if there are no note stickers selected", async () => {
    jest.spyOn(MiroProviderModule, "useMiro").mockReturnValue({
      selectedSticker: [],
      refreshSticker: () => Promise.resolve(),
    });
    setupUserEventAndRender(<CreateRandomStacks setView={() => {}} />);

    const button = screen.getByRole("button", {
      name: "No interview stickers selected",
    });

    expect(button).toBeVisible();
    expect(button).toBeDisabled();
  });

  it("should enable the 'Create random stacks' button if there are note stickers selected", async () => {
    jest.spyOn(MiroProviderModule, "useMiro").mockReturnValue({
      selectedSticker: [mockMinutesSticker2] as SDK.IStickerWidget[],
      refreshSticker: () => Promise.resolve(),
    });
    setupUserEventAndRender(<CreateRandomStacks setView={() => {}} />);

    const button = screen.getByRole("button", { name: "Create random stacks" });
    expect(button).toBeVisible();
    expect(button).toBeEnabled();
  });

  const getMockProtocolStickers = (
    stickerCount: number
  ): Partial<SDK.IStickerWidget>[] => {
    return Array.from({ length: stickerCount }, (_, index) =>
      getMockMinutesSticker("PROT1", "Entry " + index)
    );
  };

  it("should mark non numeric text as invalid for the number of participants", async () => {
    const { user } = setupUserEventAndRender(
      <CreateRandomStacks setView={() => {}} />
    );
    await user.type(screen.getByLabelText("Number of participants"), "e");
    screen.getByLabelText("Number of participants").blur();
    expect(
      screen.getByText("Number of participants must be a number greater 0")
    ).toBeVisible();
  });

  it("should mark 0 as invalid for the number of participants", async () => {
    const { user } = setupUserEventAndRender(
      <CreateRandomStacks setView={() => {}} />
    );
    const numberOfParticipantsInput = screen.getByLabelText(
      "Number of participants"
    ) as HTMLInputElement;

    await user.clear(numberOfParticipantsInput);
    await user.type(numberOfParticipantsInput, "0");

    screen.getByLabelText("Number of participants").blur();
    expect(
      screen.getByText("Number of participants must be a number greater 0")
    ).toBeVisible();
  });

  it("should mark 0 as invalid for the number of stickers per participant", async () => {
    const { user } = setupUserEventAndRender(
      <CreateRandomStacks setView={() => {}} />
    );
    const numberOfStickersInput = screen.getByLabelText(
      "Max. number of stickers per participant"
    ) as HTMLInputElement;

    await user.clear(numberOfStickersInput);
    await user.type(numberOfStickersInput, "0");

    numberOfStickersInput.blur();
    expect(
      screen.getByText("Number of stickers must be a number greater 0")
    ).toBeVisible();
  });

  it("should call calculate stacks and pass them to updateStickerPositionsForGivenStacks", async () => {
    const stickers = getMockProtocolStickers(6) as SDK.IStickerWidget[];
    jest.spyOn(MiroProviderModule, "useMiro").mockReturnValue({
      selectedSticker: stickers,
      refreshSticker: () => Promise.resolve(),
    });
    const { user } = setupUserEventAndRender(
      <CreateRandomStacks setView={() => {}} />
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
