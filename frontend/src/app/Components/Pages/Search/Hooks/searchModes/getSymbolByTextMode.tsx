//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import {
  ITextSearchModes,
  SEARCH_MODE_RESULTS,
  SEARCH_MODE_SUGGESTIONS,
} from "./SEARCH_MODES";

export const getSymbolByTextMode = (mode: ITextSearchModes) =>
  (({ results: SEARCH_MODE_RESULTS, suggestions: SEARCH_MODE_SUGGESTIONS }[
    mode
  ] as any) || null);
