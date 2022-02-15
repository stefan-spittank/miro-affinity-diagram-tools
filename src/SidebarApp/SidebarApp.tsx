import * as React from "react";
import { useState } from "react";
import Overview from "../Overview/Overview";
import CreateRandomStacks from "../CreateRandomStacks/CreateRandomStacks";
import { ViewProps, Views } from "../sharedConsts";
import ShowMinutesMetadata from "../ShowMinutesMetadata/ShowMinutesMetadata";
import MiroProvider from "../MiroProvider/MiroProvider";

const getContent = (view: Views, setView: ViewProps["setView"]) => {
  switch (view) {
    case "CreateRandomStacks":
      return <CreateRandomStacks setView={setView} />;
    case "ShowMinutesMetadata":
      return <ShowMinutesMetadata setView={setView} />;
    default:
      return <Overview setView={setView} />;
  }
};

const SidebarApp = () => {
  const [view, setView] = useState<Views>("Overview");

  const content = getContent(view, setView);
  return <MiroProvider>{content}</MiroProvider>;
};

export default SidebarApp;
