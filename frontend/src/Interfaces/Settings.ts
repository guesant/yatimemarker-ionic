//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { object, string } from "yup";

export type ISettingsState = {
  theme: "_auto" | "dark" | "light";
};

export const settingsSchema = object()
  .shape({
    theme: string().default("_auto"),
  })
  .default(() => ({}));
