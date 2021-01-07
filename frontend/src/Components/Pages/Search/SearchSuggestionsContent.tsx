import { IonButton, IonItem, IonLabel, IonList } from "@ionic/react";
import { SvgIcon } from "@material-ui/core";
import CallMadeIcon from "@material-ui/icons/CallMade";
import SearchIcon from "@material-ui/icons/Search";
import React, { Fragment, useContext } from "react";
import { SearchContext } from "./Hooks/SearchContext";

const SearchSuggestionsList: React.FC = () => {
  const { searchText, updateSearchText, searchSuggestions } = useContext(
    SearchContext
  );

  return (
    <IonList>
      {[
        ...(searchText.trim() ? [{ suggestion: searchText }] : []),
        ...searchSuggestions,
      ]
        .map((i) => ({ ...i, suggestion: i.suggestion.trim().toLowerCase() }))
        .filter(
          ({ suggestion }, index, arr) =>
            arr.findIndex((i) => i.suggestion === suggestion) === index
        )
        .map(({ suggestion }) => (
          <Fragment key={suggestion}>
            <IonItem
              button
              onClick={() => {
                updateSearchText(suggestion, "results");
              }}
              detail={false}
            >
              <IonButton
                slot="start"
                fill="clear"
                color="dark"
                children={<SvgIcon component={SearchIcon} />}
              />
              <IonLabel>{suggestion}</IonLabel>
              {searchText.trim().toLowerCase() !== suggestion && (
                <IonButton
                  slot="end"
                  fill="clear"
                  color="dark"
                  onClick={(e) => {
                    e.stopPropagation();
                    updateSearchText(suggestion, "suggestions");
                  }}
                >
                  <div className="tw-transform tw--rotate-90">
                    <SvgIcon component={CallMadeIcon} />
                  </div>
                </IonButton>
              )}
            </IonItem>
          </Fragment>
        ))}
    </IonList>
  );
};

const SearchSuggestionsContent: React.FC = () => {
  return (
    <Fragment>
      <div>
        <SearchSuggestionsList />
      </div>
    </Fragment>
  );
};

export default SearchSuggestionsContent;
