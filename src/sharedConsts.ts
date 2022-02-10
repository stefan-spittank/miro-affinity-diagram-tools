export const appId = import.meta.env.VITE_MIRO_APP_ID || "3458764514442200539";
export const IS_DEV_MODE = import.meta.env.DEV || false;
export type Views = "Overview" | "CreateRandomStacks" | "ShowProtocolReference";

export type ViewProps = {
  setView: (view: Views) => void;
};
