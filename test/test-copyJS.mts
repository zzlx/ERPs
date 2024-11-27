/**
 * *****************************************************************************
 *
 * 拷贝js文件放入
 *
 * @todo: 放入API,重新拷贝js文件由后台管理端进行管理
 *
 * *****************************************************************************
 */

import fs from "fs";
import path from "path";
import zlib from "zlib";
import { mkdir, writeFile, cp } from "node:fs/promises"
import { paths } from '../settings/paths.mts';

copyJS(paths.PUBLIC_HTML);

export function copyJS (dest) {
  const files = [
    path.join(paths.NODE_MODULES, "react", "cjs", "react.development.js"),
    path.join(paths.NODE_MODULES, "react", "cjs", "react.production.js"),
    path.join(paths.NODE_MODULES, "react-dom", "cjs", "react-dom.development.js"),
    path.join(paths.NODE_MODULES, "react-dom", "cjs", "react-dom.production.js"),
  ];

  return Promise.all(files.map(file => {

    if (!fs.existsSync(file)) throw new Error(`${file} is not exist!`);

    const destFile = path.join(dest, 'assets', "js", path.basename(file));

    // 拷贝较新的版本
    if (!fs.existsSync(destFile) ||
      (fs.existsSync(destFile) && fs.statSync(destFile).mtime < fs.statSync(file).mtime)) {
      copyFile(file, destFile, true);
    }
  })).catch(console.error);

}

export function copyFile (src, dest, compress = false) {
  const destPath = path.dirname(dest);
  return mkdir(destPath, { recursive: true }).then(() =>
    cp(src, dest, { preserveTimestamps: true }).then(() =>
      compress && compressFile(dest)
    )
  );
}

export function compressFile (file) {
  return writeFile(
    file + ".br",
    zlib.brotliCompressSync(fs.readFileSync(file))
  );
}
