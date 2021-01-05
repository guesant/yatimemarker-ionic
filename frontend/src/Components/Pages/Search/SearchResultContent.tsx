import { IonItem, IonLabel, IonList } from "@ionic/react";
import React, { Fragment, useContext } from "react";
import { useHistory } from "react-router";
import { ROUTE_TRAIN_VIEW } from "../../Routes";
import { SearchContext } from "./Hooks/SearchContext";
import { SearchChip } from "./SearchChip";

export type SearchResultContentProps = {};

const SearchResultContent: React.FC<SearchResultContentProps> = () => {
  const history = useHistory();

  const {
    searchText,
    searchResults,
    searchOptions,
    setSearchOptions,
    isLoading,
  } = useContext(SearchContext);

  function removeSearchOption(option: string) {
    setSearchOptions(searchOptions.filter((i) => i !== option));
  }

  function addSearchOption(option: string) {
    setSearchOptions(Array.from(new Set([...searchOptions, option])));
  }

  return (
    <Fragment>
      <div>
        <div className="tw-py-2">
          <div className="tw-px-4">
            <div>
              {[
                { chipText: "Treinos", optionKey: "title" },
                { chipText: "Passos", optionKey: "steps" },
              ].map(({ chipText, optionKey }) => (
                <Fragment key={optionKey}>
                  <SearchChip
                    chipText={chipText}
                    onSelect={() => addSearchOption(optionKey)}
                    onDeselect={() => removeSearchOption(optionKey)}
                    isSelected={searchOptions.includes(optionKey)}
                  />
                </Fragment>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{ height: "1px" }}
          className="tw-w-full tw-bg-black tw-bg-opacity-10"
        />

        <div className="tw-py-4">
          {!searchText && (
            <div>
              <div className="tw-px-4">
                <IonLabel>Insira um termo de busca.</IonLabel>
              </div>
            </div>
          )}

          {searchText && (
            <div>
              <div className="tw-pl-4">
                <div className="tw-flex tw-justify-between tw-place-items-center tw-flex-wrap tw-gap-2">
                  <h1 className="heading-5 tw-font-bold">Treinos</h1>
                  <button className="tw-flex tw-text-black tw-text-opacity-50 tw-place-items-center tw-py-2 tw-px-3 tw-mr-1">
                    <span className="tw-text-xs tw-font-semibold tw-whitespace-pre tw-uppercase">
                      Ver todos os treinos
                    </span>
                  </button>
                </div>
              </div>
              <div className="tw-h-1"></div>
              {isLoading && (
                <div>
                  <div className="tw-pl-4">
                    <IonLabel>Buscando por "{searchText}"...</IonLabel>
                  </div>
                </div>
              )}
              {!isLoading && (
                <section>
                  {!searchResults.length && (
                    <div className="tw-px-4">
                      <IonLabel>Nenhum resultado encontrado.</IonLabel>
                    </div>
                  )}
                  {searchResults.length > 0 && (
                    <IonList>
                      {searchResults.map(({ title, id }, idx) => (
                        <Fragment key={idx}>
                          <IonItem
                            button
                            onClick={() => {
                              history.push(ROUTE_TRAIN_VIEW({ id }));
                            }}
                          >
                            <IonLabel>
                              <h2>{title}</h2>
                            </IonLabel>
                          </IonItem>
                        </Fragment>
                      ))}
                    </IonList>
                  )}
                </section>
              )}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default SearchResultContent;
