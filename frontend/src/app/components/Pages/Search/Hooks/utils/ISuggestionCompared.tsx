//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { ISuggestion } from "@ya-time-marker/lib/build/types/ISuggestionResult";

export type ISuggestionCompared = ISuggestion & {
  isEqualsToTheSearchText: boolean;
};
