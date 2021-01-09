//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import MiniSearch from "minisearch";
import { getDbTrains } from "../../../db";
import { ITrain } from "../../../Interfaces/ITrain";
import { extractField } from "./extractField";
import { ISearchTrainsOptions } from "./ISearchTrainsOptions";

export async function searchTrains(
  searchQuery: string,
  { searchFields = ["title"] }: ISearchTrainsOptions = {}
) {
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
    fields: searchFields,
    storeFields: ["id", "title"],
  });

  miniSearch.addAll(docs);

  const results = miniSearch.search(searchQuery, {
    fuzzy: 0.1,
    prefix: true,
    boost: { title: 2 },
  });

  return results;
}
