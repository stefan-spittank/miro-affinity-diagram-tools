import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Wrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

export const StickerData = styled.div`
  margin-top: 1rem;
`;
export const StickerContainer = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;
export const Sticker = styled.div`
  background-color: #fff9b8;
  border-radius: 4px;
  padding: 0.5rem;
  margin-bottom: 1.5rem;
  margin-right: 0.5rem;
`;

export const Grid = styled.div`
  display: grid;
  position: relative;
`;

export const StickerEditor = styled.textarea`
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border: none;
  line-height: 1.5;
`;

export const OriginalWord = styled.span`
  background-color: lightblue;
`;

export const ChangedWord = styled.span``;
