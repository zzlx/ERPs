/**
 * *****************************************************************************
 * 
 * 服务端路由配置
 *
 * @TODOS:
 *
 * * 解决子路由path问题
 * * ...
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

export const apis = new Router();

apis.get("/", (ctx, next) => {
  ctx.body = "test";
  return next();
});
