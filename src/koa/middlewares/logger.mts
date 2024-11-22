/**
 * *****************************************************************************
 *
 * 构造日志对象并存储访问请求的状态
 *
 * *****************************************************************************
 */

export function logger () {

  return async function koaLogger (ctx, next) {
    const log = {
      "atimeMs": Date.now(),
      "c-address": ctx.socket.remoteAddress,
      "c-port": ctx.socket.remotePort,
      "user-agent": ctx.get("user-agent"),
      "method": ctx.method,
      "href": ctx.href,
      "referer": ctx.get("referer"),
      "s-address": ctx.socket.localAddress,
      "s-port": ctx.socket.localPort,
      "s-pid": process.pid,
    };

    await next();

    log["status"] = ctx.status;
    log["rt"] =  ctx.get("x-response-time");

    // 记录访问日志
    // log.child(request_log).TRACE("Http request log");
  };
}
