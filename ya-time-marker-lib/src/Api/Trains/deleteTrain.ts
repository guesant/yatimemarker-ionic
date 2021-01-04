import { DB_TRAINS } from "../../db";
import { getTrain } from "./getTrain";

export async function deleteTrain(id: string): Promise<void> {
  await getTrain(id).then((doc) => DB_TRAINS.remove(doc));
}
