import { DeepPartial } from "../../testHelper/mockMiro";
import { setupUserEventAndRender } from "../../testHelper/setupUserEventAndRender";
import * as React from "react";
import Overview from "./Overview";
import { screen } from "@testing-library/react";

const mockMiroInst = {
  board: {
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

describe("Overview", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the header", () => {
    setupUserEventAndRender(<Overview />);

    expect(screen.getByText("Affinity Diagram Tools")).toBeVisible();
  });

  it("should open the import screen and close the left sidebar if the user clicks on 'Import notes'", async () => {
    const { user } = setupUserEventAndRender(<Overview />);

    const importButton = screen.getByRole("button", { name: "Import notes" });
    await user.click(importButton);

    expect(mockMiroInst.board.ui.openModal).toHaveBeenCalledWith(
      "src/ImportProtocol/ImportProtocol.html",
      {
        fullscreen: true,
      }
    );
    expect(mockMiroInst.board.ui.closeLeftSidebar).toHaveBeenCalled();
  });

  it("should open the ShowProtocolReference screen if the user clicks on 'View original notes'", async () => {
    const { user } = setupUserEventAndRender(<Overview />);

    const importButton = screen.getByRole("button", {
      name: "View original notes",
    });
    await user.click(importButton);

    expect(mockMiroInst.board.ui.openLeftSidebar).toHaveBeenCalledWith(
      "src/ShowProtocolReference/ShowProtocolReference.html"
    );
  });
});
