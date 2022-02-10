import * as React from "react";
import { useState } from "react";
import Overview from "../Overview/Overview";
import CreateRandomStacks from "../CreateRandomStacks/CreateRandomStacks";
import { Views } from "../sharedConsts";
import ShowProtocolReference from "../ShowProtocolReference/ShowProtocolReference";

const SidebarApp = () => {
  const [view, setView] = useState<Views>("Overview");
  switch (view) {
    case "CreateRandomStacks":
      return <CreateRandomStacks setView={setView} />;
    case "ShowProtocolReference":
      return <ShowProtocolReference setView={setView} />;
    default:
      return <Overview setView={setView} />;
  }
};

export default SidebarApp;
