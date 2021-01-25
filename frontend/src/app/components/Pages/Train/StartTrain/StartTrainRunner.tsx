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
import { ITrain } from "@ya-time-marker/lib";
import { computeStepDuration } from "@ya-time-marker/lib/build/utils/computeStepDuration";
import {
  checkmark,
  close,
  pause,
  play,
  playSkipBack,
  playSkipForward,
} from "ionicons/icons";
import React, { useCallback, useEffect, useState } from "react";
import { useStepContext } from "../Hooks/useStepContext";
import styles from "./StartTrainRunner.module.css";
import { useTimer } from "./useTimer";

export type IMode = "interval" | "train" | "initialCountdown";

const getModeFromTimerStep = (timerStep: number): IMode | null => {
  if (timerStep >= 0) {
    if (timerStep === 0) {
      return "initialCountdown";
    } else {
      if (timerStep % 2 === 0) {
        return "interval";
      } else {
        return "train";
      }
    }
  }
  return null;
};

export type StartTrainRunnerProps = {
  train: ITrain;

  onTrainEnd: () => any;
};

const StartTrainRunner: React.FC<StartTrainRunnerProps> = ({
  train: { steps },
  onTrainEnd,
}) => {
  const [appTimer] = useTimer();
  const [time, setTime] = useState(0);
  const [status, setStatus] = useState("");
  const [currentTimerStep, setCurrentTimerStep] = useState(-2);

  const stepContext = useStepContext();

  const startTimer = useCallback(() => {
    appTimer.stop();
    if (currentTimerStep >= 0) {
      switch (getModeFromTimerStep(currentTimerStep)) {
        case "initialCountdown":
          appTimer.start(stepContext.duration.startCountdown);
          break;
        case "interval":
          appTimer.start(stepContext.duration.interval);
          break;
        case "train":
          const step = steps[(currentTimerStep - 1) / 2];
          if (step) {
            const duration = computeStepDuration(stepContext)(step);
            appTimer.start(duration);
          }
          break;
      }
    }
  }, [appTimer, currentTimerStep, steps, stepContext]);

  const prevTrainStep = useCallback(() => {
    const currentMode = getModeFromTimerStep(currentTimerStep);
    if (currentMode === "initialCountdown") {
      startTimer();
      return;
    }

    const newTimerStep = (() => {
      switch (currentMode) {
        case "train":
          return currentTimerStep - 3;
        default:
          return currentTimerStep - 2;
      }
    })();

    setCurrentTimerStep(Math.max(newTimerStep, 0));
  }, [currentTimerStep, startTimer]);

  const nextTrainStep = useCallback(() => {
    const currentMode = getModeFromTimerStep(currentTimerStep);

    const nextStep = (() => {
      if (currentMode === "train") {
        return currentTimerStep + 1;
      }
      return currentTimerStep + 2;
    })();

    setCurrentTimerStep(nextStep);
  }, [currentTimerStep]);

  useEffect(() => {
    if (currentTimerStep > steps.length * 2 - 1) {
      onTrainEnd();
      return;
    }
  }, [currentTimerStep, onTrainEnd, steps.length]);

  const handleDone = useCallback(() => {
    const nextStep = currentTimerStep + 1;
    setCurrentTimerStep(nextStep);
  }, [currentTimerStep]);

  const handleTick = useCallback(() => {
    setTime(appTimer.time);
  }, [appTimer]);

  const handleStatus = useCallback(() => {
    setStatus(appTimer.status);
  }, [appTimer]);

  useEffect(() => {
    handleTick();
    handleStatus();
    appTimer.on("tick", handleTick);
    appTimer.on("done", handleDone);
    appTimer.on("statusChanged", handleStatus);
    return () => {
      appTimer.off("done", handleDone);
      appTimer.off("tick", handleTick);
      appTimer.off("statusChanged", handleStatus);
    };
  }, [appTimer, handleDone, handleStatus, handleTick]);

  useEffect(() => {
    if (currentTimerStep === -2) {
      setCurrentTimerStep(0);
    }
    startTimer();
  }, [startTimer, currentTimerStep]);

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
                  <IonTitle>Pausa</IonTitle>
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
                      Pausa
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
                            <p>Preparado para começar.</p>
                            {(() => {
                              const nextStep = steps[currentTimerStep / 2];
                              if (!nextStep) return null;
                              return (
                                <>
                                  <p>
                                    Começa com:{" "}
                                    <span>{nextStep.meta.description}</span>.
                                  </p>
                                </>
                              );
                            })()}
                            <p>
                              Passo {currentTimerStep / 2 + 1} de {steps.length}
                              .
                            </p>
                          </div>
                        )}
                        {mode === "interval" &&
                          (() => {
                            const nextStep = steps[currentTimerStep / 2];
                            if (!nextStep) return null;
                            return (
                              <>
                                <div>
                                  <p>Intervalo.</p>
                                  <p>
                                    Próximo passo: {nextStep.meta.description}.
                                  </p>
                                </div>
                              </>
                            );
                          })()}
                        {mode === "train" &&
                          (() => {
                            const currentStep =
                              steps[(currentTimerStep - 1) / 2];
                            if (!currentStep) return null;
                            return (
                              <>
                                <div>
                                  <p>
                                    <span>
                                      {(currentTimerStep - 1) / 2 + 1}
                                    </span>
                                    <span> / </span>
                                    <span>{steps.length}</span>:
                                  </p>
                                  <p>{currentStep.meta.description}</p>
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
