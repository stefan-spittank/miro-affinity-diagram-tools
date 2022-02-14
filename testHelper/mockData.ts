import { appId } from "../src/sharedConsts";

export const mockProtocolSticker = {
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
      protocolReference: "SSP-IVE-1",
      originalText: "Original text from protocol",
    },
  },
};

export const mockProtocolSticker2 = {
  ...mockProtocolSticker,
  type: "STICKER",
  metadata: {
    [appId]: {
      protocolReference: "SSP-IVE-2",
      originalText: "Another text from protocol",
    },
  },
};

export const mockNonProtocolSticker = {
  ...mockProtocolSticker,
  type: "STICKER",
  metadata: {
    ["anotherAppId"]: {},
  },
};

export const getMockProtocolSticker = (
  protocolReference: string,
  originalText: string
): Partial<SDK.IStickerWidget> => ({
  ...mockProtocolSticker,
  type: "STICKER",
  metadata: {
    [appId]: {
      protocolReference,
      originalText,
    },
  },
});
