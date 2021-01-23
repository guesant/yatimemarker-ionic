//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import ms from "ms";
import { ITrainContext } from "../types";
import { renderTemplate } from "./renderTemplate";

export const computeDuration = <Context = ITrainContext>(
  stepContext: Context,
) => (template: string) =>
  Math.abs(ms(String(renderTemplate(template)({ ...stepContext })).trim()));
