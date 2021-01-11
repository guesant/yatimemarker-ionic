//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { Api } from "@ya-time-marker/lib";
import debounce from "lodash.debounce";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { StateSetter } from "../../../../../types/StateSetter";
import { IChangeSeachMode, useSearchMode } from "./SearchMode";
import { ITextSearchModes } from "./searchModes/SEARCH_MODES";

export type ISearchContext = {
  isMode: (mode: ITextSearchModes) => boolean;
  isLoading: boolean;
  searchText: string;
  searchResults: any[];
  searchOptions: string[];
  searchSuggestions: any[];
  setSearchOptions: StateSetter<ISearchContext["searchOptions"]>;
  setAutoFetchResults: StateSetter<boolean>;
  updateSearchText: (newSearchText: string, mode: ITextSearchModes) => void;
  changeSearchMode: IChangeSeachMode;
};

export const SearchContext = createContext<ISearchContext>({} as any);

export const SearchContextProvider: React.FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { isMode, changeSearchMode } = useSearchMode();
  const [searchText, setSearchText] = useState("");
  const [searchOptions, setSearchOptions] = useState<string[]>([]);
  const [autoFetchResults, setAutoFetchResults] = useState(true);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchSuggestions, setSearchSuggestions] = useState<any[]>([]);

  const fetchSearchSuggestions = useCallback(
    debounce(async (searchQuery: string) => {
      setIsLoading(true);
      try {
        setSearchSuggestions(await Api.Trains.searchSuggestions(searchQuery));
      } catch (_) {
        setSearchSuggestions([]);
      }
      setIsLoading(false);
    }, 25),
    [],
  );

  const fetchSearchResults = useCallback(
    debounce(
      async (searchQuery: string, searchOptionsRef: typeof searchOptions) => {
        setIsLoading(true);
        setSearchResults([]);
        try {
          if (searchQuery.trim()) {
            setSearchResults(
              await Api.Trains.searchTrains(searchQuery, {
                searchFields:
                  searchOptionsRef.length > 0
                    ? (searchOptionsRef as any[])
                    : ["title", "steps"],
              }),
            );
          }
        } catch (_) {}
        setIsLoading(false);
      },
      250,
    ),
    [],
  );

  useEffect(() => {
    if (isMode("suggestions") && autoFetchResults) {
      setIsLoading(true);
      fetchSearchSuggestions(searchText);
    }
  }, [isMode, fetchSearchSuggestions, searchText, autoFetchResults]);

  useEffect(() => {
    if (isMode("results") && autoFetchResults) {
      setIsLoading(true);
      fetchSearchResults(searchText, searchOptions);
    }
  }, [isMode, fetchSearchResults, searchText, searchOptions, autoFetchResults]);

  const updateSearchText = (newSearchText: string, mode: ITextSearchModes) => {
    if (newSearchText !== searchText) {
      setSearchText(newSearchText);
    }
    changeSearchMode(mode);
  };

  return (
    <SearchContext.Provider
      value={{
        isMode,
        isLoading,
        searchText,
        searchOptions,
        searchResults,
        searchSuggestions,
        changeSearchMode,
        setSearchOptions,
        setAutoFetchResults,
        updateSearchText,
      }}
      children={children}
    />
  );
};
