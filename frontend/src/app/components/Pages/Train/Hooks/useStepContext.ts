//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { ITrainContext } from "@ya-time-marker/lib";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ISettingsState } from "../../../../types/Settings";
import { parseDictDuration } from "./parseDictDuration";

export const useStepContext = () => {
  const { duration } = useSelector(
    (state): ISettingsState => (state as any).settings,
  );

  const [stepContext, setStepContext] = useState<ITrainContext>({
    duration: {
      interval: Infinity,
      startCountdown: Infinity,
      train: Infinity,
    },
  });

  useEffect(() => {
    setStepContext({
      duration: parseDictDuration(duration),
    });
  }, [duration]);

  return stepContext;
};
