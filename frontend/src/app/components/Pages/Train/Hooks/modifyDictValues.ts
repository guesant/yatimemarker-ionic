//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

export const modifyDictValues = <V = string, R = V>(fn: (value: V) => R) => (
  object: any,
) =>
  (Object.entries(object) as [string, V][]).map(([key, value]) => [
    key,
    fn(value),
  ]);
