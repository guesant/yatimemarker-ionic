import { ITrainStep } from "./ITrainStep";

export type ITrain = {
  _id?: string;
  title: string;
  steps: ITrainStep[];
};
