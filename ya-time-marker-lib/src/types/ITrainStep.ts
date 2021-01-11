//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { ITrainOptions } from "./ITrainOptions";
import { ITrainStepMeta } from "./ITrainStepMeta";

export type ITrainStepCore<Meta = ITrainStepMeta> = {
  meta: Meta;
};

export type ITrainStepInfo<Meta = ITrainStepMeta> = ITrainStepCore<Meta> & {
  type: "text";
  payload: { type: "template"; payload: string };
};

export type ITrainStepDuration<Meta = ITrainStepMeta> = ITrainStepCore<Meta> & {
  type: "duration";
  payload:
    | { type: "ref"; payload: keyof ITrainOptions["duration"] }
    | { type: "template"; payload: string };
};

export type ITrainStep<Meta = ITrainStepMeta> =
  | ITrainStepDuration<Meta>
  | ITrainStepInfo<Meta>;
