//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import "../../../../translations/i18n";
import SettingsAbout from "./SettingsAbout";
import SettingsAboutOrigin from "./SettingsAboutOrigin";
import SettingsApparence from "./SettingsApparence";
import SettingsDuration from "./SettingsDuration";
import SettingsGeneral from "./SettingsGeneral";

const Settings: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => history.go(-1)}>
              <IonIcon icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>{t("settings_header")}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div>
          <SettingsApparence />
        </div>
        <div>
          <SettingsGeneral />
        </div>
        <div>
          <SettingsDuration />
        </div>
        <div>
          <SettingsAbout />
        </div>
        <div>
          <SettingsAboutOrigin />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
