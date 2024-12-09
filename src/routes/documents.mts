/**
 * *****************************************************************************
 * 
 * 服务端路由配置
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

export const documents = () => {};

const debug = util.debuglog("debug:routes");
const template = await settings.template("index.html");
export const router = new Router({ }); // server router
debug("@todos: 服务器端路由path配置待解决.");

router.redirect("/home", "/"); // Redirect /test to /

router.get("public_html", "/*", srs("public_html"));

if (process.env.NODE_ENV === "development") {
  router.get("root", "/coding(/*.*)", srs(paths.ROOT, {
    prefix: "/coding",
  }));
}

// Doc router
const docsRouter = new Router({ });

docsRouter.get("Docs", "*", srs(paths.DOC, { 
  index: "README.md",
  prefix: "/doc(/*.*)", // 设置prefix后生效
})); 

router.use("/doc(/*.*)", docsRouter.routes());

router.all(
  "UIAPP", 
  [ "/", "/home", "/home/*", "/test", "/test/*", ], 
  ssr({
    app: path.join(paths.SRC, "uis", "serverSideRender.mts"),
    template: template 
  }), // 前端程序
);

// Test Route
const testRouter = new Router();

testRouter.get("user", "/users/:uid", (ctx, next) => {
  debug("params", ctx.params);
  debug("captures", ctx.captures);
  ctx.body = ctx.router.url("user", { id: 180 }, { query: "test=abc"});
  return next();
});

router.use(testRouter.routes());

/**
 * 读取文件头介绍
 */

function readNote (file) {
  const c = fs.promises.readFile(file);

  c.then(content => {
      console.log(content.length);
  });
}

function apiRouter (root) {
  if ("string" !== typeof root) {
    throw new Error ("The root paramater for autoRouting  must be a string value.");
  }

  // routing path
  const rPath = path.isAbsolute(root) ? root : path.join(process.cwd(), root);
  const rFiles = readdir(rPath);
  const router = new Router({
    method: ["GET", "POST"],
  });

  for (const f of rFiles) {
    const uri = f.substr(rPath.length);
    let url = uri.substr(0, uri.length - 4);
    if (path.basename(url) === "index") url = path.dirname(url);
    // router.use(url, m);
  }

  const routes = router.routes();
  const allow = router.allowedMethods();

  return function autoRoutingMiddleware (ctx, next) {
    // routes();
    // allow();
    return next();
  };
}
