import { ITrain } from "../types";
import { Database } from "./Database";
import { nanoid } from "nanoid";
import MiniSearch from "minisearch";
import { extractField } from "../utils/extractField";
import { ISearchTrainsOptions } from "../types/ISearchTrainsOptions";

export class Trains {
  static getDbTrains = () => Database.createDB("trains");

  static async addTrain(train: ITrain) {
    const dbTrains = await Trains.getDbTrains();
    await dbTrains.put({ _id: "id" + nanoid(), ...train });
  }

  static async searchTrains(
    searchQuery: string,
    { searchFields = ["title"] }: ISearchTrainsOptions = {},
  ) {
    const dbTrains = await Trains.getDbTrains();

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

  static async searchSuggestions(searchQuery: string) {
    const dbTrains = await Trains.getDbTrains();

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

  static async getTrains() {
    const dbTrains = await Trains.getDbTrains();
    const { rows } = await dbTrains.allDocs<ITrain>({
      include_docs: true,
      descending: false,
    });
    return rows.map(({ doc }) => doc);
  }

  static async getTrain(id: string) {
    const dbTrains = await Trains.getDbTrains();
    const trainDoc = await dbTrains.get<ITrain>(id);
    return trainDoc;
  }

  static async deleteTrain(id: string): Promise<void> {
    const dbTrains = await Trains.getDbTrains();
    await Trains.getTrain(id).then((doc) => dbTrains.remove(doc));
  }
}
