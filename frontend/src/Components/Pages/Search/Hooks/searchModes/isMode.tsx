import { getSymbolByTextMode } from "./getSymbolByTextMode";
import { ISymbolSearchModes, ITextSearchModes } from "./SEARCH_MODES";

export const isMode = (symbol: ISymbolSearchModes, mode: ITextSearchModes) =>
  getSymbolByTextMode(mode) === symbol;
