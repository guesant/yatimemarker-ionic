//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { ITrainContext, ITrainStep } from "../types";

export const computeCountdownDuration = ({
  duration: { startCountdown },
}: ITrainContext) => startCountdown;

export const computeIntervalsDuration = (
  { duration: { interval } }: ITrainContext,
  { length }: ITrainStep[],
) => interval * (length - 1);

export const computeMidTrainDuration = (
  stepConetext: ITrainContext,
  steps: ITrainStep[],
) =>
  steps.length > 0
    ? computeCountdownDuration(stepConetext) +
      computeIntervalsDuration(stepConetext, steps)
    : 0;
