/**
 * *****************************************************************************
 *
 *
 * *****************************************************************************
 */

import util from "node:util";
import pg from "pg";
import { Postgresql } from "../src/database/Postgresql.mts";
import { settings } from "../src/settings/index.mts";

const debug = util.debuglog("debug:test-postgresql");
// const pg = new Postgresql({ poolMode: false, ...PG});
const client = new pg.Client({ ... settings.pg });
await client.connect();

// const res = await client.query('SELECT $1::text as message', ['Hello world!'])
// const result = await client.query("SELECT NOW()");
const result = await client.query('SELECT $1::text as name', ['brianc'])
client.end();
debug(result);
