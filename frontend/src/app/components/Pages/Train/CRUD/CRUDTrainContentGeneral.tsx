//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { TextField } from "@material-ui/core";
import produce from "immer";
import React from "react";
import { CRUDTrainProps } from "./CRUDTrainProps";

export type CRUDTrainContentGeneralProps = CRUDTrainProps & {};

const CRUDTrainContentGeneral: React.FC<CRUDTrainContentGeneralProps> = ({
  train,
  setTrain,
  isEditMode,
}) => {
  return (
    <>
      <div className="tw-px-4 tw-py-4">
        <div className="tw-mt-2">
          <TextField
            fullWidth
            label="Nome"
            variant="outlined"
            value={train.title}
            InputProps={{ readOnly: !isEditMode }}
            onChange={({ target }) => {
              setTrain(
                produce(train, (draft) => {
                  draft.title = target.value;
                }),
              );
            }}
            onBlur={({ target }) => {
              if (!isEditMode) return;
              setTrain(
                produce(train, (draft) => {
                  draft.title = target.value.trim();
                }),
              );
            }}
          />
        </div>
      </div>
    </>
  );
};

export default CRUDTrainContentGeneral;
