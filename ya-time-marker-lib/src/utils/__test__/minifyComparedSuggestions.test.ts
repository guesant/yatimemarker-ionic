//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { minifyComparedSuggestions } from "../minifyComparedSuggestions";

const MINIFY_COMPARED_SUGGESTIONS = minifyComparedSuggestions.name;

test(`${MINIFY_COMPARED_SUGGESTIONS}`, () => {
  expect(
    minifyComparedSuggestions([
      { text: "treino", highlight: "match" },
      { text: " ", highlight: "match" },
      { text: "poli", highlight: "match" },
      { text: "chinelo", highlight: "maybe" },
    ]),
  ).toEqual([
    { text: "treino poli", highlight: "match" },
    { text: "chinelo", highlight: "maybe" },
  ]);
});

test(`${MINIFY_COMPARED_SUGGESTIONS}: consider space (" ") from a diffrent highlight as previous match`, () => {
  expect(
    minifyComparedSuggestions([
      { text: "treino", highlight: "match" },
      { text: " ", highlight: "no" },
      { text: "poli", highlight: "match" },
      { text: "chinelo", highlight: "maybe" },
    ]),
  ).toEqual([
    { text: "treino poli", highlight: "match" },
    { text: "chinelo", highlight: "maybe" },
  ]);
});
