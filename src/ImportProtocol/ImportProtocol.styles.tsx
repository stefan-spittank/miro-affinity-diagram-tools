import styled from "styled-components";

export const Input = styled.input`
  // font-family: var(--body-font);
  // font-size: 1rem;
  // padding: 0.25rem;
  // border-radius: 0;
  // border: 1px solid lightgrey;
  width: 100%;
`;
export const Textarea = styled.textarea`
  width: 100%;
  height: 2rem;
  // font-family: var(--body-font);
  // font-size: 1rem;
  // padding: 0.25rem;
  // border-radius: 0;
  // border: 1px solid lightgrey;
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
export const Protocol = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Button = styled.button`
  font-family: var(--body-font);
  font-size: 1rem;
  padding: 14px;
  border-color: rgba(66, 98, 255, 1);
  border-color: var(--blue700);
  background-color: rgba(66, 98, 255, 1);
  background-color: var(--blue700);
  border-radius: var(--radiusM);
`;
export const Preview = styled.div`
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
