export const SEARCH_MODE_RESULTS = Symbol("results");
export const SEARCH_MODE_SUGGESTIONS = Symbol("suggestions");

export type ISymbolSearchModes =
  | typeof SEARCH_MODE_RESULTS
  | typeof SEARCH_MODE_SUGGESTIONS;

export type ITextSearchModes = "results" | "suggestions";
