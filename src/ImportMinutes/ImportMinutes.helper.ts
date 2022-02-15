export const getEntryReferenceString = (index: number, metaData?: string) =>
  metaData ? `${metaData}-${index + 1}` : `#${index + 1}`;
