import * as React from "react";
import { useEffect, useState } from "react";
import { appId } from "../sharedConsts";
import {
  Button,
  Container,
  Input,
  Preview,
  Protocol,
  Sticker,
  Textarea,
} from "./ImportProtocol.styles";
import { getEntryReferenceString } from "./ImportProtocol.helper";
import { getMiroInstance } from "../miroInstance";

const ImportProtocol = () => {
  const [protocolText, setProtocolText] = useState("");
  const [metaData, setMetaData] = useState("");
  const [lines, setLines] = useState<string[]>([]);
  useEffect(() => {
    if (protocolText) {
      setLines(protocolText.split(/\r?\n/));
    } else {
      setLines([]);
    }
  }, [protocolText, setLines]);
  const miroInstance = getMiroInstance();

  const addWidgets = async () => {
    const viewport = await miroInstance.board.viewport.get();

    const startY = viewport.y + 110;
    const startX = viewport.x + 110;
    const widgetSize = 220;
    const columns = lines.length > 0 ? Math.ceil(Math.sqrt(lines.length)) : 0;

    const widgetToBeCreated = lines.map((line, index) => {
      const column = Math.floor(index / columns);
      const row = index % columns;
      return {
        type: "sticker",
        text: line,
        x: startX + row * widgetSize,
        y: startY + column * widgetSize,
        metadata: {
          [appId]: {
            protocolReference: getEntryReferenceString(index, metaData),
            originalText: line,
          },
        },
      };
    });
    const newWidgets = await miroInstance.board.widgets.create(
      widgetToBeCreated
    );
    if (metaData) {
      const existingTags = await miroInstance.board.tags.get({
        title: metaData,
      });
      if (existingTags && existingTags.length > 0) {
        const existingTag = existingTags[0];
        miroInstance.board.tags.update({
          ...existingTag,
          widgetIds: [
            ...existingTag.widgetIds,
            ...newWidgets.map((widget) => widget.id),
          ],
        });
      } else {
        miroInstance.board.tags.create({
          title: metaData,
          color: "#F24726",
          widgetIds: newWidgets,
        });
      }
    }
    await miroInstance.board.selection.selectWidgets(newWidgets);
    const yOffset = -100;
    const widgetsBounds: SDK.IRect = {
      x: startX,
      y: startY + yOffset,
      width: columns * widgetSize,
      height: columns * widgetSize,
    };
    await miroInstance.board.viewport.set(widgetsBounds);
    await miroInstance.board.ui.closeLibrary();
    await miroInstance.showNotification(lines.length + " sticker created");
  };

  return (
    <Container>
      <div>Create stickers from your recent protocol</div>
      <div>
        <label htmlFor="protocolPrefix">Protocol reference prefix</label>
        <Input
          id="protocolPrefix"
          value={metaData}
          onChange={(event) => setMetaData(event.target.value)}
        />
      </div>
      <Protocol>
        <label htmlFor="protocolEntries">Paste the protocol below</label>
        <Textarea
          id="protocolEntries"
          value={protocolText}
          onChange={(event) => {
            setProtocolText(event.target.value);
          }}
        />
      </Protocol>
      <label>Preview</label>
      <Preview>
        {lines.length > 0 ? (
          lines.map((line, index) => (
            <div key={index}>
              <strong>{getEntryReferenceString(index, metaData)}</strong>
              <Sticker>{line}</Sticker>
            </div>
          ))
        ) : (
          <div>No content</div>
        )}
      </Preview>
      <Button onClick={addWidgets}>Create sticker</Button>
    </Container>
  );
};

export default ImportProtocol;
