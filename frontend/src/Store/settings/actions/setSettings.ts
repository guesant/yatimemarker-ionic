import { createAction } from "@reduxjs/toolkit";

const SET_SETTINGS = "settings/setSettings";
export const setSettings = createAction<any>(SET_SETTINGS);
