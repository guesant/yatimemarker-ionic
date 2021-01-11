//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import { ITrain } from "../../types/ITrain";
import { getDbTrains } from "../../db";

export async function getTrain(id: string) {
  const dbTrains = await getDbTrains();
  const trainDoc = await dbTrains.get<ITrain>(id);
  return trainDoc;
}
