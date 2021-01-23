//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { computeDuration } from "../computeDuration";

test("computeDuration", () => {
  const expected = 13;
  const context = { duration: { interval: 3, startCountdown: 7, train: 5 } };
  const template = "{{duration.train*2 + duration.interval}}";
  expect(computeDuration(context)(`${template}`)).toBe(expected);
  expect(computeDuration(context)(` ${template} `)).toBe(expected);
});

test("computeDuration: NaN", () => {
  const expected = NaN;
  const context = { duration: { interval: 3, startCountdown: 7, train: 5 } };
  const template = "# {{duration.train}} #";
  expect(computeDuration(context)(template)).toBe(expected);
});
