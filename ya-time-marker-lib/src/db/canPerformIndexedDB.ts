//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

import PouchDB from "pouchdb";

const CAN_PERFORM_INDEXED_DB = "canPerformIndexedDB";

const hasOwnProperty = (obj: any, key: string) =>
  Object.prototype.hasOwnProperty.call(obj, key);

const getSessionCanPerf = () => {
  if (hasOwnProperty(sessionStorage, CAN_PERFORM_INDEXED_DB)) {
    try {
      return JSON.parse(
        sessionStorage.getItem(CAN_PERFORM_INDEXED_DB) as string
      );
    } catch (_) {}
  }
  return null;
};

const setSessionCanPerf = (value: boolean) => {
  sessionStorage.setItem(CAN_PERFORM_INDEXED_DB, JSON.stringify(value));
  return value;
};

export const verifyCanPerformIndexedDB = async () => {
  if (getSessionCanPerf() !== null) return getSessionCanPerf();
  try {
    const testDB = new PouchDB("test");
    await testDB.get("test_doc_id");
  } catch (error) {
    if (error.name === "indexed_db_went_bad") {
      return setSessionCanPerf(false);
    }
  }
  return setSessionCanPerf(true);
};
