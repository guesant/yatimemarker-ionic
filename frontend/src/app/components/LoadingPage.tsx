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
import { useTranslation } from "react-i18next";
import "../../translations/i18n";

const LoadingPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <IonPage>
      <IonHeader className="tw-sr-only">
        <IonToolbar>
          <IonTitle>{t("loading")}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="tw-px-4 tw-py-4">
          <p>{t("loading")}</p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoadingPage;
