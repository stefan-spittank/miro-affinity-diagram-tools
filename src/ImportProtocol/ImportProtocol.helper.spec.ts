import { getEntryReferenceString } from "./ImportProtocol.helper";

describe("getEntryReferenceString", () => {
  it("should return the metaData follow by a dash and the index plus 1 if metadata is given", () => {
    expect(getEntryReferenceString(0, "foo")).toEqual("foo-1");
  });
  it("should return a # and the index plus 1 if metadata is undefined", () => {
    expect(getEntryReferenceString(1)).toEqual("#2");
  });
});
