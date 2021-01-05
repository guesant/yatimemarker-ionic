import store from "../Store/configureStore";
import { getSettings } from "../Store/settings/selectors/getSettings";

export type AppThemeSupportedModes = "light" | "dark";

const getDarkMatchMedia = () =>
  window.matchMedia("(prefers-color-scheme: dark)");

export class AppTheme {
  static startThemeListener() {
    AppTheme.loadTheme();
    const prefersDark = getDarkMatchMedia();
    prefersDark.addEventListener("change", () => AppTheme.loadTheme());
  }
  static async loadTheme() {
    let themeMode = "light";
    const { theme } = getSettings(store.getState());
    switch (theme) {
      case "_auto":
        themeMode = getDarkMatchMedia().matches ? "dark" : "light";
        break;
      default:
        themeMode = theme;
        break;
    }
    document.body.classList.toggle("dark", themeMode === "dark");
  }
}
