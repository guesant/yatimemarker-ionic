import PouchDB from "pouchdb";
import MemoryAdapter from "pouchdb-adapter-memory";
import { verifyCanPerformIndexedDB } from "./canPerformIndexedDB";

PouchDB.plugin(MemoryAdapter);

const builtDBS = new Map<string, PouchDB.Database>();

async function createDB(dbName: string) {
  if (builtDBS.has(dbName)) return builtDBS.get(dbName)!;
  let db: PouchDB.Database | null = null;
  if (await verifyCanPerformIndexedDB()) {
    db = new PouchDB(dbName);
    builtDBS.set(dbName, db);
  } else {
    db = new PouchDB(dbName, { adapter: "memory" });
  }
  return db!;
}

export const getDbTrains = () => createDB("trains");
