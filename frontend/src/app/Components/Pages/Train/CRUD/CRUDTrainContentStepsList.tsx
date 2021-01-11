//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { IonItem, IonLabel, IonList } from "@ionic/react";
import React, { Fragment } from "react";
import { CRUDTrainProps } from "./CRUDTrainProps";

export type CRUDTrainContentStepsListProps = CRUDTrainProps & {
  toEditIndex: any;
};

const CRUDTrainContentStepsList: React.FC<CRUDTrainContentStepsListProps> = ({
  train,
  isEditMode,
  toEditIndex,
}) => {
  return (
    <IonList>
      {!train.steps.length && (
        <IonLabel>
          {isEditMode
            ? "Ainda não possui passos. Acrescente um no botão abaixo."
            : "Não possui nenhum passo."}
        </IonLabel>
      )}
      {train.steps.length > 0 &&
        train.steps.map(({ meta: { description } }, idx) => (
          <Fragment
            key={idx}
            children={
              <IonItem
                detail={false}
                button={isEditMode}
                onClick={() => isEditMode && toEditIndex(idx)}
                children={<IonLabel>{description}</IonLabel>}
              />
            }
          />
        ))}
    </IonList>
  );
};

export default CRUDTrainContentStepsList;
