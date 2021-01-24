//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { AppTheme } from "../services/AppTheme";
import settingsReducer from "./settings";
import { setupPersistenteStorage } from "./setupSettingsStorage";

const reducer = combineReducers({ settings: settingsReducer });

export const store = configureStore({ reducer });

store.subscribe(() => {
  AppTheme.loadTheme();
});

setupPersistenteStorage();

export default store;
