/**
 * *****************************************************************************
 *
 * PostgreSQL数据库接口程序
 *
 * 参考文档:
 * [node-postgres](https://node-postgres.com)项目提供的pg是用于在node环境下接口模块
 *
 * uses the same environment variables as libpq and psql to connect to PostgreSQL
 * 
 * Acquires a client from the pool 
 *
 * this.pool.connect()
 * client.release()
 *
 * *****************************************************************************
 */

import util from "node:util";
import pg from "pg";
import Cursor from 'pg-cursor'
import { DBA } from "./DBA.mts";

const debug = util.debuglog("debug:postgres-dba");
const POOL = Symbol("database-postgres-pool");

interface PoolConfig {
  user?: string;
  password?: string;
  host?: string;
  port?: string;
  database?: string;
  ssl?: boolean;
  rejectUnauthorized?: boolean;
  connectionString?: string, // postgres://user:password@host:5432/database
  statement_timeout?: number;
  query_timeout?: number;
  lock_timeout?: number,
  connectionTimeoutMillis?: number;
  idleTimeoutMillis?: number;
  idle_in_transaction_session_timeout?: number;
  max?: number;
  allowExitOnIdle?: boolean;
}

export class Postgresql extends DBA {
  constructor (options: PoolConfig) {
    super();
    this.name = "PostgresqlDBA";
    this.opts = Object.assign({}, {
      user: process.env.PGUSER || "postgres", 
      password: process.env.PGPASSWORD || null,
      host: process.env.PGHOST || "localhost",
      port: process.env.PGPORT || "5432",
      database: process.env.PGDATABASE || "postgres",
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    }, options);
  }

  get pool () {
    if (this[POOL] == null) {
      this[POOL] = new pg.Pool(this.opts);
    }

    return this[POOL];
  }
}

/**
 * 
 */

Postgresql.prototype.clean = async function () {
  return await this.pool.end();
}

/**
 * 
 */

interface QueryConfig {
  text: string;
  values?: any;
  name?: string;
  rowMode?: string;
  types?: any;
  queryMode?: string;
}

Postgresql.prototype.query = function (text: string, values?: any) {
  try {
    return this.pool.query(...arguments);
  } catch (error) {
    this.emit("error", { code: 0, message: error });
  }
}

/**
 *
 * client.release
 *
 */

Postgresql.prototype.getClient = async function () {
  const client = await this.pool.connect();
  try {
    return this.pool.connect();
  } catch (e) {
    this.emit("error", e);
  }

}
