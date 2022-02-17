import { widgetSize } from "../Tools/interviewStickerTools";

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export type ArrayStack<T> = {
  elements: T[];
};
export const divideArrayIntoRandomStacks = <T>(
  elementsToDistribute: T[],
  numberOfStacks: number,
  maxNumberOfElements?: number
): ArrayStack<T>[] => {
  const maxNumberOfElementsAvailablePerStack = Math.ceil(
    elementsToDistribute.length / numberOfStacks
  );
  const maxNumberOfElementsPerStack = Math.min(
    maxNumberOfElements || Number.MAX_SAFE_INTEGER,
    maxNumberOfElementsAvailablePerStack
  );
  const stacks: ArrayStack<T>[] = [];

  for (let stackNo = 0; stackNo < numberOfStacks; ++stackNo) {
    const elements: T[] = [];
    for (
      let stickerNo = 0;
      stickerNo < maxNumberOfElementsPerStack &&
      elementsToDistribute.length > 0;
      ++stickerNo
    ) {
      const randomStickerIndex = getRandomInt(elementsToDistribute.length);
      const randomSticker = elementsToDistribute.splice(
        randomStickerIndex,
        1
      )[0];

      elements.push(randomSticker);
    }
    stacks.push({ elements });
  }
  return stacks;
};
export const updateStickerPositionsForGivenStacks = (
  stacks: ArrayStack<SDK.IStickerWidget>[],
  startX: number,
  startY: number
) => {
  const overallNumberOfStickers = stacks.reduce((acc, curr) => {
    return acc + curr.elements.length;
  }, 0);
  const maxNoOfStickersPerStack = Math.ceil(
    overallNumberOfStickers / stacks.length
  );

  const maxColumnsOfStacks = Math.ceil(Math.sqrt(maxNoOfStickersPerStack));
  return stacks.flatMap((stack, stackNo) => {
    const columns = Math.ceil(Math.sqrt(stack.elements.length));
    const offsetsBetweenStacks = stackNo * widgetSize;
    const offsetForColumnsOfPreviousStacks =
      maxColumnsOfStacks * stackNo * widgetSize;
    const stackOffset = offsetForColumnsOfPreviousStacks + offsetsBetweenStacks;

    return stack.elements.map((sticker, stickerNo) => {
      const column = Math.floor(stickerNo / columns);
      const row = stickerNo % columns;

      return {
        ...sticker,
        x: startX + row * widgetSize + stackOffset,
        y: startY + column * widgetSize,
      };
    });
  });
};
