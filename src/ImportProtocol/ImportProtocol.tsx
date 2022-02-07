import * as React from "react";
import { useEffect, useState } from "react";
import { appId } from "../sharedConsts";
import { Container, Preview, Protocol, Sticker } from "./ImportProtocol.styles";
import { getEntryReferenceString } from "./ImportProtocol.helper";
import { getMiroInstance } from "../miroInstance";

const ImportProtocol = () => {
  const [protocolText, setProtocolText] = useState("");
  const [metaData, setMetaData] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [lines, setLines] = useState<string[]>([]);
  useEffect(() => {
    if (protocolText) {
      setLines(protocolText.split(/\r?\n/).filter((line) => line !== ""));
    } else {
      setLines([]);
    }
  }, [protocolText, setLines]);
  const miroInstance = getMiroInstance();

  const addWidgets = async () => {
    setIsCreating(true);
    const viewport = await miroInstance.board.viewport.get();

    const startY = viewport.y + 110;
    const startX = viewport.x + 110;
    const widgetSize = 220;
    const columns = Math.ceil(Math.sqrt(lines.length));

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
    let newWidgets: SDK.IWidget[] = [];
    try {
      newWidgets = await miroInstance.board.widgets.create(widgetToBeCreated);
    } catch (e) {
      await miroInstance.showErrorNotification(
        "Could not create widgets. Error: " + JSON.stringify(e)
      );
      setIsCreating(false);
      await miroInstance.board.ui.closeModal();
    }
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
    await miroInstance.board.ui.closeModal();
    setIsCreating(false);
    await miroInstance.showNotification(lines.length + " sticker created");
  };

  return (
    <Container>
      <h1>Affinity Diagram Import</h1>
      <h2>Create stickers for your recent user interview</h2>
      <div className="form-group">
        <label htmlFor="protocolPrefix">User Code (optional)</label>
        <input
          type="text"
          className="input"
          id="protocolPrefix"
          value={metaData}
          onChange={(event) => setMetaData(event.target.value)}
        />
      </div>
      <Protocol className="form-group">
        <label htmlFor="protocolEntries">Paste the protocol below</label>
        <textarea
          className="textarea"
          id="protocolEntries"
          value={protocolText}
          onChange={(event) => {
            setProtocolText(event.target.value);
          }}
        />
      </Protocol>
      <h2>Preview</h2>
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
      <button
        className={`button button-primary${
          isCreating ? " button-loading" : ""
        }`}
        onClick={addWidgets}
        disabled={isCreating || lines.length < 1}
        type="button"
      >
        Create sticker
      </button>
      <button
        className="button button-secondary"
        onClick={async () => {
          await miroInstance.board.ui.closeModal();
        }}
      >
        Cancel
      </button>
    </Container>
  );
};

export default ImportProtocol;
