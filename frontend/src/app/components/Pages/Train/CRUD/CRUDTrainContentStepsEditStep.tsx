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
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import SvgIcon from "@material-ui/core/SvgIcon";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import { ITrainStep } from "@ya-time-marker/lib";
import produce from "immer";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
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
  const [updatedStep, setUpdatedStep] = useState<ITrainStep>({ ...value });
  const { t } = useTranslation();

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
          <div className="tw-px-4">
            <div className="tw-py-4">
              <div className="tw-mt-2">
                <TextField
                  value={updatedStep.meta.description}
                  onChange={({ target }) => {
                    setUpdatedStep(
                      produce(updatedStep, (draft) => {
                        draft.meta.description = target.value;
                      }),
                    );
                  }}
                  onBlur={({ target }) => {
                    setUpdatedStep(
                      produce(updatedStep, (draft) => {
                        draft.meta.description = target.value.trim();
                      }),
                    );
                  }}
                  fullWidth
                  label="Descrição"
                  variant="outlined"
                />
              </div>
            </div>
          </div>
          <IonList>
            <IonItem>
              <IonLabel>Modo</IonLabel>
              <IonSelect
                value={updatedStep.type}
                okText={t("prompt_ok")}
                cancelText={t("prompt_close")}
                onIonChange={(e) => {
                  setUpdatedStep(
                    produce(updatedStep, (draft) => {
                      const type = e.detail.value;
                      switch (type) {
                        case "duration":
                          draft.payload = {
                            type: "ref",
                            payload: "train",
                          };
                          break;

                        case "text":
                          draft.payload = {
                            type: "template",
                            payload: "",
                          };
                          break;
                      }
                      draft.type = type;
                    }),
                  );
                }}
                children={
                  <>
                    <IonSelectOption value="duration" children="Tempo" />
                    <IonSelectOption value="text" children="Texto" />
                  </>
                }
              />
            </IonItem>

            {updatedStep.type === "duration" && (
              <>
                <IonItem>
                  <IonLabel>Tempo</IonLabel>
                  <IonSelect
                    value={updatedStep.payload.type}
                    okText={t("prompt_ok")}
                    cancelText={t("prompt_close")}
                    onIonChange={(e) => {
                      setUpdatedStep(
                        produce(updatedStep, (draft) => {
                          const type = e.detail.value;
                          switch (type) {
                            case "ref":
                              draft.payload = {
                                type: "ref",
                                payload: "train",
                              };
                              break;
                            case "template":
                              draft.payload = {
                                type: "template",
                                payload: "",
                              };
                              break;
                          }
                        }),
                      );
                    }}
                    children={
                      <>
                        <IonSelectOption value="ref" children="Referência" />
                        <IonSelectOption
                          value="template"
                          children="Tempo Customizado"
                        />
                      </>
                    }
                  />
                </IonItem>
                {updatedStep.payload.type === "ref" && (
                  <IonItem>
                    <IonLabel>Referência</IonLabel>
                    <IonSelect
                      value={updatedStep.payload.payload}
                      okText={t("prompt_ok")}
                      cancelText={t("prompt_close")}
                      onIonChange={(e) => {
                        setUpdatedStep(
                          produce(updatedStep, (draft) => {
                            const type = e.detail.value;
                            draft.payload.payload = type;
                          }),
                        );
                      }}
                      children={
                        <>
                          <IonSelectOption value="train" children="Treino" />
                        </>
                      }
                    />
                  </IonItem>
                )}
                {updatedStep.payload.type === "template" && (
                  <div style={{ padding: "1rem 1rem" }}>
                    <TextField
                      value={updatedStep.payload.payload}
                      onChange={({ target }) => {
                        setUpdatedStep(
                          produce(updatedStep, (draft) => {
                            draft.payload.payload = target.value;
                          }),
                        );
                      }}
                      fullWidth
                      multiline
                      label="Template"
                      variant="outlined"
                    />
                  </div>
                )}
              </>
            )}

            {updatedStep.type === "text" && (
              <>
                {updatedStep.payload.type === "template" && (
                  <div style={{ padding: "1rem 1rem" }}>
                    <TextField
                      value={updatedStep.payload.payload}
                      onChange={({ target }) => {
                        setUpdatedStep(
                          produce(updatedStep, (draft) => {
                            draft.payload.payload = target.value;
                          }),
                        );
                      }}
                      fullWidth
                      multiline
                      label="Texto do Treino"
                      variant="outlined"
                    />
                  </div>
                )}
              </>
            )}
          </IonList>

          {updatedStep.type === "duration" &&
            updatedStep.payload.type === "template" && (
              <div className="tw-py-4">
                <div className="tw-px-4">
                  <p className="tw-select-none tw-text-right">
                    Feito em Ji-Paraná - RO{" "}
                    <span role="img" aria-label="Brasil">
                      🇧🇷
                    </span>
                  </p>
                </div>
              </div>
            )}
        </IonContent>
      </IonModal>
    </>
  );
};

export default CRUDTrainContentStepsEditStep;
