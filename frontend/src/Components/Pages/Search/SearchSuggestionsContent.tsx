//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { IonButton, IonItem, IonLabel, IonList } from "@ionic/react";
import { SvgIcon } from "@material-ui/core";
import CallMadeIcon from "@material-ui/icons/CallMade";
import SearchIcon from "@material-ui/icons/Search";
import { compareTextWithSearchSuggestion } from "@ya-time-marker/lib/build/utils/compareSearchSuggestionWithText";
import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { SearchContext } from "./Hooks/SearchContext";
import { ISuggestionCompared } from "./Hooks/utils/ISuggestionCompared";
import { addSearchTextToSuggestions } from "./Hooks/utils/addSearchTextToSuggestions";

const SearchSuggestionsList: React.FC = () => {
  const [suggestionsList, setSuggestionsList] = useState<ISuggestionCompared[]>(
    [],
  );
  const { searchText, updateSearchText, searchSuggestions } = useContext(
    SearchContext,
  );
  useEffect(() => {
    setSuggestionsList(
      addSearchTextToSuggestions(searchText)(searchSuggestions),
    );
  }, [searchSuggestions, searchText]);

  const compareSuggestion = useCallback(
    (searchResult: ISuggestionCompared) =>
      compareTextWithSearchSuggestion(searchText.trim())(searchResult),
    [searchText],
  );

  return (
    <IonList>
      {suggestionsList.map((searchResult, idx) => {
        const { isEqualsToTheSearchText } = searchResult;
        const comparedSuggestion = compareSuggestion(searchResult);
        const suggestionText = comparedSuggestion.map((i) => i.text).join("");
        return (
          <Fragment
            key={isEqualsToTheSearchText ? 0 : [idx, suggestionText].join("-")}
          >
            <IonItem
              button
              onClick={() => updateSearchText(suggestionText, "results")}
              detail={false}
            >
              <IonButton
                slot="start"
                fill="clear"
                color="dark"
                children={<SvgIcon component={SearchIcon} />}
              />
              <IonLabel>
                {comparedSuggestion.map(({ text, highlight }, idx) => (
                  <Fragment key={idx}>
                    <span
                      className={
                        highlight === "match"
                          ? "tw-font-bold"
                          : highlight === "alternative"
                          ? "tw-italic"
                          : ""
                      }
                      children={text}
                    />
                  </Fragment>
                ))}
              </IonLabel>
              {!isEqualsToTheSearchText && (
                <IonButton
                  slot="end"
                  fill="clear"
                  color="dark"
                  onClick={(e) => {
                    e.stopPropagation();
                    updateSearchText(suggestionText, "suggestions");
                  }}
                >
                  <div
                    className="tw-transform tw--rotate-90"
                    children={<SvgIcon component={CallMadeIcon} />}
                  />
                </IonButton>
              )}
            </IonItem>
          </Fragment>
        );
      })}
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
