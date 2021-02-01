import { ITrain, ITrainContext, ITrainStep } from "../types";
import { computeMidTrainDuration } from "./computeMidTrainDuration";
import { computeStepDuration } from "./computeStepDuration";

const getStepsDuration = (stepContext: ITrainContext, steps: ITrainStep[]) =>
  steps.map((step) => computeStepDuration(stepContext)(step));

const getStepsDurationSum = (stepContext: ITrainContext, steps: ITrainStep[]) =>
  getStepsDuration(stepContext, steps)
    .filter((i) => i !== Infinity)
    .reduce((acc, i) => acc + i, 0);

export const computeAllTrainDurations = (stepContext: ITrainContext) => ({
  steps,
}: ITrain) => {
  const notStepDuration = computeMidTrainDuration(stepContext, steps);
  const stepsDuration = getStepsDuration(stepContext, steps);
  const stepsDurationSum = getStepsDurationSum(stepContext, steps);
  return {
    stepsDuration,
    notStepDuration,
    hasInfinitySteps: stepsDuration.includes(Infinity),
    stepsDurationSum,
    totalDuration: stepsDurationSum + notStepDuration,
  };
};
