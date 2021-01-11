//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

export const getUnusedChunks = (chunks: { used: boolean; chunk: string }[]) =>
  chunks.filter(({ used }) => !used);
