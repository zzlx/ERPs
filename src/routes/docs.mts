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

export const router = new Router({ }); // Doc router
export const docs = router;

router.get("Docs", "/docs/*", srs(paths.DOC, { 
  index: "README.md",
  prefix: "/doc(/*.*)", // 设置prefix后生效
})); 
