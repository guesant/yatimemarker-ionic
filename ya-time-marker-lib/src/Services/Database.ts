//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import PouchDB from "pouchdb";
import MemoryAdapter from "pouchdb-adapter-memory";
import { verifyCanPerformIndexedDB } from "../utils/canPerformIndexedDB";

PouchDB.plugin(MemoryAdapter);

const builtDBS = new Map<string, PouchDB.Database>();

export class Database {
  static async createDB(dbName: string) {
    if (builtDBS.has(dbName)) return builtDBS.get(dbName)!;

    const db = await (async (): Promise<PouchDB.Database | null> => {
      if (await verifyCanPerformIndexedDB()) {
        const db = new PouchDB(dbName);
        builtDBS.set(dbName, db);
        return db;
      } else {
        return new PouchDB(dbName, { adapter: "memory" });
      }
    })();

    return db!;
  }
}
