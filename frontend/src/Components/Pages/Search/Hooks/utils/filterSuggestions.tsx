import { ISuggestionCompared } from "./ISuggestionCompared";

export const filterSuggestions = (
  { suggestion }: ISuggestionCompared,
  index: number,
  arr: ISuggestionCompared[],
) => arr.findIndex((i) => i.suggestion === suggestion) === index;
