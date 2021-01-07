import { IonItem, IonLabel, IonList } from "@ionic/react";
import React, { Fragment, useContext } from "react";
import { useHistory } from "react-router";
import { ROUTE_TRAIN_VIEW } from "../../Routes";
import { SearchContext } from "./Hooks/SearchContext";

export type SearchResultContentProps = {};

const SearchResultContent: React.FC<SearchResultContentProps> = () => {
  const history = useHistory();

  const { searchText, searchResults, isLoading } = useContext(SearchContext);

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
                  {!searchResults.length && (
                    <div className="tw-py-4">
                      <div className="tw-px-4">
                        <IonLabel>Nenhum resultado encontrado.</IonLabel>
                      </div>
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
