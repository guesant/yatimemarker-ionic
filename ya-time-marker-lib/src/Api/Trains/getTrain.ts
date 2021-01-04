import { ITrain } from "../../Interfaces/ITrain";
import { DB_TRAINS } from "../../db";

export async function getTrain(id: string) {
  const trainDoc = await DB_TRAINS.get<ITrain>(id);
  return trainDoc;
}
