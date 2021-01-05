import { IonContent, IonHeader, IonPage } from "@ionic/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { SearchContext, SearchContextProvider } from "./Hooks/SearchContext";
import SearchHeader from "./SearchHeader";
import SearchResultContent from "./SearchResultContent";
import SearchSuggestionsContent from "./SearchSuggestionsContent";

const SEARCH_MODE_RESULTS = Symbol("results");
const SEARCH_MODE_SUGGESTIONS = Symbol("suggestions");

type TextSearchModes = "results" | "suggestions";
type SymbolSearchModes =
  | typeof SEARCH_MODE_RESULTS
  | typeof SEARCH_MODE_SUGGESTIONS;

const getSearchMode = (mode: TextSearchModes): SymbolSearchModes | null =>
  (({
    results: SEARCH_MODE_RESULTS,
    suggestions: SEARCH_MODE_SUGGESTIONS,
  }[mode] || null) as any);

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

  function changeSearchMode(mode: TextSearchModes) {
    getSearchMode(mode) && setSearchMode(getSearchMode(mode)!);
  }

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
            updateSeachText={(newSearchText, mode) => {
              changeSearchMode(mode);
              setSearchText(newSearchText);
            }}
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
