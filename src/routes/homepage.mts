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
import { cors, ssr, srs } from "../koa/middlewares/index.mts";
import { settings, paths } from "../settings/index.mts"; 
import { readdir } from "../backends/utils/index.mts";

const debug = util.debuglog("debug:routes");
const template = await settings.template("index.html");

export const homepage = new Router({ }); // server router

debug("@todos: 服务器端路由path配置待解决.");

homepage.redirect("/home", "/"); // Redirect /test to /

homepage.get("public_html", "/*", srs("public_html"));
homepage.get(
  "UIS", 
  [ "/", "/home", "/home/*", "/test", "/test/*", ], 
  ssr({
    app: path.join(paths.SRC, "uis", "serverSideRender.mts"),
    template: template 
  }), // 前端程序
);

