/**
 * *****************************************************************************
 *
 * readdir
 *
 * 算法:循环读取目录,返回路径列表
 *
 * *****************************************************************************
 */

import fs from "node:fs/promises";
import path from "node:path";
import { flattenArray } from "../utils/index.mts";

export async function readdir (_root) {

  if (Array.isArray(_root)) {
    return Promise.all(_root.map(readdir)).then(flattenArray);
  }

  return fs.readdir(_root, { withFileTypes: true }).then(paths => {
    const newPaths = [];

    for (const p of paths) {
      if (p.isFile()) { newPaths.push(p); continue; } 
      if (p.isDirectory()) {
        const pathURI = path.join(p.parentPath, p.name);
        newPaths.push(readdir(pathURI));
      }
    }

    return Promise.all(newPaths);
  }).then(flattenArray)
    .then(paths => paths.map(p => p.name ? path.join(p.parentPath, p.name) : p));
}
