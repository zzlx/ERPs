/**
 * *****************************************************************************
 *
 * Respond to the client side.
 *
 * *****************************************************************************
 */

import util from "node:util";
import { HTTP_STATUS_EMPTY_CODES, HTTP_STATUS } from "./http_status.mts";

const debug = util.debuglog("debug:respond");

export function respond (ctx) {
  if (ctx.respond === false) return ctx.stream.end(); // allow bypassing respond

  if (ctx.app.env === "development" && !ctx.state.get("innerest_middleware")) { 
    debug("check middleware stack with url:", ctx.url);
  }

  if (!ctx.status || ctx.status == HTTP_STATUS.NOT_FOUND) {


    const allowed = {}; // 

    if (ctx.matched) {
      for (const route of ctx.matched) {
        if (!route.methods) continue;
        for (const method of route.methods) allowed[method] = method;
      }
    }

    const allowedArr = Object.keys(allowed);

    if (ctx.router && ctx.router.methods.indexOf(ctx.method) === -1) {
      ctx.status = HTTP_STATUS.NOT_IMPLEMENTED;
      ctx.set("Allow", ctx.router.methods.join(", "));
    } else if (ctx.method === "OPTIONS") {
      if (allowedArr.length) {
        ctx.status = HTTP_STATUS.OK;
        ctx.set("Allow", allowedArr.join(", "));
      } else {
        ctx.status = HTTP_STATUS.NOT_IMPLEMENTED;
      }

      ctx.body = "";
    } else if (!allowed[ctx.method]) {
      ctx.status = HTTP_STATUS.METHOD_NOT_ALLOWED;
      ctx.set("Allow", allowedArr.join(", "));
    }
  }

  if (!ctx.status && ctx.body == null) {
    ctx.status = 404;
    ctx.body = "404 Error: Page Not Found.";
  }

  // response headers
  if (ctx.headersSent === false) {
    try {
      ctx.stream.respond(ctx.response.headers, {
        endStream: HTTP_STATUS_EMPTY_CODES.includes(ctx.status) ? true : false, 
        waitForTrailers: false, 
      });
    } catch (e) {
      ctx.body = "Internal Server Error: header respond error";
    }
  }

  // respond contents and end stream
  if ("HEAD" === ctx.method)  return ctx.end(); // head method

  if (ctx.writable === false) return ctx.end(); // can not writable

  if (Buffer.isBuffer(ctx.body)) return ctx.end(ctx.body); // buffer res

  if (typeof ctx.body === "string") return ctx.end(ctx.body); // string

  if (ctx.body && typeof ctx.body.pipe === "function") { // stream
    return ctx.body.pipe(ctx.stream);
  }

  return ctx.end(); // End the respond stream
}
