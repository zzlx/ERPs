/**
 * *****************************************************************************
 *
 * Body middleware
 *
 * *****************************************************************************
 */

export function body (options) {
  const opts = Object.assign({}, {
    jsonLimit: "1kb"
  }, options);

  return function koaBody (ctx, next) {
    Object.defineProperty(ctx, "requestBody", {
      get: function () {
        if (this[_request_body] == null) {
          this[_request_body] = readBody(ctx);
        }

        return this[_request_body];
      }
    });

    return next();
  } 
} 

function readBody (ctx) {
  return new Promise((resolve, reject) => {
    if (!ctx.stream.readable) {
      ctx.throw("no readable stream.");
      reject();
    }

    ctx.stream.setEncoding("utf8");
    let data = "";

    for (const chunk of ctx.stream) {
      data += chunk;
    }

    resolve(data);
  });
}
