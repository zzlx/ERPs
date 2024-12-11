/**
 * *****************************************************************************
 * 
 * homepage
 *
 * *****************************************************************************
 */

import fs from "node:fs";
import path from "node:path";
import util from "node:util";
import { Router } from "../koa/Router.mts";
import { srs } from "../koa/middlewares/index.mts";
import { paths } from "../settings/index.mts"; 

const debug = util.debuglog("debug:routes/docs");

export const docs = new Router({ }); // Doc router

docs.get("docs", "/docs/*", srs(paths.DOC, { 
  index: "README.md",
  prefix: "/docs(/*.*)", // 设置prefix后生效
})); 
