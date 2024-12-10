/**
 * *****************************************************************************
 * 
 *
 * *****************************************************************************
 */

import { Postgresql } from "../database/Postgresql.mts";
const pg = new Postgresql();

export async function postgresql (ctx, next) {
  ctx.db = await pg.getClient();
  const result = await ctx.db.query("SELECT now()");

  if (ctx.method === "GET") ctx.body = "graphql api";
  if (ctx.method === "POST") ctx.body = reslut;

  next();

  ctx.db.release();
}
