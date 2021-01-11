//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { findSuggestionIndexByHighlightTerm } from "../findSuggestionIndexByHighlightTerm";

const FIND_SUGGESTION_INDEX_BY_HIGHLIGHT_TERM =
  findSuggestionIndexByHighlightTerm.name;

test(`${FIND_SUGGESTION_INDEX_BY_HIGHLIGHT_TERM}`, () => {
  expect(
    findSuggestionIndexByHighlightTerm("match")([
      { text: "first", highlight: "alternative" },
      { text: "second", highlight: "alternative" },
      { text: "third", highlight: "match" },
    ]),
  ).toBe(2);
});
