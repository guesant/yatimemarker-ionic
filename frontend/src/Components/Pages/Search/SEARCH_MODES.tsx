import { ITextSearchModes } from "./ITextSearchModes";

export const SEARCH_MODE_RESULTS = Symbol("results");
export const SEARCH_MODE_SUGGESTIONS = Symbol("suggestions");

export type SymbolSearchModes =
  | typeof SEARCH_MODE_RESULTS
  | typeof SEARCH_MODE_SUGGESTIONS;

export const getSearchMode = (
  mode: ITextSearchModes
): SymbolSearchModes | null =>
  (({
    results: SEARCH_MODE_RESULTS,
    suggestions: SEARCH_MODE_SUGGESTIONS,
  }[mode] || null) as any);
