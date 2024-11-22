/**
 * *****************************************************************************
 * 
 * SQLite tool
 * 
 * *****************************************************************************
 */

import { DatabaseSync, /* StatementSync */ }  from 'node:sqlite';
import settings from "../settings/index.mts";

const target = {
  db: null,
};

export const sqlite = (location: string, options = {}) => new Proxy(target, {
  get: function (target, property, receiver) {
    if (property === "db") {
      if (target.db == null) target.db = new DatabaseSync(location, options);
      return target.db;
    }

    return Reflect.get(target, property, receiver);
  },
});
