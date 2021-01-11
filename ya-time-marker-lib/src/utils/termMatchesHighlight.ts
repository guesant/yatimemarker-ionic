//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { IComparedSuggestion } from "../types/IComparedSuggestion";

export const termMatchesHighlight = (
  term: IComparedSuggestion["highlight"],
) => ({ highlight }: IComparedSuggestion) => highlight === term;
