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
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import produce from "immer";
import { arrowBack } from "ionicons/icons";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { setSettings } from "../../../../Store/settings/actions/setSettings";
import { getSettings } from "../../../../Store/settings/selectors/getSettings";
import "../../../../translations/i18n";

const sourceCodeURL = "https://github.com/guesant/ya-time-marker-ionic";
const licenseURL =
  "https://github.com/guesant/ya-time-marker-ionic/blob/dev/LICENSE.mit.txt";
const licenseID = "MIT";

const supportedThemes = [
  {
    value: "_auto",
    i18nKey: "auto",
  },
  ...["light", "dark"].map((i) => ({ value: i, i18nKey: i })),
].map(({ i18nKey, ...i }) => ({
  ...i,
  i18nKey: ["settings_apparence_theme", i18nKey].join("_"),
}));

const supportedLanguages = [
  {
    value: "en",
    label: "English",
  },
  {
    value: "pt_BR",
    label: "Português (Brasil)",
  },
] as {
  value: string;
  label: string | undefined;
}[];

const useAppTheme = () => {
  const settings = useSelector(getSettings);
  const { theme } = settings;
  const dispatch = useDispatch();

  const setColorTheme = useCallback(
    (theme: string) => {
      dispatch(
        setSettings(
          produce(settings, (draft: any) => {
            draft.theme = theme;
          }),
        ),
      );
    },
    [dispatch, settings],
  );

  return [theme, setColorTheme] as [typeof theme, typeof setColorTheme];
};

const getData = (i18n: any, lang: string) => (key: string) => {
  return (i18n.getDataByLanguage(lang)?.translation || {})[key] ?? "";
};

const Settings: React.FC = () => {
  const history = useHistory();
  const [language, setLanguage] = useState("");
  const { t, i18n } = useTranslation();
  const [theme, setColorTheme] = useAppTheme();
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
        <>
          {previousLanguage !== null &&
            (() => {
              const plData = getData(i18n, previousLanguage);
              const isToastOpen =
                showToastUndoLanguage &&
                previousLanguage !== language &&
                previousLanguage !== null;

              return (
                <>
                  {isToastOpen && (
                    <IonToast
                      isOpen={isToastOpen}
                      onDidDismiss={() => setToastUndoLanguage(false)}
                      message={plData("language_changed_successfully")}
                      position="bottom"
                      duration={25000}
                      buttons={[
                        {
                          text: plData("language_undo"),
                          handler: () => undoToTheLastLanguage(),
                        },
                      ]}
                    />
                  )}
                </>
              );
            })()}
        </>
        <div>
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
                          <IonSelectOption
                            value={value}
                            children={t(i18nKey)}
                          />
                        }
                      />
                    ))}
                  </>
                }
              />
            </IonItem>
          </IonList>
        </div>
        <div>
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
        </div>
        <div>
          <IonList>
            <IonListHeader>
              <IonLabel>{t("settings_about")}</IonLabel>
            </IonListHeader>
            <IonItem button>
              <IonLabel>
                <h2>{t("settings_about_author")}</h2>
                <p>Gabriel Rodrigues</p>
              </IonLabel>
            </IonItem>
            <a href={sourceCodeURL} target="_blank" rel="noopener noreferrer">
              <IonItem button>
                <IonLabel>
                  <h2>{t("settings_about_sourceCode")}</h2>
                  <p>{sourceCodeURL}</p>
                </IonLabel>
              </IonItem>
            </a>
            <a href={licenseURL} target="_blank" rel="noopener noreferrer">
              <IonItem button>
                <IonLabel>
                  <h2>{t("settings_about_license")}</h2>
                  <p>{licenseID}</p>
                </IonLabel>
              </IonItem>
            </a>
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
