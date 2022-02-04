/**
 * Start here
 */
declare global {
  const miro: SDK.Root;
  interface ImportMeta {
    env: {
      VITE_MIRO_APP_ID: string;
    };
  }
}

export {};
