//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { termMatchesHighlight } from "../termMatchesHighlight";

const TERM_MATCHES_HIGHLIGHT = termMatchesHighlight.name;

test(`${TERM_MATCHES_HIGHLIGHT}`, () => {
  expect(
    termMatchesHighlight("match")({ text: "item", highlight: "match" }),
  ).toBe(true);

  expect(
    termMatchesHighlight("match")({ text: "item", highlight: "alternative" }),
  ).toBe(false);
});
