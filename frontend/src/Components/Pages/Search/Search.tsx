//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { IonContent, IonHeader, IonPage } from "@ionic/react";
import React, { Fragment, useContext } from "react";
import { SearchContext, SearchContextProvider } from "./Hooks/SearchContext";
import { ITextSearchModes } from "./Hooks/searchModes/SEARCH_MODES";
import SearchHeader from "./SearchHeader";
import SearchResultContent from "./SearchResultContent";
import SearchSuggestionsContent from "./SearchSuggestionsContent";

const SearchPage: React.FC = () => {
  const { isMode } = useContext(SearchContext);

  return (
    <>
      <IonHeader>
        <SearchHeader />
      </IonHeader>
      <IonContent>
        {([
          { mode: "results", component: <SearchResultContent /> },
          { mode: "suggestions", component: <SearchSuggestionsContent /> },
        ] as { mode: ITextSearchModes; component: any }[]).map(
          ({ mode, component }) => (
            <Fragment
              key={mode}
              children={
                <div
                  className={!isMode(mode) ? "tw-hidden" : ""}
                  children={<>{component}</>}
                />
              }
            />
          )
        )}
      </IonContent>
    </>
  );
};

const Search: React.FC = () => {
  return (
    <SearchContextProvider>
      <IonPage>
        <SearchPage />
      </IonPage>
    </SearchContextProvider>
  );
};

export default Search;
