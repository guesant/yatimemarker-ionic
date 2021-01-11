//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import store from "../store/configureStore";
import { getSettings } from "../store/settings/selectors/getSettings";

export type AppThemeSupportedModes = "light" | "dark";

const getDarkMatchMedia = () =>
  window.matchMedia("(prefers-color-scheme: dark)");

export const getBrowserTheme = () => {
  return getDarkMatchMedia().matches ? "dark" : "light";
};

export const getParsedTheme = (theme: AppThemeSupportedModes | "_auto") =>
  theme === "_auto" ? getBrowserTheme() : theme;

export class AppTheme {
  static startThemeListener() {
    AppTheme.loadTheme();
    const prefersDark = getDarkMatchMedia();
    prefersDark.addEventListener("change", () => AppTheme.loadTheme());
  }
  static async loadTheme() {
    const { theme } = getSettings(store.getState());
    document.body.classList.toggle("dark", getParsedTheme(theme) === "dark");
  }
}
