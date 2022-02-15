import { getWidgetBounds, isMinutesSticker } from "./interviewStickerTools";
import {
  mockNonMinutesSticker,
  mockMinutesSticker,
} from "../../testHelper/mockData";

describe("isMinutesSticker", () => {
  it("should return true if a minutesReference is found", () => {
    expect(isMinutesSticker(mockMinutesSticker)).toEqual(true);
  });
  it("should return false if no minutesReference is found", () => {
    expect(isMinutesSticker(mockNonMinutesSticker)).toEqual(false);
  });
});

describe("getWidgetBounds", () => {
  it("should return undefined if the widget array is empty", () => {
    expect(getWidgetBounds([])).toBeUndefined();
  });

  it("should return the bounds of one widget", () => {
    const widget: Pick<SDK.IWidget, "bounds"> = {
      ...mockMinutesSticker,
      bounds: {
        x: 10,
        y: 10,
        top: 10,
        left: 10,
        right: 110,
        bottom: 110,
        width: 100,
        height: 100,
      },
    };
    expect(getWidgetBounds([widget])).toEqual(widget.bounds);
  });

  it("should return the bounds of two overlapping widgets widget", () => {
    const widget1: Pick<SDK.IWidget, "bounds"> = {
      ...mockMinutesSticker,
      bounds: {
        x: 10,
        y: 10,
        top: 10,
        left: 10,
        right: 110,
        bottom: 110,
        width: 100,
        height: 100,
      },
    };
    const widget2: Pick<SDK.IWidget, "bounds"> = {
      ...mockMinutesSticker,
      bounds: {
        x: 50,
        y: 50,
        top: 50,
        left: 50,
        right: 150,
        bottom: 150,
        width: 100,
        height: 100,
      },
    };
    expect(getWidgetBounds([widget1, widget2])).toEqual({
      x: widget1.bounds.x,
      y: widget1.bounds.y,
      top: widget1.bounds.top,
      left: widget1.bounds.left,
      bottom: widget2.bounds.bottom,
      right: widget2.bounds.right,
      width: widget2.bounds.right - widget1.bounds.left,
      height: widget2.bounds.bottom - widget1.bounds.top,
    });
  });

  it("should return the bounds of two non overlapping widgets widget", () => {
    const widget1: Pick<SDK.IWidget, "bounds"> = {
      ...mockMinutesSticker,
      bounds: {
        x: 10,
        y: 10,
        top: 10,
        left: 10,
        right: 110,
        bottom: 110,
        width: 100,
        height: 100,
      },
    };
    const widget2: Pick<SDK.IWidget, "bounds"> = {
      ...mockMinutesSticker,
      bounds: {
        x: 50,
        y: 50,
        top: 150,
        left: 150,
        right: 250,
        bottom: 250,
        width: 100,
        height: 100,
      },
    };
    expect(getWidgetBounds([widget1, widget2])).toEqual({
      x: widget1.bounds.x,
      y: widget1.bounds.y,
      top: widget1.bounds.top,
      left: widget1.bounds.left,
      bottom: widget2.bounds.bottom,
      right: widget2.bounds.right,
      width: widget2.bounds.right - widget1.bounds.left,
      height: widget2.bounds.bottom - widget1.bounds.top,
    });
  });
});
