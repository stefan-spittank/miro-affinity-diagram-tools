import { DeepPartial } from "../../testHelper/mockMiro";
import { setupUserEventAndRender } from "../../testHelper/setupUserEventAndRender";
import * as React from "react";
import SidebarApp from "./SidebarApp";
import { act } from "@testing-library/react";
import * as OverviewModule from "../Overview/Overview";
import { ViewProps } from "../sharedConsts";
import * as ShowProtocolReferenceModule from "../ShowMinutesMetadata/ShowMinutesMetadata";

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
  beforeEach(() => {
    (mockMiroInst.board.selection.get as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the Overview initially", () => {
    const spyOverview = jest.spyOn(OverviewModule, "default");
    setupUserEventAndRender(<SidebarApp />);
    expect(spyOverview).toHaveBeenCalled();
  });

  it("should render ShowMinutesMetadata if setView is called with 'ShowMinutesMetadata'", () => {
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
      setView("ShowMinutesMetadata");
    });

    expect(spyShowProtocolReference).toHaveBeenCalled();
  });
});
