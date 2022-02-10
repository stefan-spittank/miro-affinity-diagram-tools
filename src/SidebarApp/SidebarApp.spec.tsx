import { DeepPartial } from "../../testHelper/mockMiro";
import { setupUserEventAndRender } from "../../testHelper/setupUserEventAndRender";
import * as React from "react";
import SidebarApp from "./SidebarApp";
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

describe("SidebarApp", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the header", () => {
    setupUserEventAndRender(<SidebarApp />);

    expect(screen.getByText("Affinity Diagram Tools")).toBeVisible();
  });
});
