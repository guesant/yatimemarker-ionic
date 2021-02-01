//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { ITrain } from "@ya-time-marker/lib";
import { computeStepDuration } from "@ya-time-marker/lib/build/utils/computeStepDuration";
import React, { createContext, useCallback, useEffect, useState } from "react";
import Timer from "tiny-timer";
import { useStepContext } from "../../Hooks/useStepContext";
import { useTimer } from "../useTimer";
import { getModeFromTimerStep } from "./getModeFromTimerStep";

export const StartTrainContext = createContext<IStartTrainContext>({} as any);

export type IStartTrainContext = {
  time: number;
  train: ITrain;
  status: string;
  appTimer: Timer;
  prevTrainStep: any;
  nextTrainStep: any;
  setCurrentTimerStep: any;
  currentTimerStep: number;
};

export const StartTrainProvider: React.FC<{
  train: ITrain;
  onTrainEnd: () => any;
}> = ({ children, train, train: { steps }, onTrainEnd }) => {
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
    currentTimerStep === -2 && setCurrentTimerStep(0);
    startTimer();
  }, [startTimer, currentTimerStep]);

  return (
    <StartTrainContext.Provider
      value={{
        time,
        train,
        status,
        appTimer,
        prevTrainStep,
        nextTrainStep,
        currentTimerStep,
        setCurrentTimerStep,
      }}
      children={children}
    />
  );
};
