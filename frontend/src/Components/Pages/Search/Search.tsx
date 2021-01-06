import { IonContent, IonHeader, IonPage } from "@ionic/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { SearchContext, SearchContextProvider } from "./Hooks/SearchContext";
import { ITextSearchModes } from "./ITextSearchModes";
import SearchHeader from "./SearchHeader";
import SearchResultContent from "./SearchResultContent";
import SearchSuggestionsContent from "./SearchSuggestionsContent";
import {
  SymbolSearchModes,
  SEARCH_MODE_RESULTS,
  SEARCH_MODE_SUGGESTIONS,
  getSearchMode,
} from "./SEARCH_MODES";

const SearchPage: React.FC = () => {
  const searchInputRef = useRef<HTMLIonInputElement>(null);
  const formInputRef = useRef<HTMLFormElement>(null);
  const [searchMode, setSearchMode] = useState<SymbolSearchModes>(
    SEARCH_MODE_SUGGESTIONS
  );

  const {
    searchText,
    setSearchText,
    setAutoFetchResults: setAutoFetch,
  } = useContext(SearchContext);

  const changeSearchMode = (mode: ITextSearchModes) => {
    const newSearchMode = getSearchMode(mode);
    if (newSearchMode && newSearchMode !== searchMode) {
      setSearchMode(newSearchMode);
    }
  };

  useEffect(() => {
    switch (searchMode) {
      case SEARCH_MODE_RESULTS:
        setAutoFetch(true);
        break;
      case SEARCH_MODE_SUGGESTIONS:
        setAutoFetch(false);
        break;
    }
  }, [searchMode, setAutoFetch]);

  useEffect(() => {
    if (searchMode !== SEARCH_MODE_SUGGESTIONS) {
      changeSearchMode("suggestions");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  useEffect(() => {
    if (searchInputRef.current && formInputRef.current) {
      const searchInput = searchInputRef.current;
      const formInput = formInputRef.current;

      const handleInputFocus = () => {
        changeSearchMode("suggestions");
      };

      const handleFormSubmit = (event: Event) => {
        event.preventDefault();
        changeSearchMode("results");
      };

      searchInput.addEventListener("focus", handleInputFocus);
      formInput.addEventListener("submit", handleFormSubmit);

      return () => {
        searchInput.removeEventListener("focus", handleInputFocus);
        formInput.removeEventListener("submit", handleFormSubmit);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInputRef, formInputRef]);

  return (
    <>
      <IonHeader>
        <SearchHeader
          formInputRef={formInputRef}
          searchInputRef={searchInputRef}
        />
      </IonHeader>
      <IonContent>
        {searchMode === SEARCH_MODE_RESULTS && <SearchResultContent />}
        {searchMode === SEARCH_MODE_SUGGESTIONS && (
          <SearchSuggestionsContent
            changeSearchMode={changeSearchMode}
            setSearchText={setSearchText}
          />
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
