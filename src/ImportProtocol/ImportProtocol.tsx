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
import IRect = SDK.IRect;

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

  const addWidgets = async () => {
    const viewport = await miro.board.viewport.get();

    const startY = viewport.y + 110;
    const startX = viewport.x + 110;
    const widgetSize = 220;
    const columns = lines.length > 0 ? Math.ceil(Math.sqrt(lines.length)) : 0;

    const newWidgets = await miro.board.widgets.create(
      lines.map((line, index) => {
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
      })
    );
    if (metaData) {
      const existingTags = await miro.board.tags.get({ title: metaData });
      if (existingTags && existingTags.length > 0) {
        const existingTag = existingTags[0];
        miro.board.tags.update({
          ...existingTag,
          widgetIds: [
            ...existingTag.widgetIds,
            ...newWidgets.map((widget) => widget.id),
          ],
        });
      } else {
        miro.board.tags.create({
          title: metaData,
          color: "#F24726",
          widgetIds: newWidgets,
        });
      }
    }
    await miro.board.selection.selectWidgets(newWidgets);
    const yOffset = -100;
    const widgetsBounds: IRect = {
      x: startX,
      y: startY + yOffset,
      width: columns * widgetSize,
      height: columns * widgetSize,
    };
    await miro.board.viewport.set(widgetsBounds);
    await miro.board.ui.closeLibrary();
    await miro.showNotification(lines.length + " sticker created");
  };

  return (
    <Container>
      <div>Create stickers from your recent protocol</div>
      <div>
        <label htmlFor="protocolPrefix">Protocol reference prefix</label>
        <Input
          name="protocolPrefix"
          value={metaData}
          onChange={(event) => setMetaData(event.target.value)}
        />
      </div>
      <Protocol>
        <label htmlFor="protocolEntries">Paste the protocol below</label>
        <Textarea
          name="protocolEntries"
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
