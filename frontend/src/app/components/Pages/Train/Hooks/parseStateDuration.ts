//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import ms from "ms";

export const parseStateDuration = (duration: string | number) =>
  ms(String(duration));
