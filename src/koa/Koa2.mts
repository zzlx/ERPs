/**
 * *****************************************************************************
 *
 * KOA2 Applications
 *
 * 支持http2的koa服务端程序,
 * > HTTP2 
 * > [RFC7540](https://datatracker.ietf.org/doc/html/rfc7540)
 * 基于[KOA](https://koajs.com)框架修改，支持http2、socket等网络通讯技术.
 *
 * 中间件逻辑实现AOP(Aspect Oriented Programming)
 *
 * *****************************************************************************
 */

import { AsyncLocalStorage } from "node:async_hooks";
import assert from "node:assert";
import http from "node:http";
import EventEmitter from "node:events"; 
import util from "node:util";

import { Context } from "./Context.mts";
import { compose } from "./compose.mts";
import { respond } from "./respond.mts";
const debug = util.debuglog("debug:Koa2");

export class Koa2 extends EventEmitter {
  constructor(options) {
    super();

    this.env = options.env || process.env.NODE_ENV || "production";
    if (options.keys) this.keys = options.keys;
    this.proxy = options.proxy || false; // proxy setting
    this.subdomainOffset = options.subdomainOffset || 2;
    this.proxyIpHeader = options.proxyIpHeader || "X-Forwarded-For";
    this.maxIpsCount = options.maxIpsCount || 0;
    this.protocol = options.protocol || "https";
    this.middlewares = []; // record middlewares be added
    this.silent = options.silent;

    if (options.asyncLocalStorage) {
      this.ctxStorage = new AsyncLocalStorage();
    }
  }

  /**
   * Shorthand for:
   * http.createServer(app.callback()).listen(...)
   *
   * @param {Mixed} ...
   * @return {Server}
   * @api public
   */

  listen(...args) {
    const server = http.createServer(this.callback());
    return server.listen(...args);
  }

  /**
   *
   */

  callback () {
    const fn = compose(this.middlewares);

    // 如果未配置error则配置系统默认的error处理程序
    if (!this.listenerCount("error")) {
      this.on("error", (err, ctx) => { 
        if (err) {
          if (err.status === 404 && err.expose) {
            if (ctx) ctx.respond.body = err;
          } 

        }
      });
    }

    return (stream, headers, flags) => {
      // finish event
      stream.on("finish", () => {
        // debug("stream finished");
      });

      stream.on("error", err => {
        debug("stream error:", err);
      });

      const ctx = new Context();

      ctx.request.headers = headers;
      ctx.stream = stream;
      ctx.flags = flags;
      ctx.app = this;

      return this.handleRequest(ctx, fn);
    };
  }

  /**
   * Handle request
   */

  handleRequest (ctx, fnMiddleware) {

    return fnMiddleware(ctx).then(() => respond(ctx)).catch(err => {
      debug(err);
      ctx.onerror(err);
      respond(ctx);
    });
  }

  /**
   * Use the given middleware "fn"
   *
   * @param {Function} fn
   * @retrun {Application} self
   * @api public
   */

  use (fn) {
    assert(typeof fn === "function", "Middleware must be a function!");
    // debug("koa-middleware %s is added.", fn._name || fn.name || "-");
    this.middlewares.push(fn);
    return this;
  }
}

export default Koa2;
