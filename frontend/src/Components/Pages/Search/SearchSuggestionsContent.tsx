import { IonButton, IonItem, IonLabel, IonList } from "@ionic/react";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { SearchContext } from "./Hooks/SearchContext";
import { Api } from "@ya-time-marker/lib";
import { SvgIcon } from "@material-ui/core";
import LaunchIcon from "@material-ui/icons/Launch";

export type SearchSuggestionsContentProps = {
  updateSeachText: (
    newSearchText: string,
    mode: "results" | "suggestions"
  ) => any;
};

const SearchSuggestionsContent: React.FC<SearchSuggestionsContentProps> = ({
  updateSeachText,
}) => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const { searchText } = useContext(SearchContext);

  async function fetchSuggestions() {
    setSuggestions([]);

    try {
      const suggestions = await Api.Trains.searchSuggestions(searchText);
      setSuggestions(suggestions);
    } catch (_) {}
  }

  useEffect(() => {
    fetchSuggestions();
  }, [searchText]);

  return (
    <Fragment>
      <div>
        {/* <div className="tw-py-4"> */}
        <IonList>
          {suggestions.map(({ suggestion }) => (
            <Fragment key={suggestion}>
              <IonItem
                onClick={() => updateSeachText(suggestion, "results")}
                button
              >
                <IonLabel>{suggestion}</IonLabel>
                {searchText.trim().toLowerCase() !== suggestion && (
                  <IonButton
                    fill="clear"
                    slot="end"
                    onClick={() => updateSeachText(suggestion, "suggestions")}
                  >
                    <SvgIcon component={LaunchIcon} />
                  </IonButton>
                )}
              </IonItem>
            </Fragment>
          ))}
        </IonList>

        {/* </div> */}
      </div>
    </Fragment>
  );
};

export default SearchSuggestionsContent;
