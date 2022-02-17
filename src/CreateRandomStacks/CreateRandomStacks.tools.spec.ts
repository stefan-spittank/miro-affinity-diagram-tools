import {
  divideArrayIntoRandomStacks,
  updateStickerPositionsForGivenStacks,
} from "./CreateRandomStacks.tools";
import { widgetSize } from "../Tools/interviewStickerTools";

type TestElementType = {
  x: string;
};

describe("divideArrayIntoRandomStacks", () => {
  it("should return one stack with an empty array of elements if the list of elements is empty", () => {
    expect(divideArrayIntoRandomStacks([], 1)).toEqual([{ elements: [] }]);
  });

  it("should return all elements in one stack if numberOfStacks = 1", () => {
    const foo = { x: "1" };
    const bar = { x: "2" };
    const stacks = divideArrayIntoRandomStacks([foo, bar], 1);
    expect(stacks.length).toEqual(1);
    expect(stacks[0].elements.length).toEqual(2);
    expect(stacks[0].elements.filter((e) => e === foo)).toHaveLength(1);
    expect(stacks[0].elements.filter((e) => e === bar)).toHaveLength(1);
  });

  it("should return two stacks with 2 and 1 element if given 3 elements and numberOfStacks = 2", () => {
    const a = { x: "a" };
    const b = { x: "b" };
    const c = { x: "c" };
    const stacks = divideArrayIntoRandomStacks([a, b, c], 2);
    expect(stacks.length).toEqual(2);
    expect(stacks[0].elements.length).toEqual(2);
    expect(stacks[1].elements.length).toEqual(1);
  });

  it("should return each element exactly once in the returned stacks if given 3 elements and numberOfStacks = 2", () => {
    const a = { x: "a" };
    const b = { x: "b" };
    const c = { x: "c" };
    const stacks = divideArrayIntoRandomStacks([a, b, c], 2);
    const allReturnedElements = stacks.reduce<TestElementType[]>(
      (acc, curr) => [...acc, ...curr.elements],
      []
    );
    expect(allReturnedElements.filter((e) => e === a)).toHaveLength(1);
    expect(allReturnedElements.filter((e) => e === b)).toHaveLength(1);
    expect(allReturnedElements.filter((e) => e === c)).toHaveLength(1);
  });

  it("should not return stacks containing more elements than maxNumberOfElements", () => {
    const e1 = { x: "1" };
    const e2 = { x: "2" };
    const e3 = { x: "3" };
    const e4 = { x: "4" };
    const e5 = { x: "5" };
    const e6 = { x: "6" };
    const e7 = { x: "7" };
    const e8 = { x: "8" };
    const maxNumberOfElements = 2;
    const stacks = divideArrayIntoRandomStacks(
      [e1, e2, e3, e4, e5, e6, e7, e8],
      2,
      maxNumberOfElements
    );
    expect(stacks.length).toEqual(2);
    expect(stacks[0].elements.length).toEqual(maxNumberOfElements);
    expect(stacks[1].elements.length).toEqual(maxNumberOfElements);
  });
});

