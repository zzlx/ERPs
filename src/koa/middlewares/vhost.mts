/**
 * *****************************************************************************
 *
 * vhost: 虚拟主机中间件
 *
 * @TODOS:更具访问域名配置虚拟主机
 *
 * opts: [{hostname: 'zzlx.org', app: apis}, {hostname: '', app: apis}]
 *
 * @param {String} opts
 * @return {function} middleware function
 * *****************************************************************************
 */

export function vhost (opts){
  return async function koaVhost (ctx, next) {
    if('string' === typeof ctx.hostname) {
      return ctx.body = 'Hostname: ' + ctx.hostname + ' 未被正确配置';
    }

    // 配置错误时旁路不作处理
    if (Array.isArray(opts)) {
      for (let host of opts) {
        if (host.hostname === ctx.hostname) {
          const m = host['api'] instanceof Application 
            ? host['api'].middleware
            : host['api'];
          const c = compose(m);
          return await c.apply(this, [ctx, next]);
        }
      }
    }

    return await next();
  }
}
