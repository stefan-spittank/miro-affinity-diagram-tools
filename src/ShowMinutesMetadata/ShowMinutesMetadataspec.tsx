import { setupUserEventAndRender } from "../../testHelper/setupUserEventAndRender";
import { screen } from "@testing-library/react";
import * as React from "react";
import ShowMinutesMetadata from "./ShowMinutesMetadata";
import {
  getMockMinutesSticker,
  mockMinutesSticker,
} from "../../testHelper/mockData";
import { appId } from "../sharedConsts";
import * as MiroProviderModule from "../MiroProvider/MiroProvider";

describe("ShowMinutesMetadata", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should render the header", () => {
    jest.spyOn(MiroProviderModule, "useMiro").mockReturnValue({
      selectedSticker: [],
    });
    setupUserEventAndRender(<ShowMinutesMetadata setView={() => {}} />);
    expect(screen.getByText("View original interview notes")).toBeVisible();
  });

  it("shoud render the selected protocol stickers", async () => {
    const stickers = [
      mockMinutesSticker,
      getMockMinutesSticker("SSP_IVE-2", "Another protocol entry"),
    ] as SDK.IStickerWidget[];
    jest.spyOn(MiroProviderModule, "useMiro").mockReturnValue({
      selectedSticker: stickers,
    });
    setupUserEventAndRender(<ShowMinutesMetadata setView={() => {}} />);

    expect(
      screen.getByText(stickers[0].metadata[appId].minutesReference)
    ).toBeVisible();
    expect(
      screen.getByText(stickers[0].metadata[appId].originalText)
    ).toBeVisible();
    expect(
      screen.getByText(stickers[1].metadata[appId].minutesReference)
    ).toBeVisible();
    expect(
      screen.getByText(stickers[1].metadata[appId].originalText)
    ).toBeVisible();
  });

  it("shoud not render the stickers without metaData for this app", async () => {
    const stickers = [
      mockMinutesSticker,
      {
        ...mockMinutesSticker,
        metadata: {
          ["anotherAppId"]: {
            minutesReference: "Random stuff from another app",
          },
        },
      },
    ] as SDK.IStickerWidget[];
    jest.spyOn(MiroProviderModule, "useMiro").mockReturnValue({
      selectedSticker: stickers,
    });
    setupUserEventAndRender(<ShowMinutesMetadata setView={() => {}} />);

    expect(
      screen.getByText(stickers[0].metadata?.[appId].minutesReference)
    ).toBeVisible();
    expect(
      screen.getByText(stickers[0].metadata?.[appId].originalText)
    ).toBeVisible();
    expect(
      screen.queryByText(
        stickers[1].metadata?.["anotherAppId"]?.minutesReference
      )
    ).not.toBeInTheDocument();
  });
});
