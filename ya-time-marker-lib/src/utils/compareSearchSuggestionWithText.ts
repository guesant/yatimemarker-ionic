//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { IComparedSuggestion } from "../types/IComparedSuggestion";
import { ISuggestion } from "../types/ISuggestionResult";
import { findSuggestionIndexByHighlightTerm } from "./findSuggestionIndexByHighlightTerm";
import { getTermsFromString } from "./getTermsFromString";
import { getUnusedChunks } from "./getUnusedChunks";
import { minifyComparedSuggestions } from "./minifyComparedSuggestions";

export const compareTextWithSearchSuggestion = (searchText: string) => ({
  suggestion,
}: ISuggestion): IComparedSuggestion[] => {
  if (!searchText.trim() || !suggestion.length) return [];

  if (suggestion.toLowerCase().trim() === searchText.toLowerCase().trim()) {
    return [{ text: searchText, highlight: "match" }];
  }

  const suggestionPieces = suggestion
    .split("")
    .map((char): IComparedSuggestion => ({ text: char, highlight: "no" }));

  const queueSearchTextChunks = searchText
    .trim()
    .replace(/ {2,}/g, " ")
    .split(" ")
    .map((chunk) => ({ chunk, used: false }));

  const parsedSuggestion = suggestion.toLowerCase();

  while (true) {
    const searchTextChunks = getUnusedChunks(queueSearchTextChunks);
    if (!searchTextChunks.length) break;
    for (const searchTextChunk of searchTextChunks) {
      const textChunk = searchTextChunk.chunk;
      const lowerTextChunk = textChunk.toLowerCase();
      if (parsedSuggestion.includes(lowerTextChunk)) {
        searchTextChunk.used = true;
        const startIndex = parsedSuggestion.indexOf(lowerTextChunk);
        for (let i = 0; i < lowerTextChunk.length; i++) {
          const suggestionPiece = suggestionPieces[startIndex + i];
          suggestionPiece.text = textChunk[i];
          suggestionPiece.highlight = "match";
        }
      }
    }
    const nowUnusedChunks = getUnusedChunks(queueSearchTextChunks);
    if (nowUnusedChunks.length === searchTextChunks.length) break;
  }

  const minified = minifyComparedSuggestions(suggestionPieces);

  const [lastMatchIndex, firstMatchIndex] = ((
    term: IComparedSuggestion["highlight"],
  ) => [
    findSuggestionIndexByHighlightTerm(term)(Array.from(minified).reverse()),
    findSuggestionIndexByHighlightTerm(term)(minified),
  ])("match");

  if (lastMatchIndex > -1) {
    const lastIndex = minified.length - 1 - lastMatchIndex;
    const firstIndex = firstMatchIndex;
    minified.forEach((i, idx) => {
      if (idx > lastIndex) {
        i.highlight = getTermsFromString(suggestion).includes(i.text)
          ? "alternative"
          : "maybe";
      }
      if (idx < firstIndex) {
        i.highlight = "alternative";
      }
    });
  }

  return minified;
};
