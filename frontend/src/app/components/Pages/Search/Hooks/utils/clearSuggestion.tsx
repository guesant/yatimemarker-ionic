//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { ISuggestionCompared } from "./ISuggestionCompared";
import { clearSuggestionText } from "./clearSuggestionText";

export const clearSuggestion = ({ suggestion, ...i }: ISuggestionCompared) => ({
  ...i,
  suggestion: clearSuggestionText(suggestion).toLowerCase(),
});
