import * as React from "react";
import { useState } from "react";
import { getMiroInstance } from "../miroInstance";
import { getWidgetBounds, widgetSize } from "../Tools/interviewStickerTools";
import {
  divideArrayIntoRandomStacks,
  updateStickerPositionsForGivenStacks,
} from "./CreateRandomStacks.tools";
import { Breadcrumb } from "../SharedComponents/Breadcrumb";
import { ViewProps } from "../sharedConsts";
import { useMiro } from "../MiroProvider/MiroProvider";

const CreateRandomStacks = ({ setView }: ViewProps) => {
  const miroInstance = getMiroInstance();
  const { selectedSticker } = useMiro();

  const [numberOfParticipantsRaw, setNumberOfParticipantsRaw] = useState("2");
  const [numberOfParticipants, setNumberOfParticipants] = useState(2);
  const [numberOfParticipantsInvalid, setNumberOfParticipantsInvalid] =
    useState(false);

  const [maxNumberOfStickersRaw, setMaxNumberOfStickersRaw] = useState("");
  const [maxNumberOfStickers, setMaxNumberOfStickers] = useState<
    number | undefined
  >();
  const [maxNumberOfStickersInvalid, setMaxNumberOfStickersInvalid] =
    useState(false);

  const createRandomStacks = async () => {
    const stacks = divideArrayIntoRandomStacks(
      selectedSticker,
      numberOfParticipants,
      maxNumberOfStickers
    );

    const viewport = await miroInstance.board.viewport.get();

    const startY = viewport.y + widgetSize / 2;
    const startX = viewport.x + widgetSize / 2;

    const stickersToUpdate = updateStickerPositionsForGivenStacks(
      stacks,
      startX,
      startY
    );
    const updatedSticker = await miroInstance.board.widgets.update(
      stickersToUpdate
    );
    await miroInstance.board.selection.selectWidgets(updatedSticker);
    const newViewport = getWidgetBounds(updatedSticker);
    if (newViewport) {
      await miroInstance.board.viewport.set(newViewport);
    }
    await miroInstance.board.ui.closeLeftSidebar();
  };

  return (
    <>
      <h2>
        <Breadcrumb
          href=""
          onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
            e.preventDefault();
            setView("Overview");
          }}
        >
          Affinity Diagram Tools /
        </Breadcrumb>
        Create Random Stacks
      </h2>
      <p className="p-small">
        Selected number of stickers with notes: {selectedSticker.length}
      </p>
      <p className="p-medium">
        In an interpretation session, each participant will be given a stack of
        random stickers, to help building the affinity map (see
        &ldquo;Contextual Design (2nd Edition)&rdquo; by Karen Holtzblatt, p.
        139).
      </p>
      <p className="p-medium">
        Use this screen to create random stack of stickers from your selection.
      </p>
      <div
        className={"form-group" + (numberOfParticipantsInvalid ? " error" : "")}
      >
        <label htmlFor="numberOfParticipants">Number of participants</label>
        <input
          className={"input"}
          id="numberOfParticipants"
          value={numberOfParticipantsRaw}
          type="number"
          onChange={(event) => {
            setNumberOfParticipantsRaw(event.target.value);
          }}
          onBlur={() => {
            const newValue = parseInt(numberOfParticipantsRaw);
            if (isNaN(newValue)) {
              setNumberOfParticipantsInvalid(true);
            } else {
              setNumberOfParticipants(newValue);
            }
          }}
        />
      </div>
      <div
        className={"form-group" + (maxNumberOfStickersInvalid ? " error" : "")}
      >
        <label htmlFor="maxNumberOfStickers">
          Max. number of stickers per participant
        </label>
        <p className="p-small">
          Leave this field empty to distribute all available stickers
        </p>
        <input
          className="input"
          id="maxNumberOfStickers"
          placeholder={
            !numberOfParticipantsInvalid && selectedSticker.length > 0
              ? Math.ceil(
                  selectedSticker.length / numberOfParticipants
                ).toString()
              : ""
          }
          value={maxNumberOfStickersRaw}
          onChange={(event) => setMaxNumberOfStickersRaw(event.target.value)}
          onBlur={() => {
            const newValue =
              maxNumberOfStickersRaw !== undefined &&
              maxNumberOfStickersRaw !== ""
                ? parseInt(maxNumberOfStickersRaw)
                : undefined;
            if (newValue && isNaN(newValue)) {
              setMaxNumberOfStickersInvalid(true);
            } else {
              setMaxNumberOfStickers(newValue);
            }
          }}
        />
      </div>
      <button
        className="button button-primary"
        onClick={createRandomStacks}
        disabled={
          selectedSticker.length === 0 ||
          numberOfParticipantsInvalid ||
          maxNumberOfStickersInvalid
        }
      >
        {selectedSticker.length === 0
          ? "No interview stickers selected"
          : "Create random stacks"}
      </button>
    </>
  );
};
export default CreateRandomStacks;
