//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import {
  IonItem,
  IonLabel,
  IonList,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
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
import { useTranslation } from "react-i18next";
import "../../../../translations/i18n";

const OPTION_PAYLOAD_ONLY_TRAIN = ["title"];
const OPTION_PAYLOAD_ONLY_STEPS = ["steps"];
const OPTION_PAYLOAD_BOTH_TRAIN_STEPS = ["title", "steps"];

const isOptionSelected = (selectedOption: string[]) => (option: string[]) =>
  selectedOption.length === option.length &&
  option.every((i) => selectedOption.includes(i));

const SearchResultContent: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [hasFoundResults, setHasFoundResults] = useState(true);
  const {
    searchOptions,
    setSearchOptions,
    searchText,
    searchResults,
    isMode,
    isLoading,
  } = useContext(SearchContext);
  const [selectedSegment, setSelectedSegment] = useState<
    "title" | "steps" | "both" | null
  >(null);

  const SEGMENT_OPTIONS = [
    {
      value: "title",
      children: t("search_trains"),
      payload: OPTION_PAYLOAD_ONLY_TRAIN,
    },
    {
      value: "steps",
      children: t("search_steps"),
      payload: OPTION_PAYLOAD_ONLY_STEPS,
    },
    {
      value: "both",
      children: t("search_trains_and_steps"),
      payload: OPTION_PAYLOAD_BOTH_TRAIN_STEPS,
    },
  ];

  useEffect(() => {
    if (searchOptions.length === 0) {
      setSearchOptions(["title"]);
    }
  }, [searchOptions, setSearchOptions]);

  useEffect(() => {
    const target = SEGMENT_OPTIONS.find(({ payload }) =>
      isOptionSelected(searchOptions)(payload!),
    );
    if (target && target.value !== selectedSegment) {
      setSelectedSegment(target.value as any);
    }
  }, [SEGMENT_OPTIONS, searchOptions, selectedSegment]);

  const verifyHasFoundResults = useCallback(
    debounce(() => {
      setHasFoundResults(true);
      if (!isLoading && isMode("results")) {
        setHasFoundResults(searchResults.length > 0);
      }
    }, 750),
    [searchResults, isMode, isLoading],
  );

  useEffect(() => {
    setHasFoundResults(true);
    verifyHasFoundResults();
  }, [searchText, searchResults, isLoading, verifyHasFoundResults]);

  return (
    <Fragment>
      <div>
        <div
          style={{ height: "1px" }}
          className="tw-w-full tw-bg-black tw-bg-opacity-10"
        />
        <IonSegment
          scrollable
          value={selectedSegment}
          onIonChange={(e) => {
            const value = e.detail.value;
            const targetSegment = SEGMENT_OPTIONS.find(
              (i) => i.value === value,
            );
            if (targetSegment) {
              const { payload } = targetSegment;
              !isOptionSelected(searchOptions)(payload) &&
                setSearchOptions(targetSegment.payload);
            }
          }}
        >
          {SEGMENT_OPTIONS.map(({ value, children }) => (
            <Fragment key={value}>
              <IonSegmentButton value={value}>{children}</IonSegmentButton>
            </Fragment>
          ))}
        </IonSegment>

        <div>
          {!hasFoundResults && (
            <div className="tw-py-4">
              <div className="tw-px-4">
                <IonLabel>{t("search_no_results_found")}</IonLabel>
              </div>
            </div>
          )}

          {searchText && !isLoading && (
            <div>
              {searchResults.length > 0 && (
                <div className="tw-py-1">
                  <IonList className="tw-py-0">
                    {searchResults.map(({ title, id }, idx) => (
                      <Fragment key={idx}>
                        <IonItem
                          button
                          onClick={() => history.push(ROUTE_TRAIN_VIEW({ id }))}
                        >
                          <IonLabel>{title}</IonLabel>
                        </IonItem>
                      </Fragment>
                    ))}
                  </IonList>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default SearchResultContent;
