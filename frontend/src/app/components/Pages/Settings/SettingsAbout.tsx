//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { IonItem, IonLabel, IonList, IonListHeader } from "@ionic/react";
import React from "react";
import { useTranslation } from "react-i18next";
import "../../../../translations/i18n";
import {
  AUTHOR,
  SOURCE_CODE,
  SOURCE_CODE_LICENSE,
} from "../../../constants/ABOUT_PROJECT";

const SettingsAbout = () => {
  const { t } = useTranslation();
  return (
    <>
      <IonList>
        <IonListHeader>
          <IonLabel>{t("settings_about")}</IonLabel>
        </IonListHeader>
        <IonItem button>
          <IonLabel>
            <h2>{t("settings_about_author")}</h2>
            <p>{AUTHOR.text}</p>
          </IonLabel>
        </IonItem>
        <IonItem
          button
          target="_blank"
          rel="noopener noreferrer"
          href={SOURCE_CODE.homepage}
        >
          <IonLabel>
            <h2>{t("settings_about_sourceCode")}</h2>
            <p>{SOURCE_CODE.homepage}</p>
          </IonLabel>
        </IonItem>
        <IonItem
          button
          target="_blank"
          rel="noopener noreferrer"
          href={SOURCE_CODE_LICENSE.homepage}
        >
          <IonLabel>
            <h2>{t("settings_about_license")}</h2>
            <p>{SOURCE_CODE_LICENSE.text}</p>
          </IonLabel>
        </IonItem>
      </IonList>
    </>
  );
};

export default SettingsAbout;
