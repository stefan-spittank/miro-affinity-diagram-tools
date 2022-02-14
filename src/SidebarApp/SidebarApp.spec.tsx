import { DeepPartial } from "../../testHelper/mockMiro";
import { setupUserEventAndRender } from "../../testHelper/setupUserEventAndRender";
import * as React from "react";
import SidebarApp from "./SidebarApp";
import { act } from "@testing-library/react";
import * as OverviewModule from "../Overview/Overview";
import { ViewProps } from "../sharedConsts";
import {
  getMockProtocolSticker,
  mockProtocolSticker,
} from "../../testHelper/mockData";
import * as ShowProtocolReferenceModule from "../ShowProtocolReference/ShowProtocolReference";

const mockMiroInst = {
  addListener: jest.fn(),
  removeListener: jest.fn(),
  board: {
    selection: {
      get: jest.fn(),
    },
    ui: {
      openModal: jest.fn(),
      openLeftSidebar: jest.fn(),
      closeLeftSidebar: jest.fn(),
    },
  },
};

jest.mock("../miroInstance", () => ({
  getMiroInstance: jest.fn((): DeepPartial<SDK.Root> => mockMiroInst),
}));

describe("SidebarApp", () => {
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

  it("should register an SELECTION_UPDATE event handler on load", () => {
    setupUserEventAndRender(<SidebarApp />);

    expect(mockMiroInst.addListener).toHaveBeenCalledWith(
      "SELECTION_UPDATED",
      expect.any(Function)
    );
  });

  it("should render the Overview initially", () => {
    const spyOverview = jest.spyOn(OverviewModule, "default");
    setupUserEventAndRender(<SidebarApp />);
    expect(spyOverview).toHaveBeenCalled();
  });

  const renderAndNavigateToShowProtocolReference = () => {
    let setView: ViewProps["setView"] = () => {};
    jest
      .spyOn(OverviewModule, "default")
      .mockImplementation(({ setView: setViewFromProps }: ViewProps) => {
        setView = setViewFromProps;
        return <></>;
      });
    const spyShowProtocolReference = jest.spyOn(
      ShowProtocolReferenceModule,
      "default"
    );

    setupUserEventAndRender(<SidebarApp />);
    act(() => {
      setView("ShowProtocolReference");
    });
    return spyShowProtocolReference;
  };

  it("should render ShowProtocolReference if setView is called with 'ShowProtocolReference'", () => {
    const spyShowProtocolReference = renderAndNavigateToShowProtocolReference();

    expect(spyShowProtocolReference).toHaveBeenCalled();
  });

  it("should pass the selected Widgets to the 'ShowProtocolReference' view", async () => {
    const spyShowProtocolReference = renderAndNavigateToShowProtocolReference();
    const stickers = [
      mockProtocolSticker,
      getMockProtocolSticker("SSP_IVE-2", "Another protocol entry"),
    ];
    await act(async () => {
      await resolveBoardGetSelection(stickers);
    });

    expect(spyShowProtocolReference).toHaveBeenInstantiatedWith({
      selectedSticker: stickers,
    });
  });
});
