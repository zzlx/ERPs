/**
 * *****************************************************************************
 *
 * SSR(Server Side Render) Middleware
 *
 * 用于服务端渲染
 *
 * *****************************************************************************
 */ 

import path from "node:path";
import util from "node:util";

import { templateHtml } from "../../utils/index.mts";

const debug = util.debuglog("debug:middleware-ssr");

interface ssrOptions {
  app: string;
  template: string;
}

export function ssr (options: ssrOptions) {
  let error;
  const template = options.template || "";
  const appModule = import(options.app).then(m => m.default).catch(e => { error = e; });

  return async function koaSSR (ctx, next) {

    // 旁路规则
    // 1. with body content
    if (ctx.body !== undefined) return next();
    // 2. with extension 
    // if (/\.\w+$/.test(ctx.pathname)) return; // 正则匹配
    if (path.extname(ctx.pathname) != "") return next();

    const initialState = {
      location: { pathname: ctx.pathname },
    };

    const app = await appModule;
    const appstring = error ? "SERVER ERROR" : app(initialState);

    const data = {
      title: "HOME",
      root: appstring,
    };

    if (error && ctx.app.env === "development") {
      data.error = `<div class="alert alert-warning stick-top" role="alert">
        <h4 class="alert-heading">Frontend APP ERROR</h4>
        <hr/>
        <div>${error}</div>
      <div>`;
    }

    ctx.body = templateHtml(String(template), data);

    return next();
  };
}
