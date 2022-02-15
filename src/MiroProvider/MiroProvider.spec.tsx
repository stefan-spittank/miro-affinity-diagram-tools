import * as React from "react";
import { setupUserEventAndRender } from "../../testHelper/setupUserEventAndRender";
import MiroProvider, { useMiro } from "./MiroProvider";
import { DeepPartial } from "../../testHelper/mockMiro";
import { renderHook } from "@testing-library/react-hooks";
import {
  mockNonMinutesSticker,
  mockMinutesSticker,
  mockMinutesSticker2,
} from "../../testHelper/mockData";
import { act } from "@testing-library/react";

const mockMiroInst = {
  addListener: jest.fn(),
  removeListener: jest.fn(),
  board: {
    selection: {
      get: jest.fn(),
    },
  },
};

jest.mock("../miroInstance", () => ({
  getMiroInstance: jest.fn((): DeepPartial<SDK.Root> => mockMiroInst),
}));

describe("MiroProvider", () => {
  let simulateGetWidgetSelectionResponse: (
    selection: Partial<SDK.IWidget>[]
  ) => void;

  let simulateSelectionUpdatedEvent: () => void;
  beforeEach(() => {
    (mockMiroInst.board.selection.get as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) => {
          simulateGetWidgetSelectionResponse = resolve;
        })
    );
    (mockMiroInst.addListener as jest.Mock).mockImplementation(
      (eventType: string, handler: () => void) => {
        expect(eventType).toEqual("SELECTION_UPDATED");
        simulateSelectionUpdatedEvent = handler;
      }
    );
  });

  it("should add a SELECTION_UPDATE handler", () => {
    setupUserEventAndRender(
      <MiroProvider>
        <div />
      </MiroProvider>
    );

    expect(mockMiroInst.addListener).toHaveBeenCalledWith(
      "SELECTION_UPDATED",
      expect.any(Function)
    );
  });

  it("should return intially an empty array of selected stickers", () => {
    //https://react-hooks-testing-library.com/usage/advanced-hooks
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MiroProvider>{children}</MiroProvider>
    );

    const { result } = renderHook(() => useMiro(), { wrapper });
    expect(result.current.selectedSticker).toEqual([]);
  });

  it("should return the response of the first widget selection get", async () => {
    //https://react-hooks-testing-library.com/usage/advanced-hooks
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MiroProvider>{children}</MiroProvider>
    );

    const { result } = renderHook(() => useMiro(), { wrapper });

    await act(async () => {
      await simulateGetWidgetSelectionResponse([mockMinutesSticker]);
    });

    expect(result.current.selectedSticker).toEqual([mockMinutesSticker]);
  });

  it("should filter non minutes stickers from the response of the first widget selection get", async () => {
    //https://react-hooks-testing-library.com/usage/advanced-hooks
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MiroProvider>{children}</MiroProvider>
    );

    const { result } = renderHook(() => useMiro(), { wrapper });

    await act(async () => {
      await simulateGetWidgetSelectionResponse([
        mockMinutesSticker,
        mockNonMinutesSticker,
      ]);
    });

    expect(result.current.selectedSticker).toEqual([mockMinutesSticker]);
  });

  it("should return the response of an SELECTION_UPDATED response", async () => {
    //https://react-hooks-testing-library.com/usage/advanced-hooks
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MiroProvider>{children}</MiroProvider>
    );

    const { result } = renderHook(() => useMiro(), { wrapper });

    await act(async () => {
      await simulateGetWidgetSelectionResponse([mockMinutesSticker]);
    });

    simulateSelectionUpdatedEvent();
    // The MiroProvider will now trigger another board.selection.get
    // since the event only provides partial widgets

    await act(async () => {
      await simulateGetWidgetSelectionResponse([mockMinutesSticker2]);
    });

    expect(result.current.selectedSticker).toEqual([mockMinutesSticker2]);
  });

  it("should filter non minutes stickers from the response of widget selection get triggered by an SELECTION_UPDATED event", async () => {
    //https://react-hooks-testing-library.com/usage/advanced-hooks
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MiroProvider>{children}</MiroProvider>
    );

    const { result } = renderHook(() => useMiro(), { wrapper });

    await act(async () => {
      await simulateGetWidgetSelectionResponse([mockMinutesSticker]);
    });

    simulateSelectionUpdatedEvent();
    // The MiroProvider will now trigger another board.selection.get
    // since the event only provides partial widgets

    // Simulate the getWidgetSelectionResponse auf der the SELECTION_UPDATED event
    await act(async () => {
      await simulateGetWidgetSelectionResponse([
        mockMinutesSticker2,
        mockNonMinutesSticker,
      ]);
    });

    expect(result.current.selectedSticker).toEqual([mockMinutesSticker2]);
  });
});
