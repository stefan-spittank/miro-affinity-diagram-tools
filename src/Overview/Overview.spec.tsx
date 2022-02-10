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
    setupUserEventAndRender(<Overview setView={() => {}} />);

    expect(screen.getByText("Affinity Diagram Tools")).toBeVisible();
  });

  it("should open the import screen if the user clicks on 'Import notes'", async () => {
    const { user } = setupUserEventAndRender(<Overview setView={() => {}} />);

    const importButton = screen.getByRole("button", { name: "Import notes" });
    await user.click(importButton);

    expect(mockMiroInst.board.ui.openModal).toHaveBeenCalledWith(
      "src/ImportProtocol/ImportProtocol.html",
      {
        fullscreen: true,
      }
    );
  });

  it("should open the ShowProtocolReference screen if the user clicks on 'View original notes'", async () => {
    const mockSetView = jest.fn();
    const { user } = setupUserEventAndRender(
      <Overview setView={mockSetView} />
    );

    const importButton = screen.getByRole("button", {
      name: "View original notes",
    });
    await user.click(importButton);

    expect(mockSetView).toHaveBeenCalledWith("ShowProtocolReference");
  });
});
