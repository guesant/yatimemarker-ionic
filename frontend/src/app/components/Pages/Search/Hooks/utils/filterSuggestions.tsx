//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { ISuggestionCompared } from "./ISuggestionCompared";

export const filterSuggestions = (
  { suggestion }: ISuggestionCompared,
  index: number,
  arr: ISuggestionCompared[],
) => arr.findIndex((i) => i.suggestion === suggestion) === index;
