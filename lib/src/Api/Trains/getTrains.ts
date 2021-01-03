import { ITrain } from "../../Interfaces/ITrain";
import { DB_TRAINS } from "../../db";

export async function getTrains(): Promise<ITrain[]> {
  const { rows } = await DB_TRAINS.allDocs<ITrain>({
    include_docs: true,
    descending: true,
  });
  return rows.map(({ doc }) => doc) as any[];
}
