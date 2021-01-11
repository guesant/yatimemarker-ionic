//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

export type IComparedSuggestion = {
  text: string;
  highlight: "no" | "match" | "maybe" | "alternative";
};
