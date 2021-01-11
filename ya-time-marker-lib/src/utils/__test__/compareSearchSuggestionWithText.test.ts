//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { compareTextWithSearchSuggestion } from "../compareSearchSuggestionWithText";

const COMPARE_TEXT_WITH_SEARCH_SUGGESTION =
  compareTextWithSearchSuggestion.name;

test(`${COMPARE_TEXT_WITH_SEARCH_SUGGESTION}: empty searchText`, () => {
  expect(
    compareTextWithSearchSuggestion("")({
      score: 0,
      terms: [""],
      suggestion: "",
    }),
  ).toEqual([]);
});

test(`${COMPARE_TEXT_WITH_SEARCH_SUGGESTION}: exact match`, () => {
  expect(
    compareTextWithSearchSuggestion("treino")({
      score: 0,
      terms: ["treino"],
      suggestion: "treino",
    }),
  ).toEqual([{ text: "treino", highlight: "match" }]);
});

test(`${COMPARE_TEXT_WITH_SEARCH_SUGGESTION}: maybe match`, () => {
  expect(
    compareTextWithSearchSuggestion("treino poli")({
      score: 0,
      terms: ["treino", "polichinelo"],
      suggestion: "treino polichinelo",
    }),
  ).toEqual([
    { text: "treino poli", highlight: "match" },
    { text: "chinelo", highlight: "maybe" },
  ]);
});

test(`${COMPARE_TEXT_WITH_SEARCH_SUGGESTION}: alternative before match`, () => {
  expect(
    compareTextWithSearchSuggestion("treimo poli")({
      score: 0,
      terms: ["treino", "polichinelo"],
      suggestion: "treino polichinelo",
    }),
  ).toEqual([
    { text: "treino ", highlight: "alternative" },
    { text: "poli", highlight: "match" },
    { text: "chinelo", highlight: "maybe" },
  ]);
});

test(`${COMPARE_TEXT_WITH_SEARCH_SUGGESTION}: alternative after match`, () => {
  expect(
    compareTextWithSearchSuggestion("treino polichinelw")({
      score: 0,
      terms: ["treino", "polichinelo"],
      suggestion: "treino polichinelo",
    }),
  ).toEqual([
    { text: "treino ", highlight: "match" },
    { text: "polichinelo", highlight: "alternative" },
  ]);

  expect(
    compareTextWithSearchSuggestion("treino pol")({
      score: 0,
      terms: ["treino", "polichinelo"],
      suggestion: "treino polichinelo",
    }),
  ).toEqual([
    { text: "treino pol", highlight: "match" },
    { text: "ichinelo", highlight: "maybe" },
  ]);
});

test(`${COMPARE_TEXT_WITH_SEARCH_SUGGESTION}: preserve searchText caps`, () => {
  expect(
    compareTextWithSearchSuggestion("TREIno POLIchinELO")({
      score: 0,
      terms: ["treino", "polichinelo"],
      suggestion: "treino polichinelo",
    }),
  ).toEqual([{ text: "TREIno POLIchinELO", highlight: "match" }]);

  expect(
    compareTextWithSearchSuggestion("TREIno POLIchi")({
      score: 0,
      terms: ["treino", "polichinelo"],
      suggestion: "treino polichinelo",
    }),
  ).toEqual([
    { text: "TREIno POLIchi", highlight: "match" },
    { text: "nelo", highlight: "maybe" },
  ]);
});
