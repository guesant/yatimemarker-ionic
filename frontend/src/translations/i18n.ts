//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { TRANSLATIONS_EN } from "./en/translations";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: TRANSLATIONS_EN,
      },
    },
  });

i18n.on("languageChanged", (lang) => {
  localStorage.setItem("i18nextLng", lang);
});

function loadLocalLanguage() {
  const localLanguage = localStorage.getItem("i18nextLng") || "en";
  i18n.changeLanguage(localLanguage);
}

loadLocalLanguage();
