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
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonLabel,
  IonModal,
  IonTitle,
  IonToolbar,
  useIonViewDidLeave,
  useIonViewWillEnter,
} from "@ionic/react";
import { CircularProgress } from "@material-ui/core";
import {
  checkmark,
  close,
  pause,
  play,
  playSkipBack,
  playSkipForward,
} from "ionicons/icons";
import React, { useContext } from "react";
import { getModeFromTimerStep } from "./Hooks/getModeFromTimerStep";
import { StartTrainContext } from "./Hooks/StartTrainContext";
import styles from "./StartTrainRunner.module.css";
import "../../../../../translations/i18n";
import { useTranslation } from "react-i18next";

const StartTrainRunner: React.FC = () => {
  const { t } = useTranslation();
  const {
    time,
    appTimer,
    status,
    nextTrainStep,
    prevTrainStep,
    train: { steps },
    setCurrentTimerStep,
    currentTimerStep,
  } = useContext(StartTrainContext);

  useIonViewWillEnter(() => {
    setCurrentTimerStep(0);
  });

  useIonViewDidLeave(() => {
    setCurrentTimerStep(-1);
  });

  return (
    <>
      <>
        {time === Infinity && (
          <>
            <IonFab vertical="bottom" horizontal="end" slot="fixed">
              <IonFabButton
                color="primary"
                onClick={() => {
                  nextTrainStep();
                }}
                children={<IonIcon icon={checkmark} />}
              />
            </IonFab>
          </>
        )}
      </>
      <div>
        <>
          <div>
            <IonModal
              cssClass={styles.modalClass}
              isOpen={status === "paused"}
              backdropDismiss={false}
              onDidDismiss={() => appTimer.resume()}
            >
              <IonHeader>
                <IonToolbar>
                  <IonTitle>{t("start_train_runner_paused_header")}</IonTitle>
                  <IonButtons slot="end">
                    <IonButton onClick={() => appTimer.resume()}>
                      <IonIcon icon={close} />
                    </IonButton>
                  </IonButtons>
                </IonToolbar>
              </IonHeader>
              <IonContent>
                <div className="tw-h-full">
                  <div className="tw-flex tw-justify-center tw-items-center tw-flex-col tw-h-full">
                    <IonLabel
                      className="tw-text-3xl tw-font-bold tw-mb-2"
                      style={{ color: "var(--ion-text-color)" }}
                    >
                      {t("start_train_runner_paused_description")}
                    </IonLabel>
                    <div>
                      <IonButton
                        size="large"
                        fill="clear"
                        onClick={() => prevTrainStep()}
                      >
                        <IonIcon icon={playSkipBack} />
                      </IonButton>
                      <IonButton
                        size="large"
                        fill="clear"
                        onClick={() => appTimer.resume()}
                      >
                        <IonIcon icon={status === "paused" ? play : pause} />
                      </IonButton>
                      <IonButton
                        size="large"
                        fill="clear"
                        onClick={() => nextTrainStep()}
                      >
                        <IonIcon icon={playSkipForward} />
                      </IonButton>
                    </div>
                  </div>
                </div>
              </IonContent>
            </IonModal>
          </div>
          <div onClick={() => appTimer.pause()}>
            <div className="tw-py-4">
              <div className="tw-px-4">
                <div>
                  <div className="tw-grid tw-px-16 tw-py-6">
                    <CircularProgress
                      style={{
                        gridArea: "1/1",
                        width: "100%",
                        height: "100%",
                      }}
                      variant="determinate"
                      value={(Math.ceil(time) / appTimer.duration) * 100}
                    />
                    <div
                      className="tw-flex tw-justify-items-center tw-items-center"
                      style={{ gridArea: "1/1" }}
                    >
                      <p className="tw-w-full tw-text-center tw-text-4xl">
                        {Math.ceil(time / 1000)}
                      </p>
                    </div>
                  </div>
                  {(() => {
                    const mode = getModeFromTimerStep(currentTimerStep);
                    return (
                      <>
                        {mode === "initialCountdown" && (
                          <div>
                            <p>{t("start_train_runner_state_ready_to_go")}</p>
                            {(() => {
                              const index = currentTimerStep / 2;
                              const nextStep = steps[index];
                              if (!nextStep) return null;
                              return (
                                <>
                                  <p>
                                    {t("start_train_runner_state_starts_with", {
                                      description:
                                        nextStep.meta?.description ||
                                        `Passo ${index + 1}.`,
                                    })}
                                  </p>
                                </>
                              );
                            })()}
                            <p>
                              {t("start_train_runner_nth_step_of_total", {
                                step: currentTimerStep / 2 + 1,
                                total: steps.length,
                              })}
                            </p>
                          </div>
                        )}
                        {mode === "interval" &&
                          (() => {
                            const index = currentTimerStep / 2;
                            const nextStep = steps[index];
                            if (!nextStep) return null;
                            return (
                              <>
                                <div>
                                  <p>
                                    {t("start_train_runner_state_interval")}
                                  </p>
                                  <p>
                                    {t("start_train_runner_state_next_step", {
                                      description:
                                        nextStep.meta?.description ||
                                        `Passo ${index + 1}`,
                                    })}
                                  </p>
                                </div>
                              </>
                            );
                          })()}
                        {mode === "train" &&
                          (() => {
                            const index = (currentTimerStep - 1) / 2;
                            const currentStep = steps[index];
                            if (!currentStep) return null;
                            return (
                              <>
                                <div>
                                  <p>
                                    {t(
                                      "start_train_runner_nth_step_slash_total",
                                      {
                                        step: (currentTimerStep - 1) / 2 + 1,
                                        total: steps.length,
                                      },
                                    )}
                                    :
                                  </p>
                                  <p>
                                    {currentStep.meta?.description ||
                                      `Passo ${index + 1}.`}
                                  </p>
                                </div>
                              </>
                            );
                          })()}
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default StartTrainRunner;