describe("updateStickerPositionsForGivenStacks", () => {
  it("should return an empty array, if the given stack array is empty", () => {
    expect(updateStickerPositionsForGivenStacks([], 0, 0)).toEqual([]);
  });

  it("should return an empty array, if the one stack with an empty array is given", () => {
    expect(
      updateStickerPositionsForGivenStacks([{ elements: [] }], 0, 0)
    ).toEqual([]);
  });

  it("should create one visual group of 2 columns and two rows for one stack containing 4 elements", () => {
    const widget1 = { id: "1", x: 0, y: 0 };
    const widget2 = { id: "2", x: 454350, y: -4355430 };
    const widget3 = { id: "3", x: 0, y: 4353450 };
    const widget4 = { id: "4", x: 435430, y: 450 };
    const elements = [
      widget1,
      widget2,
      widget3,
      widget4,
    ] as SDK.IStickerWidget[];
    const updatedWidgets = updateStickerPositionsForGivenStacks(
      [
        {
          elements,
        },
      ],
      0,
      0
    );
    const updatedWidget1 = updatedWidgets.find((w) => w.id === widget1.id)!;
    const updatedWidget2 = updatedWidgets.find((w) => w.id === widget2.id)!;
    const updatedWidget3 = updatedWidgets.find((w) => w.id === widget3.id)!;
    const updatedWidget4 = updatedWidgets.find((w) => w.id === widget4.id)!;

    expect(updatedWidget1).toEqual(expect.objectContaining({ x: 0, y: 0 }));
    expect(updatedWidget2).toEqual(
      expect.objectContaining({ x: widgetSize, y: 0 })
    );
    expect(updatedWidget3).toEqual(
      expect.objectContaining({ x: 0, y: widgetSize })
    );
    expect(updatedWidget4).toEqual(
      expect.objectContaining({ x: widgetSize, y: widgetSize })
    );
  });

  it("should respect the given start coordinates", () => {
    const widget1 = { id: "1", x: 0, y: 0 };
    const widget2 = { id: "2", x: 454350, y: -4355430 };
    const widget3 = { id: "3", x: 0, y: 4353450 };
    const widget4 = { id: "4", x: 435430, y: 450 };
    const elements = [
      widget1,
      widget2,
      widget3,
      widget4,
    ] as SDK.IStickerWidget[];
    const startX = 2100;
    const startY = 3300;
    const updatedWidgets = updateStickerPositionsForGivenStacks(
      [
        {
          elements,
        },
      ],
      startX,
      startY
    );
    const updatedWidget1 = updatedWidgets.find((w) => w.id === widget1.id)!;
    const updatedWidget2 = updatedWidgets.find((w) => w.id === widget2.id)!;
    const updatedWidget3 = updatedWidgets.find((w) => w.id === widget3.id)!;
    const updatedWidget4 = updatedWidgets.find((w) => w.id === widget4.id)!;

    expect(updatedWidget1).toEqual(
      expect.objectContaining({ x: startX, y: startY })
    );
    expect(updatedWidget2).toEqual(
      expect.objectContaining({ x: startX + widgetSize, y: startY })
    );
    expect(updatedWidget3).toEqual(
      expect.objectContaining({ x: startX, y: startY + widgetSize })
    );
    expect(updatedWidget4).toEqual(
      expect.objectContaining({
        x: startX + widgetSize,
        y: startY + widgetSize,
      })
    );
  });

  it("should have enough space between stacks even if the last stack has fewer columns", () => {
    const widget1_1 = { id: "1_1", x: 0, y: 0 };
    const widget1_2 = { id: "1_2", x: 454350, y: -4355430 };
    const widget1_3 = { id: "1_3", x: 0, y: 4353450 };
    const widget2_1 = { id: "2_1", x: 435430, y: 450 };
    const widget2_2 = { id: "2_2", x: 45430, y: 4350 };
    const widget2_3 = { id: "2_3", x: 4330, y: 40 };
    const widget3_1 = { id: "3_1", x: 5430, y: 1450 };
    const widget3_2 = { id: "3_2", x: -43430, y: 43450 };

    const updatedWidgets = updateStickerPositionsForGivenStacks(
      [
        {
          elements: [widget1_1, widget1_2, widget1_3] as SDK.IStickerWidget[],
        },
        {
          elements: [widget2_1, widget2_2, widget2_3] as SDK.IStickerWidget[],
        },
        {
          elements: [widget3_1, widget3_2] as SDK.IStickerWidget[],
        },
      ],
      0,
      0
    );
    const updatedWidget1_1 = updatedWidgets.find((w) => w.id === widget1_1.id)!;
    const updatedWidget1_2 = updatedWidgets.find((w) => w.id === widget1_2.id)!;
    const updatedWidget1_3 = updatedWidgets.find((w) => w.id === widget1_3.id)!;
    const updatedWidget2_1 = updatedWidgets.find((w) => w.id === widget2_1.id)!;
    const updatedWidget2_2 = updatedWidgets.find((w) => w.id === widget2_2.id)!;
    const updatedWidget2_3 = updatedWidgets.find((w) => w.id === widget2_3.id)!;
    const updatedWidget3_1 = updatedWidgets.find((w) => w.id === widget3_1.id)!;
    const updatedWidget3_2 = updatedWidgets.find((w) => w.id === widget3_2.id)!;

    const spaceBetweenStacks = widgetSize;
    const offsetForStack2 = 2 * widgetSize + spaceBetweenStacks;
    const offsetForStack3 = 4 * widgetSize + 2 * spaceBetweenStacks;

    expect(updatedWidget1_1).toEqual(expect.objectContaining({ x: 0, y: 0 }));
    expect(updatedWidget1_2).toEqual(
      expect.objectContaining({ x: widgetSize, y: 0 })
    );
    expect(updatedWidget1_3).toEqual(
      expect.objectContaining({ x: 0, y: widgetSize })
    );
    expect(updatedWidget2_1).toEqual(
      expect.objectContaining({ x: offsetForStack2, y: 0 })
    );
    expect(updatedWidget2_2).toEqual(
      expect.objectContaining({ x: offsetForStack2 + widgetSize, y: 0 })
    );
    expect(updatedWidget2_3).toEqual(
      expect.objectContaining({ x: offsetForStack2, y: widgetSize })
    );
    expect(updatedWidget3_1).toEqual(
      expect.objectContaining({ x: offsetForStack3, y: 0 })
    );
    expect(updatedWidget3_2).toEqual(
      expect.objectContaining({ x: offsetForStack3 + widgetSize, y: 0 })
    );
  });

  it("should create two visual group of 1 row for two stack containing 2 elements each", () => {
    const widget1_1 = { id: "1_1", x: 0, y: 0 };
    const widget1_2 = { id: "1_2", x: 454350, y: -4355430 };
    const widget2_1 = { id: "2_1", x: 0, y: 4353450 };
    const widget2_2 = { id: "2_2", x: 435430, y: 450 };
    const elements1 = [widget1_1, widget1_2] as SDK.IStickerWidget[];
    const elements2 = [widget2_1, widget2_2] as SDK.IStickerWidget[];

    const spaceBetweenStacks = widgetSize;

    const updatedWidgets = updateStickerPositionsForGivenStacks(
      [{ elements: elements1 }, { elements: elements2 }],
      0,
      0
    );
    const updatedWidget1_1 = updatedWidgets.find((w) => w.id === widget1_1.id)!;
    const updatedWidget1_2 = updatedWidgets.find((w) => w.id === widget1_2.id)!;
    const updatedWidget2_1 = updatedWidgets.find((w) => w.id === widget2_1.id)!;
    const updatedWidget2_2 = updatedWidgets.find((w) => w.id === widget2_2.id)!;

    expect(updatedWidget1_1).toEqual(expect.objectContaining({ x: 0, y: 0 }));
    expect(updatedWidget1_2).toEqual(
      expect.objectContaining({ x: widgetSize, y: 0 })
    );
    expect(updatedWidget2_1).toEqual(
      expect.objectContaining({ x: 2 * widgetSize + spaceBetweenStacks, y: 0 })
    );
    expect(updatedWidget2_2).toEqual(
      expect.objectContaining({
        x: 3 * widgetSize + spaceBetweenStacks,
        y: 0,
      })
    );
  });
});
