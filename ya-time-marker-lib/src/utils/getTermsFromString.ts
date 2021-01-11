//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

export const getTermsFromString = (text: string) =>
  text
    .trim()
    .split(" ")
    .map((i) => i.trim())
    .filter((i) => i.length > 0);
