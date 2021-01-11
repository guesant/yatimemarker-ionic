//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import {
  IonButton,
  IonButtons,
  IonIcon,
  IonInput,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import React, { Fragment, useContext, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import { SearchContext } from "./Hooks/SearchContext";

const SearchHeader: React.FC = () => {
  const history = useHistory();
  const { isMode, searchText, updateSearchText } = useContext(SearchContext);
  const searchInputRef = useRef<HTMLIonInputElement>(null);

  useIonViewDidEnter(() => {
    (async () => {
      if (searchInputRef.current && !searchText.trim().length) {
        await searchInputRef.current.setFocus();
      }
    })();
  }, [searchInputRef]);

  useEffect(() => {
    (async () => {
      if (searchInputRef.current) {
        const ionInputElement = searchInputRef.current;
        if (isMode("suggestions")) {
          const htmlInputElement = await ionInputElement.getInputElement();
          if (window.document.activeElement !== htmlInputElement) {
            await ionInputElement.setFocus();
          }
        }
      }
    })();
  }, [isMode, searchText]);

  return (
    <Fragment>
      <IonToolbar>
        <div className="tw-sr-only">
          <IonTitle>Busca</IonTitle>
        </div>
        <IonButtons slot="start">
          <IonButton
            onClick={() => history.goBack()}
            children={<IonIcon icon={arrowBack} />}
          />
        </IonButtons>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            updateSearchText(searchText, "results");
          }}
        >
          <IonInput
            value={searchText}
            ref={searchInputRef}
            placeholder="Buscar..."
            onFocus={() => {
              updateSearchText(searchText, "suggestions");
            }}
            onIonChange={(e) => {
              const newSearchText = e.detail.value!;
              if (searchText !== newSearchText) {
                updateSearchText(newSearchText, "suggestions");
              }
            }}
          />
        </form>
      </IonToolbar>
    </Fragment>
  );
};

export default SearchHeader;
