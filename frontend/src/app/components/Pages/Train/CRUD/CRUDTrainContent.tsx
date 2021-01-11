//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import produce from "immer";
import React, { useEffect, useState } from "react";
import CRUDTrainContentGeneral from "./CRUDTrainContentGeneral";
import CRUDTrainContentSteps from "./CRUDTrainContentSteps";
import CRUDTrainContentStepsEditStep from "./CRUDTrainContentStepsEditStep";
import { CRUDTrainProps } from "./CRUDTrainProps";
import { getTrainStep } from "./getTrainStep";

export type CRUDTrainContentProps = CRUDTrainProps & {
  editIndex: number;
  setEditIndex: any;
};

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
    setTrain(
      produce(train, (draft) => {
        draft.steps.push(getTrainStep(`Passo ${draft.steps.length + 1}`));
      }),
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
      }),
    );
  }

  function onEditStepModalUpdate(updatedStep: any) {
    if (!isEditMode) return;
    setTrain(
      produce(train, (draft) => {
        draft.steps[editIndex] = updatedStep;
      }),
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
