import { Api } from "@ya-time-marker/lib";
import debounce from "lodash.debounce";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { StateSetter } from "../../../../types/StateSetter";

const {
  Trains: { searchTrains },
} = Api;

export const SearchContext = createContext<ISearchContext>({} as any);

export type ISearchContext = {
  isLoading: boolean;
  searchText: string;
  searchResults: any[];
  searchOptions: string[];
  autoFetchResults: boolean;
  setSearchText: StateSetter<ISearchContext["searchText"]>;
  setSearchOptions: StateSetter<ISearchContext["searchOptions"]>;
  setAutoFetchResults: StateSetter<ISearchContext["autoFetchResults"]>;
};

export const SearchContextProvider: React.FC = ({ children }) => {
  const [autoFetchResults, setAutoFetchResults] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchOptions, setSearchOptions] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");

  const fetchSearch = useCallback(
    debounce(
      async (searchQuery: string, searchOptionsRef: typeof searchOptions) => {
        setSearchResults([]);
        setIsLoading(true);
        try {
          if (searchQuery.trim()) {
            setSearchResults(
              await searchTrains(searchQuery, {
                searchFields:
                  searchOptionsRef.length > 0
                    ? (searchOptionsRef as any[])
                    : ["title", "steps"],
              })
            );
          }
        } catch (_) {}
        setIsLoading(false);
      },
      250
    ),
    []
  );

  useEffect(() => {
    if (autoFetchResults) {
      setIsLoading(true);
      fetchSearch(searchText, searchOptions);
    }
  }, [fetchSearch, searchText, searchOptions, autoFetchResults]);

  return (
    <SearchContext.Provider
      value={{
        autoFetchResults: autoFetchResults,
        setAutoFetchResults: setAutoFetchResults,
        isLoading,
        searchText,
        searchOptions,
        setSearchOptions,
        searchResults,
        setSearchText,
      }}
      children={children}
    />
  );
};
