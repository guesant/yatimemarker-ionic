//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { getUnusedChunks } from "../getUnusedChunks";

const GET_UNUSED_CHUNKS = getUnusedChunks.name;

test(`${GET_UNUSED_CHUNKS}`, () => {
  expect(
    getUnusedChunks([
      { chunk: "treino", used: true },
      { chunk: "polichinelo", used: false },
      { chunk: "gabriel rodrigues antunes", used: true },
    ]),
  ).toEqual([{ chunk: "polichinelo", used: false }]);
});
