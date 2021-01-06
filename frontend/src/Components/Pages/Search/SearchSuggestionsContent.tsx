import { IonButton, IonItem, IonLabel, IonList } from "@ionic/react";
import { SvgIcon } from "@material-ui/core";
import CallMadeIcon from "@material-ui/icons/CallMade";
import SearchIcon from "@material-ui/icons/Search";
import { Api } from "@ya-time-marker/lib";
import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { SearchContext } from "./Hooks/SearchContext";
import { ITextSearchModes } from "./ITextSearchModes";

export type SearchSuggestionsContentProps = {
  changeSearchMode: (mode: ITextSearchModes) => void;
  setSearchText: (value: React.SetStateAction<string>) => void;
};

export type SearchSuggestionsListProps = {
  searchText: string;
  suggestions: { suggestion: string }[];
  updateSeachText: (text: string, mode: ITextSearchModes) => void;
};

const SearchSuggestionsList: React.FC<SearchSuggestionsListProps> = React.memo(
  ({ searchText, suggestions, updateSeachText }) => {
    return (
      <IonList>
        {[
          ...(searchText.trim() ? [{ suggestion: searchText.trim() }] : []),
          ...suggestions,
        ]
          .filter(
            ({ suggestion }, index, arr) =>
              arr.findIndex((i) => i.suggestion === suggestion) === index
          )
          .map(({ suggestion }) => (
            <Fragment key={suggestion}>
              <IonItem className="tw-flex" button detail={false}>
                <div
                  className="tw-flex-1 tw-flex tw-items-center"
                  onClick={() => updateSeachText(suggestion, "results")}
                >
                  <IonButton
                    fill="clear"
                    color="dark"
                    children={<SvgIcon component={SearchIcon} />}
                  />
                  <IonLabel>{suggestion}</IonLabel>
                </div>

                {searchText.trim().toLowerCase() !== suggestion && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updateSeachText(suggestion, "suggestions");
                    }}
                  >
                    <div className="tw-transform tw--rotate-90">
                      <SvgIcon component={CallMadeIcon} />
                    </div>
                  </button>
                )}
              </IonItem>
            </Fragment>
          ))}
      </IonList>
    );
  }
);

const SearchSuggestionsContent: React.FC<SearchSuggestionsContentProps> = ({
  changeSearchMode,
  setSearchText,
}) => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const { searchText } = useContext(SearchContext);

  const fetchSuggestions = useCallback(async () => {
    try {
      const suggestions = await Api.Trains.searchSuggestions(searchText);
      setSuggestions(suggestions);
    } catch (_) {
      setSuggestions([]);
    }
  }, [searchText]);

  useEffect(() => {
    fetchSuggestions();
  }, [searchText, fetchSuggestions]);

  return (
    <Fragment>
      <div>
        <SearchSuggestionsList
          updateSeachText={(text, mode) => {
            changeSearchMode(mode);
            setSearchText(text);
          }}
          suggestions={suggestions}
          searchText={searchText}
        />
      </div>
    </Fragment>
  );
};

export default SearchSuggestionsContent;
