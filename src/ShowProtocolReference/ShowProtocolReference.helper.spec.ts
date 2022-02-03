import { isProtocolEntryStickers } from "./ShowProtocolReference.helper";
import {
  mockNonProtocolSticker,
  mockProtocolSticker,
} from "../../testHelper/mockData";

describe("isProtocolEntryStickers", () => {
  it("should return true if a protocolReference is found", () => {
    expect(isProtocolEntryStickers(mockProtocolSticker)).toEqual(true);
  });
  it("should return false if no protocolReference is found", () => {
    expect(isProtocolEntryStickers(mockNonProtocolSticker)).toEqual(false);
  });
});
