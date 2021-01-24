//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import localForage from "localforage";
import { setSettings } from "./settings/actions/setSettings";
import { getSettings } from "./settings/selectors/getSettings";
import { ISettingsState, settingsSchema } from "../types/Settings";
import { store } from "./configureStore";

const getPersistentSettings = async (defaultValue: any = {}) =>
  (await localForage.getItem("settings")) || defaultValue;

const setPersistentSettings = async (state: ISettingsState) => {
  await localForage.setItem("settings", state);
};

export async function setupPersistenteStorage() {
  async function loadState() {
    const settings = settingsSchema.cast(await getPersistentSettings());
    store.dispatch(setSettings(settings));
  }

  async function saveState() {
    await setPersistentSettings(getSettings(store.getState()));
  }

  async function subscribePersistenceWatch() {
    saveState();
    store.subscribe(() => saveState());
  }

  await loadState();
  await subscribePersistenceWatch();
}
