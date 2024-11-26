/**
 * *****************************************************************************
 *
 *
 * *****************************************************************************
 */

import fs from "node:fs";
import path from "node:path";
import util from "node:util";
import zlib from "node:zlib";
import * as sass from "sass";
import { readdir } from "../utils.node/index.mts";
import { paths } from "../settings/index.mts";

const debug = util.debuglog("debug:scssBuilder");
if (import.meta.filename === process.argv[1]) main();

/**
 *
 */

export function main() {
  const cssFile = path.join(paths.PUBLIC_HTML, "assets", "css", "styles.css");
  const scssFile = path.join(paths.SRC, "styles", "main.scss");
  return scssRender(cssFile, scssFile).catch(debug);
}


/**
 * 生成样式文件
 */

export async function scssRender (cssFile, scssFile) {
  // 比对cssFile与scssFile所在目录所有文件时间戳
  // 决定是否需要执行CSS文件渲染程序
 
  const cssStat = await fs.promises.stat(cssFile).catch(debug);
  const files = await readdir(path.dirname(scssFile));
  let reRender = !cssStat;

  if (reRender === false) {
    for (const file of files) {
      if (fs.statSync(file).mtime > cssStat.mtime) {
        reRender = true;
        break;
      }
    }
  }

  reRender && render(scssFile).then(css => {
    if (!css) return;
    fs.mkdirSync(path.dirname(cssFile), { recursive: true });

    return Promise.all([
      fs.promises.writeFile(cssFile, css),
      fs.promises.writeFile(cssFile + ".gz", zlib.gzipSync(css)),
      fs.promises.writeFile(cssFile + ".br", zlib.brotliCompressSync(css)),
      fs.promises.writeFile(cssFile + ".deflate", zlib.deflateSync(css)),
    ]).catch(debug);
  }).catch(debug);
}

/**
 * Scss编译生成CSS
 *
 * 用于从src/scss目录生成css文件
 *
 * [参考文档](../node_modules/sass/README.md)
 * [node-sass](https://github.com/sass/node-sass)
 */

export async function render (scssFile) {
  const format = process.env.NODE_ENV === "development" ? "expanded" : "compressed";

  return new Promise((resolve, reject) => {
    try {
      sass.render({ file: scssFile, outputStyle: format }, (err, result) => {
        if (err) debug(err);
        if (result) return resolve(result.css);
      });
    } catch (e) {
      reject(e);
    }
  });
}
