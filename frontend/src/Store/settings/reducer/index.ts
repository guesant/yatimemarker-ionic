import { createReducer } from "@reduxjs/toolkit";
import { settingsSchema } from "../../../Interfaces/Settings";
import { setSettings } from "../actions/setSettings";

const settingsReducer = createReducer({}, (builder) => {
  builder.addCase(setSettings, (_, { payload }) => {
    return settingsSchema.cast(payload);
  });
});

export default settingsReducer;
