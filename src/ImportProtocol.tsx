import * as React from "react";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { appId } from "./sharedConsts";

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
  border-radius: 2px;
  padding: 0.5rem;
  margin-bottom: 1.5rem;
  margin-right: 0.5rem;
`;

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
    const startY = 0;
    const startX = 0;
    const widgetHeight = 200;
    const columns = lines.length > 0 ? Math.ceil(Math.sqrt(lines.length)) : 0;

    const newWidgets = await miro.board.widgets.create(
      lines.map((line, index) => ({
        type: "sticker",
        text: line,
        x: 0,
        y: startY + index * widgetHeight,
        metadata: {
          [appId]: {
            protocolReference: metaData + "-" + index,
            originalText: line,
          },
        },
      }))
    );
    await miro.board.selection.selectWidgets(newWidgets);

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
              <div>{metaData ? metaData + "-" + index : "#" + index}</div>
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
