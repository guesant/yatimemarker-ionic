//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { ITrainStep } from "../../types";
import { computeMidTrainDuration } from "../computeMidTrainDuration";

test("computeMidTrainDuration", () => {
  const stepContext = {
    duration: { interval: 3, startCountdown: 7, train: 5 },
  };

  const {
    duration: { startCountdown, interval },
  } = stepContext;

  const exampleStep1: ITrainStep = {
    type: "duration",
    payload: { type: "ref", payload: "train" },
    meta: {} as any,
  };

  expect(computeMidTrainDuration(stepContext, [])).toBe(0);
  expect(computeMidTrainDuration(stepContext, [exampleStep1])).toBe(
    startCountdown,
  );
  expect(
    computeMidTrainDuration(stepContext, [exampleStep1, exampleStep1]),
  ).toBe(startCountdown + interval * 1);
  expect(
    computeMidTrainDuration(stepContext, [
      exampleStep1,
      exampleStep1,
      exampleStep1,
    ]),
  ).toBe(startCountdown + interval * 2);
});
