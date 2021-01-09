//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { getSymbolByTextMode } from "./getSymbolByTextMode";
import { ISymbolSearchModes, ITextSearchModes } from "./SEARCH_MODES";

export const isMode = (symbol: ISymbolSearchModes, mode: ITextSearchModes) =>
  getSymbolByTextMode(mode) === symbol;
