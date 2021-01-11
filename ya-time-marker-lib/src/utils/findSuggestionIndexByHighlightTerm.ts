//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { IComparedSuggestion } from "../types/IComparedSuggestion";
import { termMatchesHighlight } from "./termMatchesHighlight";

export const findSuggestionIndexByHighlightTerm = (
  term: IComparedSuggestion["highlight"],
) => (arr: IComparedSuggestion[]) => arr.findIndex(termMatchesHighlight(term));
