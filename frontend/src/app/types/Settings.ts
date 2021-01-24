//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { object, string } from "yup";
import {
  DEFAULT_TRAIN_DURATION,
  DEFAULT_INTERVAL_DURATION,
  DEFAULT_START_COUNTDOWN_DURATION,
} from "../constants/defaultDuration";

export type ISettingsState = {
  theme: "_auto" | "dark" | "light";
  duration: {
    train: string;
    interval: string;
    startCountdown: string;
  };
};

export const settingsSchema = object()
  .shape({
    theme: string().default("_auto"),
    duration: object()
      .shape({
        train: string().default(DEFAULT_TRAIN_DURATION),
        interval: string().default(DEFAULT_INTERVAL_DURATION),
        startCountdown: string().default(DEFAULT_START_COUNTDOWN_DURATION),
      })
      .default(() => ({})),
  })
  .default(() => ({}));
