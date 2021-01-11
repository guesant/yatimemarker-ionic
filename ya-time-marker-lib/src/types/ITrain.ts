//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { ITrainStep } from "./ITrainStep";

export type ITrain = {
  _id?: string;
  title: string;
  steps: ITrainStep[];
};
