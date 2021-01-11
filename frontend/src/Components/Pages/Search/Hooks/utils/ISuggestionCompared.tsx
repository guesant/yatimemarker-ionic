import { ISuggestion } from "@ya-time-marker/lib/build/types/ISuggestionResult";

export type ISuggestionCompared = ISuggestion & {
  isEqualsToTheSearchText: boolean;
};
