import { ITrainStep } from "@ya-time-marker/lib";

export const getTrainStep = (description = "Passo"): ITrainStep => {
  return {
    type: "duration",
    meta: { description },
    payload: { type: "ref", payload: "train" },
  };
};
