//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import ms from "ms";
import { addTimeUnit } from "./addTimeUnit";

export const parseDuration = (defaultValue: string) => (value: any) => {
  const duration = String(value).trim();
  if (isNaN(ms(duration))) return defaultValue;
  return addTimeUnit("s")(duration);
};
