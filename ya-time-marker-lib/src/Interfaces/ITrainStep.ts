import { ITrainOptions } from "./ITrainOptions";
import { ITrainStepMeta } from "./ITrainStepMeta";

export type ITrainStep<Meta = ITrainStepMeta> = {
  meta: Meta;
  duration:
    | { type: "ref"; payload: keyof ITrainOptions["duration"] }
    | { type: "template"; payload: string };
};
