import { appId } from "../sharedConsts";

export const isProtocolEntryStickers = (
  widget: Pick<SDK.IWidget, "type" | "metadata">
): boolean =>
  widget.type === "STICKER" &&
  Boolean(widget.metadata[appId]?.protocolReference);
