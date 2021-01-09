//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { settingsSchema, ISettingsState } from "../../../Interfaces/Settings";

export const getSettings = (state: any) =>
  settingsSchema.cast(state.settings) as ISettingsState;
