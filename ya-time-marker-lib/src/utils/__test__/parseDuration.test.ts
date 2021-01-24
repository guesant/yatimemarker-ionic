//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { parseDuration } from "../parseDuration";

test("parseDuration", () => {
  expect(parseDuration("30s")("invalid duration")).toBe("30s");
  expect(parseDuration("30s")("600 ms")).toBe("600ms");
});
