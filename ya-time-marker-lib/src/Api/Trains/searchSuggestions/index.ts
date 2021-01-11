//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import MiniSearch from "minisearch";
import { getDbTrains } from "../../../db";
import { ITrain } from "../../../types/ITrain";
import { extractField } from "../searchTrains/extractField";

export async function searchSuggestions(searchQuery: string) {
  const dbTrains = await getDbTrains();

  const { rows } = await dbTrains.allDocs<ITrain>({
    include_docs: true,
    descending: true,
  });

  const docs = rows
    .map(({ doc }) => doc)
    .map(({ _id, ...doc }: any) => ({ id: _id, ...doc }));

  const miniSearch = new MiniSearch({
    extractField,
    storeFields: ["id", "title"],
    fields: ["title", "steps"],
  });

  miniSearch.addAll(docs);

  return miniSearch.autoSuggest(searchQuery, {
    fuzzy: 0.2,
    boost: { title: 2 },
  });
}
