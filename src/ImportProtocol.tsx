import * as React from "react";
import { useState } from "react";
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
  flex-grow: 1;
  padding: 0.25rem;
  border-radius: 0;
  border: 1px solid lightgrey;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
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

function ImportProtocol() {
  const [protocolText, setProtocolText] = useState("");
  const [metaData, setMetaData] = useState("");

  const addWidgets = async () => {
    const lines = protocolText.split(/\r?\n/);
    const startY = 0;
    const widgetHeight = 100;

    await miro.board.widgets.create(
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
  };

  return (
    <Container>
      <p>Create stickers from your recent protocol</p>

      <p>
        <label htmlFor="protocolPrefix">Protocol reference prefix</label>
        <Input
          name="protocolPrefix"
          value={metaData}
          onChange={(event) => setMetaData(event.target.value)}
        />
      </p>

      <p>
        <label htmlFor="protocolEntries">Paste the protocol below</label>
        <Textarea
          name="protocolEntries"
          value={protocolText}
          onChange={(event) => {
            setProtocolText(event.target.value);
          }}
        />
      </p>
      <Button onClick={addWidgets}>Create sticker</Button>
    </Container>
  );
}

ReactDOM.render(<ImportProtocol />, document.getElementById("root"));
