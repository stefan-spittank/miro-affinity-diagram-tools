import { appId } from "../src/sharedConsts";

export const mockMinutesSticker = {
  type: "STICKER",
  bounds: {
    top: 10,
    left: 10,
    x: 10,
    y: 10,
    width: 220,
    height: 220,
    bottom: 230,
    right: 230,
  },
  metadata: {
    [appId]: {
      minutesReference: "SSP-IVE-1",
      originalText: "Original text from minutes",
    },
  },
};

export const mockMinutesSticker2 = {
  ...mockMinutesSticker,
  type: "STICKER",
  metadata: {
    [appId]: {
      minutesReference: "SSP-IVE-2",
      originalText: "Another text from minutes",
    },
  },
};

export const mockNonMinutesSticker = {
  ...mockMinutesSticker,
  type: "STICKER",
  metadata: {
    ["anotherAppId"]: {},
  },
};

export const getMockMinutesSticker = (
  minutesReference: string,
  originalText: string
): Partial<SDK.IStickerWidget> => ({
  ...mockMinutesSticker,
  type: "STICKER",
  metadata: {
    [appId]: {
      minutesReference,
      originalText,
    },
  },
});
