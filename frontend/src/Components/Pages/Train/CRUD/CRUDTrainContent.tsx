import { ITrainStep } from "@ya-time-marker/lib";
import produce from "immer";
import React, { useEffect, useState } from "react";
import CRUDTrainContentGeneral from "./CRUDTrainContentGeneral";
import CRUDTrainContentSteps from "./CRUDTrainContentSteps";
import CRUDTrainContentStepsEditStep from "./CRUDTrainContentStepsEditStep";
import { CRUDTrainProps } from "./CRUDTrainProps";

export const getTrainStep = (description = "Passo"): ITrainStep => {
  return { meta: { description }, duration: { type: "ref", payload: "train" } };
};

export type CRUDTrainContentProps = CRUDTrainProps & {
  editIndex: number;
  setEditIndex: any;
};

const newStepRegExp = /^(Passo) ?(\d*)$/;

const CRUDTrainContent: React.FC<CRUDTrainContentProps> = ({
  children,
  editIndex,
  setEditIndex,
  ...crudProps
}) => {
  const { train, isEditMode, setTrain } = crudProps;
  const [isEditTrainOpen, setEditTrainOpen] = useState(false);

  function newStep() {
    if (!isEditMode) return;
    const { meta: { description = "" } = {} } =
      train.steps[train.steps.length - 1] || {};
    const [fullMatch, txtMatch, counter] = description.match(newStepRegExp) || [
      null,
      "",
      "0",
    ];
    setTrain(
      produce(train, (draft) => {
        draft.steps.push(
          getTrainStep(
            fullMatch
              ? `${txtMatch} ${(counter!.length ? +counter! : 1) + 1}`
              : "Passo 1"
          )
        );
      })
    );
  }

  useEffect(() => {
    if (train.steps.length === 0 && isEditMode) {
      newStep();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [train, isEditMode]);

  function toEditIndex(idx: number) {
    if (!isEditMode) return;
    setEditIndex(idx);
    setEditTrainOpen(idx !== -1);
  }

  function onEditStepModalClose() {
    toEditIndex(-1);
  }

  function onEditStepModalDelete() {
    if (!isEditMode) return;
    setTrain(
      produce(train, (draft) => {
        draft.steps = draft.steps.filter((_, idx) => idx !== editIndex);
      })
    );
  }

  function onEditStepModalUpdate(updatedStep: any) {
    if (!isEditMode) return;
    setTrain(
      produce(train, (draft) => {
        draft.steps[editIndex] = updatedStep;
      })
    );
  }

  return (
    <>
      {isEditTrainOpen && (
        <CRUDTrainContentStepsEditStep
          {...crudProps}
          onClose={onEditStepModalClose}
          onDelete={onEditStepModalDelete}
          onUpdateStep={onEditStepModalUpdate}
          value={train.steps[editIndex]}
        />
      )}
      <CRUDTrainContentGeneral {...crudProps} />
      <CRUDTrainContentSteps
        {...crudProps}
        newStep={newStep}
        toEditIndex={toEditIndex}
      />
    </>
  );
};

export default CRUDTrainContent;
