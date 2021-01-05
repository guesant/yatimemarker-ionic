import MiniSearch from "minisearch";
import { getDbTrains } from "../../../db";
import { ITrain } from "../../../Interfaces/ITrain";
import { ISearchTrainsOptions } from "./ISearchTrainsOptions";
import { searchFieldsToFields } from "./searchFieldsToFields";
import { extractField } from "./extractField";

export async function searchTrains(
  searchQuery: string,
  { searchFields = { title: true, steps: false } }: ISearchTrainsOptions = {}
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
    storeFields: ["id", "title"],
    fields: searchFieldsToFields(searchFields || {}),
  });

  miniSearch.addAll(docs);

  const results = miniSearch.search(searchQuery, {
    fuzzy: 0.1,
    prefix: true,
    boost: { title: 2 },
  });

  return results;
}
