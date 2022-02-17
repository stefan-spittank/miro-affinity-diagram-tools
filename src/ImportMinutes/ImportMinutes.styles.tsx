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
export const Minutes = styled.div`
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
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  gap: var(--space-large);
  margin-bottom: var(--space-large);

  background:
/* Shadow covers */ linear-gradient(
      white 30%,
      rgba(255, 255, 255, 0)
    ),
    linear-gradient(rgba(255, 255, 255, 0), white 70%) 0 100%,
    /* Shadows */
      radial-gradient(
        50% 0,
        farthest-side,
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0)
      ),
    radial-gradient(
        50% 100%,
        farthest-side,
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0)
      )
      0 100%;
  background:
/* Shadow covers */ linear-gradient(
      white 30%,
      rgba(255, 255, 255, 0)
    ),
    linear-gradient(rgba(255, 255, 255, 0), white 70%) 0 100%,
    /* Shadows */
      radial-gradient(
        farthest-side at 50% 0,
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0)
      ),
    radial-gradient(
        farthest-side at 50% 100%,
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0)
      )
      0 100%;
  background-repeat: no-repeat;
  background-color: white;
  background-size: 100% 40px, 100% 40px, 100% 14px, 100% 14px;

  /* Opera doesn't support this in the shorthand */
  background-attachment: local, local, scroll, scroll;
`;

export const PreviewSticker = styled.div`
  max-width: 300px;
  display: flex;
  flex-direction: column;
`;

export const Sticker = styled.div`
  background-color: #fff9b8;
  border-radius: 4px;
  padding: 0.5rem;
  flex-grow: 1;
  display: flex;
  align-items: center;
  text-align: center;
`;
