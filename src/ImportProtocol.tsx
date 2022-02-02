import * as React from "react";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { appId } from "./sharedConsts";
import IBounds = SDK.IBounds;
import IRect = SDK.IRect;

const Input = styled.input`
  font-family: var(--body-font);
  font-size: 1rem;
  padding: 0.25rem;
  border-radius: 0;
  border: 1px solid lightgrey;
  width: 100%;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 2rem;
  font-family: var(--body-font);
  font-size: 1rem;
  padding: 0.25rem;
  border-radius: 0;
  border: 1px solid lightgrey;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 2rem;
`;
const Protocol = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  font-family: var(--body-font);
  font-size: 1rem;
  padding: 14px;
  border-color: rgba(66, 98, 255, 1);
  border-color: var(--blue700);
  background-color: rgba(66, 98, 255, 1);
  background-color: var(--blue700);
  border-radius: var(--radiusM);
`;

const Preview = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

const Sticker = styled.div`
  background-color: #fff9b8;
  border-radius: 4px;
  padding: 0.5rem;
  margin-bottom: 1.5rem;
  margin-right: 0.5rem;
`;

const getEntryReferenceString = (metaData: string, index: number) =>
  metaData ? metaData + "-" + index : "#" + index;

function ImportProtocol() {
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
              protocolReference: getEntryReferenceString(metaData, index),
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
              <strong>{getEntryReferenceString(metaData, index)}</strong>
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
}

ReactDOM.render(<ImportProtocol />, document.getElementById("root"));
