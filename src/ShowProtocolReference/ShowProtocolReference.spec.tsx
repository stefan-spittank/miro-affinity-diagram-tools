import { setupUserEventAndRender } from "../../testHelper/setupUserEventAndRender";
import { screen } from "@testing-library/react";
import * as React from "react";
import ShowProtocolReference from "./ShowProtocolReference";
import {
  getMockProtocolSticker,
  mockProtocolSticker,
} from "../../testHelper/mockData";
import { appId } from "../sharedConsts";

describe("ShowProtocolReference", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should render the header", () => {
    setupUserEventAndRender(
      <ShowProtocolReference setView={() => {}} selectedSticker={[]} />
    );
    expect(screen.getByText("View original interview notes")).toBeVisible();
  });

  it("shoud render the selected protocol stickers", async () => {
    const stickers = [
      mockProtocolSticker,
      getMockProtocolSticker("SSP_IVE-2", "Another protocol entry"),
    ];

    setupUserEventAndRender(
      <ShowProtocolReference
        setView={() => {}}
        selectedSticker={stickers as SDK.IWidget[]}
      />
    );

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
    setupUserEventAndRender(
      <ShowProtocolReference
        setView={() => {}}
        selectedSticker={stickers as SDK.IWidget[]}
      />
    );

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
});
