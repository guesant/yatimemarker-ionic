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
