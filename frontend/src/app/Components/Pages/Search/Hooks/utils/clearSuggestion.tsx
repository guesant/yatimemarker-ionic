import { ISuggestionCompared } from "./ISuggestionCompared";
import { clearSuggestionText } from "./clearSuggestionText";

export const clearSuggestion = ({ suggestion, ...i }: ISuggestionCompared) => ({
  ...i,
  suggestion: clearSuggestionText(suggestion).toLowerCase(),
});
