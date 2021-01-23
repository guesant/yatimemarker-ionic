//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

export type ITrainContext = {
  duration: {
    train: number;
    interval: number;
    startCountdown: number;
  };
};
