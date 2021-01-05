import { object } from "yup";

export type ISettingsState = {
};

export const settingsSchema = object()
  .shape({})
  .default(() => ({}));
