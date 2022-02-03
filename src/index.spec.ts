import { miroInstance } from "./index";

// We mock only the parts of miro we need
// For DeepPartial see: https://stackoverflow.com/a/61132308
type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

type MockMiro = DeepPartial<SDK.Root> & {
  _triggerOnReady: () => void;
};

jest.mock("./miroInstance", () => ({
  getMiroInstance: jest.fn((): MockMiro => {
    let readyCallBack: () => void = jest.fn();

    return {
      onReady: jest.fn((value: () => void) => (readyCallBack = value)),
      initialize: jest.fn(),
      board: {
        ui: {
          openLeftSidebar: jest.fn(),
          openLibrary: jest.fn(),
        },
      },
      _triggerOnReady: () => readyCallBack(),
    };
  }),
}));

jest.mock("./assets/SourceInformation.svg", () => ({
  toobarIcon: {},
}));
jest.mock("./assets/affinity-diagram.svg", () => ({
  libraryIcon: {},
}));

describe("index file", () => {
  it("should register for miro.onReady event", () => {
    expect(miroInstance.onReady).toHaveBeenCalled();
  });

  it("should call miro.initialize on onReady event and register the Plugin UI", () => {
    (miroInstance as unknown as MockMiro)._triggerOnReady();

    expect(miroInstance.initialize).toHaveBeenCalledWith(
      expect.objectContaining({
        extensionPoints: expect.objectContaining({
          bottomBar: expect.objectContaining({
            title: "Affinity Diagram: show source information",
            onClick: expect.any(Function),
          }),
          toolbar: expect.objectContaining({
            title: "Affinity Diagram: import protocol",
            onClick: expect.any(Function),
          }),
        }),
      })
    );
  });
});
