import { ITrain } from "../../Interfaces/ITrain";
import { DB_TRAINS } from "../../db";

export async function getTrain(id: string): Promise<ITrain> {
  const doc = await DB_TRAINS.get<ITrain>(id);
  return doc;
}
