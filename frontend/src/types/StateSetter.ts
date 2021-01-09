//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { Dispatch, SetStateAction } from "react";

export type StateSetter<S> = Dispatch<SetStateAction<S>>;
