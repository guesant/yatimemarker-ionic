//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { ITrainStep } from "../../types";
import { computeStepDuration } from "../computeStepDuration";

const getRandomStep = (
  type: "text" | "d_ref" | "d_template",
  payload: string,
): ITrainStep => {
  const meta = {} as any;
  return ({
    text: {
      meta,
      type: "text",
      payload: { type: "template", payload },
    },
    d_ref: {
      meta,
      type: "duration",
      payload: { type: "ref", payload },
    },
    d_template: {
      meta,
      type: "duration",
      payload: { type: "template", payload },
    },
  } as { [key: string]: ITrainStep })[type];
};

test("computeStepDuration: text (Infinity)", () => {
  const step = getRandomStep("text", "step text");
  const context = { duration: { interval: 3, startCountdown: 7, train: 5 } };
  expect(computeStepDuration(context)(step)).toBe(Infinity);
});

test("computeStepDuration: d_ref (context)", () => {
  const dRef = (ref: string) => getRandomStep("d_ref", ref);
  const context = { duration: { interval: 3, startCountdown: 7, train: 5 } };

  expect(computeStepDuration(context)(dRef("train"))).toBe(
    context.duration.train,
  );

  expect(computeStepDuration(context)(dRef("interval"))).toBe(
    context.duration.interval,
  );

  expect(computeStepDuration(context)(dRef("startCountdown"))).toBe(
    context.duration.startCountdown,
  );
});

test("computeStepDuration: d_template", () => {
  const context = { duration: { interval: 3, startCountdown: 7, train: 5 } };

  expect(
    computeStepDuration(context)(
      getRandomStep("d_template", "{{duration.train+30}}"),
    ),
  ).toBe(context.duration.train + 30);

  expect(computeStepDuration(context)(getRandomStep("d_template", "-30"))).toBe(
    30,
  );

  expect(
    computeStepDuration(context)(getRandomStep("d_template", "asdfg")),
  ).toBe(Infinity);
});
