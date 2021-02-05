//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { IonButton } from "@ionic/react";
import React from "react";
import { CRUDTrainProps } from "./CRUDTrainProps";
import { useTranslation } from "react-i18next";
import "../../../../../translations/i18n";
export type CRUDTrainContentStepsAddStepProps = CRUDTrainProps & {
  newStep: any;
};

const CRUDTrainContentStepsAddStep: React.FC<CRUDTrainContentStepsAddStepProps> = ({
  newStep,
  isEditMode,
}) => {
  const { t } = useTranslation();
  return (
    <div>
      {isEditMode && (
        <IonButton
          expand="block"
          color="primary"
          style={{ textTransform: "initial" }}
          onClick={() => newStep()}
          children={`+ ${t("crud_train_content_steps_add_step")}`}
        />
      )}
    </div>
  );
};

export default CRUDTrainContentStepsAddStep;
