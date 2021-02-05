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
import { useTranslation } from "react-i18next";
import "../../../../../translations/i18n";

export type CRUDTrainContentGeneralProps = CRUDTrainProps & {};
const CRUDTrainContentGeneral: React.FC<CRUDTrainContentGeneralProps> = ({
  train,
  setTrain,
  isEditMode,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="tw-px-4 tw-py-4">
        <div>
          <TextField
            fullWidth
            placeholder={t("crud_train_content_general_name")}
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
