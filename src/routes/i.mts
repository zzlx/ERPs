/**
 * *****************************************************************************
 * 
 * 通过短地址访问系统所有路由节点
 * i.g. /i/8abc3d
 *
 * *****************************************************************************
 */

import fs from "node:fs/promises";
import path from "node:path";
import React from "react";
import ReactDOMServer from "react-dom/server";

import { 
  List, 
  MarkdownPreview,
} from "../uis/components/index.mts";

import { Router } from "../koa/Router.mts";
import { settings, paths } from "../settings/index.mts"; 
import { templateHtml } from "../utils/index.mts";
import * as apiList from "../api/index.mts";

const html = await settings.template("index.html");
const readme = await fs.readFile(path.join(paths.SRC, "api", "./README.md"));

// Test Route
export const i = new Router();

i.get("user", "/users/:uid", (ctx, next) => {
  debug("params", ctx.params);
  debug("captures", ctx.captures);
  ctx.body = ctx.router.url("user", { id: 180 }, { query: "test=abc"});
  return next();
});
