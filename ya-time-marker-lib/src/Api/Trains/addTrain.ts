import { nanoid } from "nanoid";
import { ITrain } from "../../Interfaces/ITrain";
import { getDbTrains } from "../../db";

export async function addTrain(train: ITrain) {
  const dbTrains = await getDbTrains();
  await dbTrains.put({ _id: "id" + nanoid(), ...train });
}
