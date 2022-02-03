import { getEntryReferenceString } from "./ImportProtocol.helper";

describe("getEntryReferenceString", () => {
  it("should return the metaData follow by a dash and the index if metadata is given", () => {
    expect(getEntryReferenceString(1, "foo")).toEqual("foo-1");
  });
  it("should return a # and the index if metadata is undefined", () => {
    expect(getEntryReferenceString(2)).toEqual("#2");
  });
});
