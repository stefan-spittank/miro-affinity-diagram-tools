// We mock only the parts of miro we need
// For DeepPartial see: https://stackoverflow.com/a/61132308
export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type MockMiro = DeepPartial<SDK.Root> & {
  _triggerOnReady: () => void;
};
