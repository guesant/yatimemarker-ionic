//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import "../../../../translations/i18n";
import { useTranslation } from "react-i18next";

const Profile: React.FC = () => {
  const { t } = useTranslation();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t("my_profile_header")}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="tw-py-4">
          <div className="tw-px-4">
            <p>Conteúdo</p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
