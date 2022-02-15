import { appId } from "../sharedConsts";

export const widgetSize = 220;

export const isMinutesSticker = (
  widget: Pick<SDK.IWidget, "type" | "metadata">
): boolean =>
  widget.type === "STICKER" &&
  Boolean(widget.metadata[appId]?.minutesReference);

export const getWidgetBounds = (
  widgets: Pick<SDK.IWidget, "bounds">[]
): SDK.IBounds | undefined => {
  if (widgets.length === 0) {
    return undefined;
  }
  const firstWidget = widgets[0];
  const newViewport = widgets.reduce<{
    top: number;
    left: number;
    bottom: number;
    right: number;
  }>(
    (acc, curr) => ({
      top: Math.min(acc.top, curr.bounds.top),
      left: Math.min(acc.left, curr.bounds.left),
      bottom: Math.max(acc.bottom, curr.bounds.bottom),
      right: Math.max(acc.right, curr.bounds.right),
    }),
    firstWidget.bounds
  );
  return {
    ...newViewport,
    x: newViewport.left,
    y: newViewport.top,
    width: newViewport.right - newViewport.left,
    height: newViewport.bottom - newViewport.top,
  };
};
