//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { ITrainContext, ITrainStep } from "../types";
import { computeDuration } from "./computeDuration";

export const computeStepDuration = <
  Context extends ITrainContext = ITrainContext
>(
  stepContext: Context,
) => (step: ITrainStep) => {
  if (step.type === "duration") {
    return ((n) => (isNaN(n) ? Infinity : Math.abs(n)))(
      (() => {
        switch (step.payload.type) {
          case "ref":
            return stepContext.duration[step.payload.payload];
          case "template":
            return computeDuration(stepContext)(step.payload.payload);
        }
      })(),
    );
  }
  return Infinity;
};
