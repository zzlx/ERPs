/**
 * *****************************************************************************
 * 
 * test
 *
 * *****************************************************************************
 */

import fs from "node:fs/promises";

// get users from db
const users =  {
  1: "zhang",
  2: "wang",
  3: "li",
  4: "zhao"
};

export function zztata (ctx, next) {
  ctx.type = "html";
  ctx.body = "<h1>hello world!</h1>";
  return next();
};
