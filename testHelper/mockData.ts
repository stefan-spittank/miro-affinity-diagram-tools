import { appId } from "../src/sharedConsts";

export const mockMinutesSticker = {
  id: "mockMinutesStickerId",
  type: "STICKER",
  text: "Original text from minutes",
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
  id: "mockMinutesSticker2Id",
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
  id: "mockNonMinutesStickerId",
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
  id: "mockStickerIdForRef-" + minutesReference,
  type: "STICKER",
  metadata: {
    [appId]: {
      minutesReference,
      originalText,
    },
  },
});
