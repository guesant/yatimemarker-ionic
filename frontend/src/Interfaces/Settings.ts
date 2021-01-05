import { object, string } from "yup";

export type ISettingsState = {
  theme: "_auto" | "dark" | "light";
};

export const settingsSchema = object()
  .shape({
    theme: string().default("_auto"),
  })
  .default(() => ({}));
