//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { createAction } from "@reduxjs/toolkit";

const SET_SETTINGS = "settings/setSettings";
export const setSettings = createAction<any>(SET_SETTINGS);
