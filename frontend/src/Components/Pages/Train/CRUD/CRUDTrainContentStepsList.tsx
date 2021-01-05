import { IonList, IonItem, IonLabel } from "@ionic/react";
import { ITrain } from "@ya-time-marker/lib";
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
