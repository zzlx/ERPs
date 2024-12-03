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
import util from "node:util";
import React from "react";
import ReactDOMServer from "react-dom/server";

import { 
  List, 
  MarkdownPreview,
} from "../uis/components/index.mts";

import { Router } from "../koa/Router.mts";
import { settings, paths } from "../settings/index.mts"; 
import { templateHtml } from "../utils/index.mts";
import { readdir } from "../backends/utils/index.mts";
import * as apiList from "../api/index.mts";

const debug = util.debuglog("debug:routes-api");
const html = await settings.template("index.html");
const readme = await fs.readFile(path.join(paths.SRC, "api", "./README.md"));

export const apis = new Router();

const apiData = Object.keys(apiList).map((v, k) => { 
  return {
    href: `/api/${v}`,
    children: v,
  };
});

const sitemap = [];
const markup = React.createElement(MarkdownPreview, { markdown: String(readme) });
const list =  React.createElement(List, { 
  // flush: true, 
  numbered: true,
  data: apiData,
}); 
const app = React.createElement(React.Fragment, null, markup, list);

apis.get("/", (ctx, next) => {
  ctx.body = templateHtml(String(html), { 
    title: "接口列表|API Lists",
    description: "API接口",
    styles: "/assets/css/styles.css",
    app: "",
    root: ReactDOMServer.renderToString(app),
  });

  return next();

});
