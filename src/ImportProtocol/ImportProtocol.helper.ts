export const getEntryReferenceString = (index: number, metaData?: string) =>
  metaData ? metaData + "-" + index : "#" + index;
