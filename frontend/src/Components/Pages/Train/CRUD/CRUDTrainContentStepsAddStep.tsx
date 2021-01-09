//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { IonButton } from "@ionic/react";
import React from "react";
import { CRUDTrainProps } from "./CRUDTrainProps";

export type CRUDTrainContentStepsAddStepProps = CRUDTrainProps & {
  newStep: any;
};

const CRUDTrainContentStepsAddStep: React.FC<CRUDTrainContentStepsAddStepProps> = ({
  newStep,
  isEditMode,
}) => {
  return (
    <div>
      {isEditMode && (
        <IonButton
          expand="block"
          color="primary"
          style={{ textTransform: "initial" }}
          onClick={() => {
            newStep();
          }}
          children="+ Acrescentar Passo"
        />
      )}
    </div>
  );
};

export default CRUDTrainContentStepsAddStep;
