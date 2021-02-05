//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { IMode } from "./IMode";

export const getModeFromTimerStep = (timerStep: number): IMode | null => {
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
