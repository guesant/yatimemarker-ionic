import { ITrain } from "../../Interfaces/ITrain";
import { getDbTrains } from "../../db";

export async function getTrains() {
  const dbTrains = await getDbTrains();
  const { rows } = await dbTrains.allDocs<ITrain>({
    include_docs: true,
    descending: false,
  });
  return rows.map(({ doc }) => doc);
}
