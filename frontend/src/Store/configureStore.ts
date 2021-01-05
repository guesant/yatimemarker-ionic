import { combineReducers, configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./settings";
import { setupSettingsStorage } from "./setupSettingsStorage";

const reducer = combineReducers({ settings: settingsReducer });

export const store = configureStore({ reducer });

setupSettingsStorage();

export default store;
