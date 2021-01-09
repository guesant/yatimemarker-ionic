//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import SvgIcon from "@material-ui/core/SvgIcon";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import produce from "immer";
import React, { useState } from "react";
import { CRUDTrainProps } from "./CRUDTrainProps";

export type CRUDTrainContentStepsEditStepProps = CRUDTrainProps & {
  onClose: () => void;
  onDelete: () => void;
  onUpdateStep: (updatedStep: any) => any;
  value: any;
};

const CRUDTrainContentStepsEditStep: React.FC<CRUDTrainContentStepsEditStepProps> = ({
  value,
  onDelete,
  onClose: close,
  onUpdateStep: updateStep,
  train: { title },
}) => {
  const [updatedStep, setUpdatedStep] = useState<any>({ ...value });

  return (
    <>
      <IonModal onDidDismiss={() => close()} isOpen>
        <IonHeader>
          <IonToolbar>
            <IonTitle>{title}</IonTitle>
            <>
              <IonButtons slot="start">
                <IonButton onClick={() => close()}>
                  <SvgIcon component={CloseIcon} />
                </IonButton>
              </IonButtons>
              <IonButtons slot="end">
                <IonButton
                  onClick={() => {
                    close();
                    onDelete();
                  }}
                >
                  <SvgIcon component={DeleteIcon} />
                </IonButton>
                <IonButton
                  onClick={() => {
                    updateStep(updatedStep);
                    close();
                  }}
                >
                  <SvgIcon component={DoneIcon} />
                </IonButton>
              </IonButtons>
            </>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="tw-px-4 tw-py-4">
            <div className="tw-mt-2">
              <TextField
                value={updatedStep.meta.description}
                onChange={({ target }) => {
                  setUpdatedStep(
                    produce(updatedStep, (draft: any) => {
                      draft.meta.description = target.value;
                    })
                  );
                }}
                onBlur={({ target }) => {
                  setUpdatedStep(
                    produce(updatedStep, (draft: any) => {
                      draft.meta.description = target.value.trim();
                    })
                  );
                }}
                fullWidth
                label="Descrição"
                variant="outlined"
              />
            </div>
          </div>
          {/* <IonItem>
            <IonCheckbox
              checked={customDuration}
              onIonChange={(el) => {
                setCustomDuration(!customDuration);
              }}
              slot="start"
            />
            <IonLabel>Customizar Duração</IonLabel>
          </IonItem>
          {customDuration && (
            <div style={{ padding: "1rem 1rem" }}>
              <TextField
                fullWidth
                multiline
                label="Personalizar Duração"
                variant="outlined"
              />
            </div>
          )} */}
        </IonContent>
      </IonModal>
    </>
  );
};

export default CRUDTrainContentStepsEditStep;
