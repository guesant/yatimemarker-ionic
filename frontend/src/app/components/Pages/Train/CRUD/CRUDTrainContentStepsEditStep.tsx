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
import equal from "deep-equal";
import produce from "immer";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CRUDTrainProps } from "./CRUDTrainProps";

export type CRUDTrainContentStepsEditStepProps = CRUDTrainProps & {
  onClose: () => void;
  onDelete: () => void;
  onUpdateStep: (updatedStep: any) => any;
  value: any;
};

const getUnifiedMode = (step: ITrainStep) =>
  step.type === "duration"
    ? [
        "d",
        ...(step.payload.type === "ref"
          ? [step.payload.type, step.payload.payload]
          : [step.payload.type]),
      ].join("_")
    : step.type;

const ensureStepMeta = (step: ITrainStep) => {
  if (!step.meta) {
    step.meta = { description: "" };
  } else if (!step.meta.description) {
    step.meta.description = "";
  }
  return step;
};

const CRUDTrainContentStepsEditStep: React.FC<CRUDTrainContentStepsEditStepProps> = ({
  value,
  onDelete,
  onClose: close,
  onUpdateStep: updateStep,
  train: { title },
}) => {
  const [updatedStep, setUpdatedStep] = useState<ITrainStep>({ ...value });
  const [unifiedMode, setUnifiedMode] = useState(() =>
    getUnifiedMode(updatedStep),
  );
  const { t } = useTranslation();

  useEffect(() => {
    setUnifiedMode(getUnifiedMode(updatedStep));
  }, [updatedStep]);

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
                  value={updatedStep.meta?.description || ""}
                  onChange={({ target }) => {
                    setUpdatedStep(
                      produce(updatedStep, (draft) => {
                        ensureStepMeta(draft);
                        draft.meta!.description = target.value;
                      }),
                    );
                  }}
                  onBlur={({ target }) => {
                    setUpdatedStep(
                      produce(updatedStep, (draft) => {
                        ensureStepMeta(draft);
                        draft.meta!.description = target.value.trim();
                      }),
                    );
                  }}
                  fullWidth
                  placeholder="Descrição"
                  variant="outlined"
                />
              </div>
            </div>
          </div>
          <IonList>
            <IonItem>
              <IonLabel>Modo</IonLabel>
              <IonSelect
                value={unifiedMode}
                okText={t("prompt_ok")}
                cancelText={t("prompt_close")}
                onIonChange={(e) => {
                  const type = String(e.detail.value);
                  const newStep = produce(updatedStep, (draft: ITrainStep) => {
                    if (type.startsWith("d_")) {
                      draft.type = "duration";
                      if (type.match(/^d_ref_?/)) {
                        draft.payload = {
                          type: "ref",
                          payload:
                            (type.replace("d_ref_", "") as any) || "train",
                        };
                      } else if (type === "d_template") {
                        draft.payload = {
                          type: "template",
                          payload: "",
                        };
                      }
                    }
                    if (type === "text") {
                      draft.type = "text";
                      draft.payload = {
                        type: "template",
                        payload: "",
                      };
                    }
                  });
                  if (equal(newStep, updatedStep, { strict: true })) return;
                  setUpdatedStep(newStep);
                }}
                children={
                  <>
                    <IonSelectOption value="text" children="Prescrição" />
                    <IonSelectOption
                      value="d_ref_train"
                      children="Preferência: Treino"
                    />
                    <IonSelectOption
                      value="d_template"
                      children="Tempo Customizado"
                    />
                  </>
                }
              />
            </IonItem>

            {updatedStep.type === "duration" && (
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
                      placeholder="Tempo. Ex.: 30s"
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
                      fullWidth
                      multiline
                      variant="outlined"
                      placeholder="Prescrição. Ex.: 10 flexões"
                      value={updatedStep.payload.payload}
                      onChange={({ target }) => {
                        setUpdatedStep(
                          produce(updatedStep, (draft) => {
                            draft.payload.payload = target.value;
                          }),
                        );
                      }}
                    />
                  </div>
                )}
              </>
            )}
          </IonList>
        </IonContent>
      </IonModal>
    </>
  );
};

export default CRUDTrainContentStepsEditStep;
