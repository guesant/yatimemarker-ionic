//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { ITrainContext } from "@ya-time-marker/lib";
import fromPairs from "lodash.frompairs";
import { modifyDictValues } from "./modifyDictValues";
import { parseStateDuration } from "./parseStateDuration";

export const parseDictDuration = (duration: any) =>
  fromPairs(
    modifyDictValues<string, number>((i) => parseStateDuration(i))(duration),
  ) as ITrainContext["duration"];
