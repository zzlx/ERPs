/**
 * *****************************************************************************
 *
 * X-response middleware
 *
 * * 记录中间件处理请求的响应时间
 * * 显示服务信息
 *
 * @param {string|object} format
 * @return {function} middleware
 * @api public
 * *****************************************************************************
 */

export const xResponse = () => async function koaXResponse (ctx, next)  {
  let timer= process.hrtime(); // use process.uptime can be efficient
  // const start = Date.now();

  await next();

  timer = process.hrtime(timer); // hrtime is an array like [s, ns]
  const interval = Math.round(timer[0] * 1000 + timer[1] / 1000000); // count micro secont time 
  // const ms = Date.now() - start;
  // const platform = `${opts.system.platform}_${opts.system.arch}`;
  const nodejs = `Node.js@${process.version}`; 
  // const git = `${gitINFO.branch}:${gitINFO.commit.substr(0,6)}`;
  // const appInfo = `${opts.appName}@v${opts.appVersion}/${git}`;

  ctx.set({ 
    "X-Response-Time": `${interval}ms`,
    "X-Powered-By": `${nodejs}`,
    "X-Environment": ctx.app.env,
  });
};
