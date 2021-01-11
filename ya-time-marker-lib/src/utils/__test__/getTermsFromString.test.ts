//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { getTermsFromString } from "../getTermsFromString";

const GET_TERMS_FROM_STRING = getTermsFromString.name;

test(`${GET_TERMS_FROM_STRING}`, () => {
  expect(getTermsFromString("treino polichinelo")).toEqual([
    "treino",
    "polichinelo",
  ]);

  expect(getTermsFromString("treino   polichinelo ")).toEqual([
    "treino",
    "polichinelo",
  ]);
});
