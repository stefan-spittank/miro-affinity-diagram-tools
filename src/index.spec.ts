import { miroInstance } from "./index";
import { MockMiro } from "../testHelper/mockMiro";

jest.mock("./miroInstance", () => ({
  getMiroInstance: jest.fn((): MockMiro => {
    let readyCallBack: () => void = jest.fn();

    return {
      isAuthorized: jest.fn(() => true),
      requestAuthorization: jest.fn(),
      onReady: jest.fn((value: () => void) => (readyCallBack = value)),
      initialize: jest.fn(),
      board: {
        ui: {
          openLeftSidebar: jest.fn(),
          openModal: jest.fn(),
        },
      },
      _triggerOnReady: () => readyCallBack(),
    };
  }),
}));

jest.mock("./sharedConsts", () => ({
  ...jest.requireActual("./sharedConsts"),
  IS_DEV_MODE: false,
}));

jest.mock("./assets/SourceInformation.svg", () => ({
  toobarIcon: {},
}));
jest.mock("./assets/affinity-diagram.svg", () => ({
  libraryIcon: {},
}));

describe("index file", () => {
  beforeEach(() => {
    (miroInstance.isAuthorized as jest.Mock).mockReturnValue(true);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should register for miro.onReady event", () => {
    expect(miroInstance.onReady).toHaveBeenCalled();
  });

  it("should call miro.initialize on onReady event and register the Plugin UI", () => {
    (miroInstance as unknown as MockMiro)._triggerOnReady();

    expect(miroInstance.initialize).toHaveBeenCalledWith(
      expect.objectContaining({
        extensionPoints: expect.objectContaining({
          bottomBar: expect.objectContaining({
            title: "View original minutes",
            onClick: expect.any(Function),
          }),
          toolbar: expect.objectContaining({
            title: "Affinity Diagram Tools",
            onClick: expect.any(Function),
          }),
        }),
      })
    );
  });

  it("should open the ShowProtocolReference view in the leftSidebar onClick of the bottomBar Button", async () => {
    let initParams: Partial<SDK.IPluginConfig>;
    (miroInstance.initialize as jest.Mock).mockImplementation(
      (initParamsGiven) => {
        initParams = initParamsGiven;
      }
    );
    await (miroInstance as unknown as MockMiro)._triggerOnReady();

    // 2 warnings:
    // 1. initParams ist hier im Test sicher gesetzt
    // 2. onClick ist in den Typen von miro falsch
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await initParams?.extensionPoints?.bottomBar?.onClick();

    expect(miroInstance.board.ui.openLeftSidebar).toHaveBeenCalledWith(
      "src/ShowProtocolReference/ShowProtocolReference.html"
    );
  });

  it("should request authorization if not authorized", async () => {
    let initParams: Partial<SDK.IPluginConfig>;
    (miroInstance.initialize as jest.Mock).mockImplementation(
      (initParamsGiven) => {
        initParams = initParamsGiven;
      }
    );
    await (miroInstance as unknown as MockMiro)._triggerOnReady();

    (miroInstance.isAuthorized as jest.Mock).mockReturnValue(false);

    // 2 warnings:
    // 1. initParams ist hier im Test sicher gesetzt
    // 2. onClick ist in den Typen von miro falsch
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await initParams?.extensionPoints?.bottomBar?.onClick();

    expect(miroInstance.requestAuthorization).toHaveBeenCalled();
  });

  it("should open the Overview view as library onClick of the toolbar Button", async () => {
    let initParams: Partial<SDK.IPluginConfig>;
    (miroInstance.initialize as jest.Mock).mockImplementation(
      (initParamsGiven) => {
        initParams = initParamsGiven;
      }
    );
    await (miroInstance as unknown as MockMiro)._triggerOnReady();

    // 2 warnings:
    // 1. initParams ist hier im Test sicher gesetzt
    // 2. onClick ist in den Typen von miro falsch
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await initParams?.extensionPoints?.toolbar?.onClick();

    expect(miroInstance.board.ui.openLeftSidebar).toHaveBeenCalledWith(
      "src/Overview/Overview.html"
    );
  });
});
