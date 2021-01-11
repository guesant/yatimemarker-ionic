//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { ISuggestion } from "@ya-time-marker/lib/build/types/ISuggestionResult";
import { ISuggestionCompared } from "./ISuggestionCompared";
import { clearSuggestionText } from "./clearSuggestionText";
import { clearSuggestion } from "./clearSuggestion";
import { filterSuggestions } from "./filterSuggestions";
import { equalsToSearchText } from "./equalsToSearchText";

export const addSearchTextToSuggestions = (searchText: string) => (
  suggestions: ISuggestion[],
): ISuggestionCompared[] => {
  return ([
    ...(clearSuggestionText(searchText)
      ? [
          {
            suggestion: searchText,
            terms: searchText.trim().split(" "),
            score: NaN,
            isEqualsToTheSearchText: true,
          },
        ]
      : []),
    ...suggestions.map((sug) => ({ ...sug, isEqualsToTheSearchText: false })),
  ] as ISuggestionCompared[])
    .map(clearSuggestion)
    .filter(filterSuggestions)
    .map(equalsToSearchText(searchText));
};
