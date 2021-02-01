//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { computeAllTrainDurations } from "../computeAllTrainDurations";
import { ITrainStep } from "../../types/ITrainStep";

const stepContext = {
  duration: { interval: 3, startCountdown: 7, train: 5 },
};

const {
  duration: { startCountdown, train, interval },
} = stepContext;

const exampleStepDRefTrain: ITrainStep = {
  type: "duration",
  payload: { type: "ref", payload: "train" },
};

const exampleStepDTemplate: ITrainStep = {
  type: "duration",
  payload: { type: "template", payload: "55" },
};

const exampleStepText: ITrainStep = {
  type: "text",
  payload: { type: "template", payload: "infinite step" },
};

test("computeAllTrainDurations", () => {
  const reference0 = computeAllTrainDurations(stepContext)({
    title: "",
    steps: [],
  });
  expect(reference0.hasInfinitySteps).toBe(false);
  expect(reference0.notStepDuration).toBe(0);
  expect(reference0.stepsDurationSum).toBe(0);
  expect(reference0.totalDuration).toBe(0);
});

test(`computeAllTrainDurations: duration ref (${train}s)`, () => {
  const reference1 = computeAllTrainDurations(stepContext)({
    title: "",
    steps: [exampleStepDRefTrain],
  });
  expect(reference1.hasInfinitySteps).toBe(false);
  expect(reference1.notStepDuration).toBe(startCountdown);
  expect(reference1.stepsDurationSum).toBe(train);
  expect(reference1.totalDuration).toBe(train + startCountdown);
});

test("computeAllTrainDurations: duration template (55sec)", () => {
  const reference2 = computeAllTrainDurations(stepContext)({
    title: "",
    steps: [exampleStepDTemplate],
  });
  expect(reference2.hasInfinitySteps).toBe(false);
  expect(reference2.notStepDuration).toBe(startCountdown);
  expect(reference2.stepsDurationSum).toBe(55);
  expect(reference2.totalDuration).toBe(55 + startCountdown);
});

test("computeAllTrainDurations: text step (infinite)", () => {
  const reference3 = computeAllTrainDurations(stepContext)({
    title: "",
    steps: [exampleStepText],
  });
  expect(reference3.hasInfinitySteps).toBe(true);
  expect(reference3.notStepDuration).toBe(startCountdown);
  expect(reference3.stepsDurationSum).toBe(0);
  expect(reference3.totalDuration).toBe(startCountdown);
});

test("computeAllTrainDurations: (infinite)+(ref)", () => {
  const reference3 = computeAllTrainDurations(stepContext)({
    title: "",
    steps: [exampleStepDRefTrain, exampleStepText],
  });
  expect(reference3.hasInfinitySteps).toBe(true);
  expect(reference3.notStepDuration).toBe(startCountdown + interval);
  expect(reference3.stepsDurationSum).toBe(train);
  expect(reference3.totalDuration).toBe(startCountdown + interval + train);
});
