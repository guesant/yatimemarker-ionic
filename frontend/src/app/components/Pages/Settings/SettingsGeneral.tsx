//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import {
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonSelect,
  IonSelectOption,
  IonToast,
} from "@ionic/react";
import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "../../../../translations/i18n";
import { supportedLanguages } from "../../../../translations/supportedLanguages";

const getData = (i18n: any, lang: string) => (key: string) => {
  return (i18n.getDataByLanguage(lang)?.translation || {})[key] ?? "";
};

const SettingsGeneral = () => {
  const [language, setLanguage] = useState("");
  const { t, i18n } = useTranslation();
  const [showToastUndoLanguage, setToastUndoLanguage] = useState(false);

  const [previousLanguage, setPreviousLanguage] = useState<string | null>(null);

  useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);

  useEffect(() => {
    (() => {
      i18n.changeLanguage(language);
    })();
  }, [i18n, language]);

  function changeLanguage(newLanguage: string) {
    if (newLanguage !== language) {
      if (previousLanguage === null) {
        setPreviousLanguage(language);
      }
      setToastUndoLanguage(true);
    }
    setLanguage(newLanguage);
  }

  function undoToTheLastLanguage() {
    if (previousLanguage) {
      changeLanguage(previousLanguage);
      setPreviousLanguage(null);
    }
  }
  return (
    <>
      <>
        {previousLanguage !== null &&
          (() => {
            const plData = getData(i18n, previousLanguage);
            const isToastOpen =
              showToastUndoLanguage &&
              [language, null].every((i) => previousLanguage !== i);
            return (
              <>
                {isToastOpen && (
                  <IonToast
                    isOpen={isToastOpen}
                    onDidDismiss={() => setToastUndoLanguage(false)}
                    message={plData(
                      "settings_general_language_changed_successfully",
                    )}
                    position="bottom"
                    duration={15000}
                    buttons={[
                      {
                        text: plData("settings_general_language_undo"),
                        handler: () => undoToTheLastLanguage(),
                      },
                      {
                        text: plData("settings_general_language_done"),
                        handler: () => setToastUndoLanguage(false),
                      },
                    ]}
                  />
                )}
              </>
            );
          })()}
      </>
      <IonList>
        <IonListHeader>
          <IonLabel>{t("settings_general")}</IonLabel>
        </IonListHeader>
        <IonItem>
          <IonLabel>{t("settings_general_language")}</IonLabel>
          <IonSelect
            value={language}
            okText={t("prompt_ok")}
            cancelText={t("prompt_close")}
            onIonChange={async (e) => {
              const newLanguage = e.detail.value;
              changeLanguage(newLanguage);
            }}
            children={
              <>
                {supportedLanguages.map(({ value, label }) => (
                  <Fragment
                    key={value}
                    children={
                      <IonSelectOption value={value} children={label} />
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

export default SettingsGeneral;
