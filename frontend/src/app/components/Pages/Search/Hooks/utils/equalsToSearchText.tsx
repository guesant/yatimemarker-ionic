//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { ISuggestionCompared } from "./ISuggestionCompared";
import { clearSuggestionText } from "./clearSuggestionText";

export const equalsToSearchText = (searchText: string) => (
  sug: ISuggestionCompared,
  idx: number,
) => ({
  ...sug,
  isEqualsToTheSearchText:
    idx === 0 &&
    clearSuggestionText(searchText).toLowerCase() === sug.suggestion,
});
