import { settingsSchema, ISettingsState } from "../../../Interfaces/Settings";

export const getSettings = (state: any) =>
  settingsSchema.cast(state.settings) as ISettingsState;
