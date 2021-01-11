//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { IonItemDivider, IonLabel } from "@ionic/react";
import React from "react";
import CRUDTrainContentStepsAddStep from "./CRUDTrainContentStepsAddStep";
import CRUDTrainContentStepsList from "./CRUDTrainContentStepsList";
import { CRUDTrainProps } from "./CRUDTrainProps";

export type CRUDTrainContentStepsProps = CRUDTrainProps & {
  newStep: any;
  toEditIndex: any;
};

const CRUDTrainContentSteps: React.FC<CRUDTrainContentStepsProps> = ({
  newStep,
  toEditIndex,
  ...crudProps
}) => {
  return (
    <>
      <IonItemDivider>
        <IonLabel>Passos</IonLabel>
      </IonItemDivider>
      <div className="tw-px-4">
        <CRUDTrainContentStepsList {...crudProps} toEditIndex={toEditIndex} />
        <CRUDTrainContentStepsAddStep {...crudProps} newStep={newStep} />
      </div>
    </>
  );
};

export default CRUDTrainContentSteps;
