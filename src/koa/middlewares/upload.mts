/**
 * *****************************************************************************
 *
 * Upload 管理器
 *
 * *****************************************************************************
 */

import fs from "node:fs";

export function upload (opts){
  return async function upload(ctx, next) {
    // bypass non POST method
    if ("POST" != ctx.method) return await next();

    const file = ctx.request.files.file;
    const reader = fs.createReadStream(file.path);
    const stream = fs.createWriteStream(path.join(os.tmpdir(), Math.randowm().toString()));
    reader.pipe(stream);
    ctx.redirect("/");
  }
}
