import * as React from "react";
import ImportProtocol from "./ImportProtocol";
import { render, screen } from "@testing-library/react";

describe("ImportProtocol", () => {
  it("should ", () => {
    render(<ImportProtocol />);
    expect(
      screen.getByText("Create stickers from your recent protocol")
    ).toBeVisible();
  });
});
