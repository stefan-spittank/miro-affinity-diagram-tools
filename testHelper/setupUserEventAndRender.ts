import userEvent from "@testing-library/user-event";
import { render } from "@testing-library/react";

// https://testing-library.com/docs/user-event/setup/
export const setupUserEventAndRender = (jsx: JSX.Element) => ({
  user: userEvent.setup(),
  ...render(jsx),
});
