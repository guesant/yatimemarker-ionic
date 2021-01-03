import { nanoid } from "nanoid";
import { ITrain } from "../../Interfaces/ITrain";
import { DB_TRAINS } from "../../db";

export async function addTrain(train: ITrain) {
  await DB_TRAINS.put({ _id: "id" + nanoid(), ...train });
}
