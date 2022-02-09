import { DeepPartial } from "../../testHelper/mockMiro";
import { setupUserEventAndRender } from "../../testHelper/setupUserEventAndRender";
import { act, screen } from "@testing-library/react";
import * as React from "react";
import ShowProtocolReference from "./ShowProtocolReference";
import { mockProtocolSticker } from "../../testHelper/mockData";
import { appId } from "../sharedConsts";

const mockMiroInst = {
  addListener: jest.fn(),
  board: {
    selection: {
      get: jest.fn(),
    },
  },
};

jest.mock("../miroInstance", () => ({
  getMiroInstance: jest.fn((): DeepPartial<SDK.Root> => mockMiroInst),
}));

const getMockProtocolSticker = (
  protocolReference: string,
  originalText: string
) => ({
  ...mockProtocolSticker,
  metadata: {
    [appId]: {
      protocolReference,
      originalText,
    },
  },
});

describe("ShowProtocolReference", () => {
  let resolveBoardGetSelection: (selection: Partial<SDK.IWidget>[]) => void;
  beforeEach(() => {
    (mockMiroInst.board.selection.get as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveBoardGetSelection = resolve;
        })
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should render the header", () => {
    setupUserEventAndRender(<ShowProtocolReference />);
    expect(screen.getByText("View original interview notes")).toBeVisible();
  });

  it("should register an SELECTION_UPDATE event handler on load", () => {
    setupUserEventAndRender(<ShowProtocolReference />);

    expect(mockMiroInst.addListener).toHaveBeenCalledWith(
      "SELECTION_UPDATED",
      expect.any(Function)
    );
  });

  it("shoud render the selected protocol stickers", async () => {
    setupUserEventAndRender(<ShowProtocolReference />);
    const stickers = [
      mockProtocolSticker,
      getMockProtocolSticker("SSP_IVE-2", "Another protocol entry"),
    ];
    await act(async () => {
      await resolveBoardGetSelection(stickers);
    });

    expect(
      screen.getByText(stickers[0].metadata[appId].protocolReference)
    ).toBeVisible();
    expect(
      screen.getByText(stickers[0].metadata[appId].originalText)
    ).toBeVisible();
    expect(
      screen.getByText(stickers[1].metadata[appId].protocolReference)
    ).toBeVisible();
    expect(
      screen.getByText(stickers[1].metadata[appId].originalText)
    ).toBeVisible();
  });

  it("shoud not render the stickers without metaData for this app", async () => {
    setupUserEventAndRender(<ShowProtocolReference />);
    const stickers: Partial<SDK.IWidget>[] = [
      mockProtocolSticker,
      {
        ...mockProtocolSticker,
        metadata: {
          ["anotherAppId"]: {
            protocolReference: "Random stuff from another app",
          },
        },
      },
    ];
    await act(async () => {
      await resolveBoardGetSelection(stickers);
    });

    expect(
      screen.getByText(stickers[0].metadata?.[appId].protocolReference)
    ).toBeVisible();
    expect(
      screen.getByText(stickers[0].metadata?.[appId].originalText)
    ).toBeVisible();
    expect(
      screen.queryByText(
        stickers[1].metadata?.["anotherAppId"]?.protocolReference
      )
    ).not.toBeInTheDocument();
  });

  it("shoud only render stickers widgets", async () => {
    setupUserEventAndRender(<ShowProtocolReference />);
    const stickers: Partial<SDK.IWidget>[] = [
      mockProtocolSticker,
      {
        ...getMockProtocolSticker("SSP_IVE-2", "Another protocol entry"),
        type: "TEXT",
      },
    ];
    await act(async () => {
      await resolveBoardGetSelection(stickers);
    });

    expect(
      screen.getByText(stickers[0].metadata?.[appId].protocolReference)
    ).toBeVisible();
    expect(
      screen.getByText(stickers[0].metadata?.[appId].originalText)
    ).toBeVisible();
    expect(
      screen.queryByText(stickers[1].metadata?.[appId]?.protocolReference)
    ).not.toBeInTheDocument();
  });

  it("shoud update the displayed sticker if the selection changes", async () => {
    let onChangeCallback: (e: { data: Partial<SDK.IWidget>[] }) => void;
    (mockMiroInst.addListener as jest.Mock).mockImplementation(
      (_, callback) => {
        onChangeCallback = callback;
      }
    );

    setupUserEventAndRender(<ShowProtocolReference />);
    const originalSelectedSticker = getMockProtocolSticker(
      "SSP_IVE-2",
      "A protocol entry"
    );
    await act(async () => {
      await resolveBoardGetSelection([originalSelectedSticker]);
    });

    const newSelectedSticker = getMockProtocolSticker(
      "SSP_IVE-3",
      "New selection"
    );

    await act(async () => {
      onChangeCallback({ data: [newSelectedSticker] });
    });
    expect(
      screen.queryByText(
        originalSelectedSticker.metadata[appId].protocolReference
      )
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(originalSelectedSticker.metadata[appId].originalText)
    ).not.toBeInTheDocument();
    expect(
      screen.getByText(newSelectedSticker.metadata[appId].protocolReference)
    ).toBeVisible();
    expect(
      screen.getByText(newSelectedSticker.metadata[appId].originalText)
    ).toBeVisible();
  });
});
