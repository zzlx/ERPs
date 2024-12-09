/**
 * *****************************************************************************
 *
 * Server-side Application
 *
 * ***************************************************************************** */

import util from "node:util";

import { Koa2 } from "./koa/Koa2.mts";
import { error } from "./koa/middlewares/error.mts";
import { cookies } from "./koa/middlewares/cookies.mts";
import { xResponse } from "./koa/middlewares/xResponse.mts";
import { logger } from "./koa/middlewares/logger.mts";
import { cors } from "./koa/middlewares/cors.mts";
// import { objectID } from "./utils/objectID.mts";
import { Postgresql } from "./database/Postgresql.mts";
import * as routes from "./routes/index.mts";

const debug = util.debuglog("debug:koa-app");
const pg = new Postgresql();

export const app = new Koa2({
  env: process.env.NODE_ENV || "production", // default value is production
  // keys: [String(objectID()), String(objectID())], // keys for encryept proxy: false, proxy: true,
  proxy: true,
  proxyIpHeader: "X-Real-IP",
  maxIpsCount: 1,
});

// Error handler
app.on("error", (err, ctx) => {
  debug(err);
  debug(ctx);
});

// 
false && app.use(async (ctx, next) => {
  ctx.db = await pg.getClient();
  await next();
  ctx.db.release();
  // debug(pg.pool);
});
app.use(error());
app.use(xResponse());
app.use(logger());
app.use(cors());
app.use(cookies());

// 载入服务端路由配置
Object.keys(routes).map(k => { 
  const route = routes[k].routes();
  app.use(route); // add routes
});

// 开发模式下启用的功能特性
// The last one of the middleware stack
app.env === "development" && app.use(async function (ctx) { 

  // const now = await ctx.db.query('SELECT NOW()')
  // ctx.body = now;

  // 用于标记中间件栈是否被完整的执行
  // 如果此中间件未被阻断,则设置状态为true
  ctx.state["innerest_middleware"] = true; 

  const n = ~~ctx.cookies.get("view") + 1;
  ctx.cookies.set("view", n);

  // Test: 用于开发环境下测试请求被处理的情况
  // debug("当前访问页面地址:", ctx.pathname);
  // const result = await ctx.dba.query("SELECT now()");
  // debug(result);
  // debug("totalcount:", ctx.dba.totalCount);
  // debug("idlecount:", ctx.dba.idleCount);
  // debug(typeof ctx.state.get("log"));
  // debug(typeof ctx.status);
  // debug(ctx.pathname);
  // debug(ctx.state);
  // debug(ctx.request);
  // debug(process.title);
  
});

// app.use(auth({ name: "admin", pass: "test" }));
