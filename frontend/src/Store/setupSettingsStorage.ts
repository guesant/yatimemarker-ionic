//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import localForage from "localforage";
import { setSettings } from "./settings/actions/setSettings";
import { getSettings } from "./settings/selectors/getSettings";
import { settingsSchema } from "../Interfaces/Settings";
import { store } from "./configureStore";

export async function setupSettingsStorage() {
  async function loadSettings() {
    const settings = settingsSchema.cast(
      (await localForage.getItem("settings")) || {}
    );
    store.dispatch(setSettings(settings));
  }

  async function saveSettings() {
    await localForage.setItem("settings", getSettings(store.getState()));
  }

  async function subscribeSettings() {
    saveSettings();
    store.subscribe(() => saveSettings());
  }

  await loadSettings();
  await subscribeSettings();
}
