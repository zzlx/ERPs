/**
 * *****************************************************************************
 *
 * SRS 静态资源服务
 *
 * SRS(Static resource service), 用于托管静态文件.
 *
 * ## 功能特性 
 *
 * * 支持内容协商: 静态资源压缩版本选择
 * * 支持服务缓存策略: ETag响应等
 * * 仅支持GET、HEAD两种请求方法
 *
 * @param {string} root, The root directory from which to serve static assets.
 * @param {object} options
 * @return {function} middleware
 *
 * *****************************************************************************
 */ 

import path from "node:path";
import util from "node:util";
import { send } from "../send.mts";

const debug = util.debuglog("debug:middleware-srs");

export function srs (dir = "public_html", options = {}) {

  const opts = Object.assign({
    dir: path.resolve(dir),
    prefix: "",
  }, options);

  return async function koaSRS (ctx, next) {
    if (ctx.method !== "GET" && ctx.method !== "HEAD") {
      debug("旁路规则1: 静态资源仅接受GET、HEAD请求方法");
      return next();
    }
    
    if (ctx.body != null || (ctx.status && ctx.status != 404)) {
      debug("旁路规则2: body非空时进行旁路");
      return next();
    }

    if (ctx.pathname.substr(0, opts.prefix.length) !== opts.prefix) {
      debug("旁路规则3: 前缀不匹配时");
      return next();
    }

    /*
    if (path.extname(ctx.pathname) === "") {
      debug("旁路规则4: 无后缀时,应能支持目录输出");
      return next();
    }
    */
    
    try {
      await send(ctx, ctx.pathname, opts);
      // ctx.send();
    } catch (err) {
      ctx.throw(err);
    }

    return next();
  };
}
