import { appId } from "../src/sharedConsts";

export const mockProtocolSticker = {
  type: "STICKER",
  metadata: {
    [appId]: {
      protocolReference: "SSP-IVE-1",
      originalText: "Original text from protocol",
    },
  },
};

export const mockNonProtocolSticker = {
  type: "STICKER",
  metadata: {
    ["anotherAppId"]: {},
  },
};
