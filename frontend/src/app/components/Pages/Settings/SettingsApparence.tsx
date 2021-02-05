//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import {
  IonList,
  IonListHeader,
  IonLabel,
  IonItem,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import React, { Fragment } from "react";
import { useAppThemeUpdater } from "../../Hooks/useAppThemeUpdater";
import { useTranslation } from "react-i18next";
import "../../../../translations/i18n";

const getSupportedThemes = () =>
  [["_auto", "auto"], ["light"], ["dark"]]
    .map(([value, i18nKey]) => [value, i18nKey || value])
    .map(([value, i18nKey]) => ({ value, i18nKey }))
    .map(({ i18nKey, ...i }) => ({
      ...i,
      i18nKey: ["settings_apparence_theme", i18nKey].join("_"),
    }));

const supportedThemes = getSupportedThemes();

const SettingsApparence = () => {
  const [theme, setColorTheme] = useAppThemeUpdater();
  const { t } = useTranslation();

  return (
    <>
      <IonList>
        <IonListHeader>
          <IonLabel>{t("settings_apparence")}</IonLabel>
        </IonListHeader>
        <IonItem>
          <IonLabel>{t("settings_apparence_theme")}</IonLabel>
          <IonSelect
            value={theme}
            okText={t("prompt_ok")}
            cancelText={t("prompt_close")}
            onIonChange={(e) => setColorTheme(e.detail.value)}
            children={
              <>
                {supportedThemes.map(({ i18nKey, value }) => (
                  <Fragment
                    key={value}
                    children={
                      <IonSelectOption value={value} children={t(i18nKey)} />
                    }
                  />
                ))}
              </>
            }
          />
        </IonItem>
      </IonList>
    </>
  );
};

export default SettingsApparence;
