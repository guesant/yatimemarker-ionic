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
import { useTranslation } from "react-i18next";
import "../../../../../translations/i18n";

export type CRUDTrainContentStepsProps = CRUDTrainProps & {
  newStep: any;
  toEditIndex: any;
};

const CRUDTrainContentSteps: React.FC<CRUDTrainContentStepsProps> = ({
  newStep,
  toEditIndex,
  ...crudProps
}) => {
  const { t } = useTranslation();
  return (
    <>
      <IonItemDivider>
        <IonLabel>{t("crud_train_content_steps_label")}</IonLabel>
      </IonItemDivider>
      <div className="tw-px-4">
        <CRUDTrainContentStepsList {...crudProps} toEditIndex={toEditIndex} />
        <CRUDTrainContentStepsAddStep {...crudProps} newStep={newStep} />
      </div>
    </>
  );
};

export default CRUDTrainContentSteps;
