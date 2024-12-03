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

import path from "node:path";
import util from "node:util";
import { Router } from "../koa/Router.mts";
import { settings, paths } from "../settings/index.mts"; 
import { templateHtml } from "../utils/index.mts";
import { readdir } from "../watchd/utils/index.mts";
import * as apiList from "../api/index.mts";

const debug = util.debuglog("debug:routes-api");
const html = await settings.template("index.html");

export const apis = new Router();

const sitemap = [];

apis.get("/", apiFn);

for (const r of apiPaths) {
  if (!/\.mts$/.test(r)) continue;
  const route = r.substr(apiPath.length);
  let url = route.substr(0, route.length -4); 
  if (path.basename(url) === "index") continue;
  if (path.basename(url) === "") continue;
  sitemap.push(url);

  let hasError = false;

  const fn = await import(r).then(m => m.default).catch(e => {
    debug(e);
    hasError = true;
  });

  if (hasError) continue;

  apis.use(url, typeof fn === "function" ? fn : fn.routes());

}

/**
 *
 *
 */

function apiFn (ctx, next) {
  const list = sitemap.sort().map(url => 
    `<li class="list-group-item"><a target="_blank" href="${ctx.pathname}${url}">${url}</a></li>`
  ).join("");
  const api = `<h1>api接口列表</h2>
    <ul class="list-group list-group-numbered">
    ${list}
    </ul>`;

  ctx.body = templateHtml(String(html), { 
    title: "接口列表|API Lists",
    description: "API接口",
    styles: "/assets/css/styles.css",
    app: "",
    root: api,
  });

  return next();
}
