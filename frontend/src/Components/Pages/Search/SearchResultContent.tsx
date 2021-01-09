//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { IonItem, IonLabel, IonList } from "@ionic/react";
import debounce from "lodash.debounce";
import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useHistory } from "react-router";
import { ROUTE_TRAIN_VIEW } from "../../Routes";
import { SearchContext } from "./Hooks/SearchContext";

const SearchResultContent: React.FC = () => {
  const history = useHistory();
  const [noResultsFound, setNoResultsFound] = useState(false);
  const { searchText, searchResults, isMode, isLoading } = useContext(
    SearchContext,
  );

  const verifyHasResults = useCallback(
    debounce(() => {
      setNoResultsFound(
        Boolean(isMode("results") && !isLoading && searchResults.length === 0),
      );
    }),
    [searchResults, isMode, isLoading],
  );

  useEffect(() => {
    setNoResultsFound(false);
    verifyHasResults();
  }, [searchText, searchResults, isLoading, verifyHasResults]);

  return (
    <Fragment>
      <div>
        <div
          style={{ height: "1px" }}
          className="tw-w-full tw-bg-black tw-bg-opacity-10"
        />

        <div>
          {!searchText && !isLoading && (
            <div className="tw-py-4">
              <div className="tw-px-4">
                <IonLabel>Insira um termo de busca.</IonLabel>
              </div>
            </div>
          )}

          {searchText && (
            <div>
              {noResultsFound && (
                <div className="tw-py-4">
                  <div className="tw-px-4">
                    <IonLabel>Nenhum resultado encontrado.</IonLabel>
                  </div>
                </div>
              )}
              {!isLoading && (
                <>
                  {searchResults.length > 0 && (
                    <div className="tw-py-1">
                      <IonList className="tw-py-0">
                        {searchResults.map(({ title, id }, idx) => (
                          <Fragment key={idx}>
                            <IonItem
                              button
                              onClick={() => {
                                history.push(ROUTE_TRAIN_VIEW({ id }));
                              }}
                            >
                              <IonLabel>{title}</IonLabel>
                            </IonItem>
                          </Fragment>
                        ))}
                      </IonList>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default SearchResultContent;
