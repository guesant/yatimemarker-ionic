//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { createReducer } from "@reduxjs/toolkit";
import { settingsSchema } from "../../../app/types/Settings";
import { setSettings } from "../actions/setSettings";

const settingsReducer = createReducer({}, (builder) => {
  builder.addCase(setSettings, (_, { payload }) => {
    return settingsSchema.cast(payload);
  });
});

export default settingsReducer;
