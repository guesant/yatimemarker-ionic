//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { IComparedSuggestion } from "../types/IComparedSuggestion";

export const minifyComparedSuggestions = (
  suggestions: IComparedSuggestion[],
) => {
  const minified: IComparedSuggestion[] = [];
  suggestions.forEach((suggestion) => {
    if (minified.length > 0) {
      const prevItem = minified[minified.length - 1];
      if (
        prevItem.highlight === suggestion.highlight ||
        !suggestion.text.trim()
      ) {
        prevItem.text = [prevItem.text, suggestion.text].join("");
        return;
      }
    }
    minified.push(suggestion);
  });
  return minified;
};
