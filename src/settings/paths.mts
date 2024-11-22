/**
 * *****************************************************************************
 *
 * system paths settings
 * 
 * *****************************************************************************
 */

import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import util from "node:util";

const debug = util.debuglog("debug:paths");
const __root = await find_root_dir(import.meta.dirname);

export const paths = new Proxy(await readPath(__root), {
  get: function (target, property, receiver) {
    if (property === "ROOT" || property === "root") return __root;
    if (property === "TMP_DIR" || property === "tmpdir") return os.tmpdir();
    return Reflect.get(target, property, receiver);
  },
  set: function (target, property, value) {
    if (target[property]) return true;
    if (typeof value !== "string") return false;

    target[property] = value;

    fs.mkdir(value, { recursive: true }).catch(e => {
      if (e.code === "EEXIST") {
        debug("directory:", value, "is exists.");
      } else {
        debug(e);
      }
    });

    return true;
  },
}); 

/**
 * Read paths from a given direction.
 */

async function readPath(dir) {
  const paths = Object.create(null);
  const dirs = await fs.readdir(dir, { withFileTypes: true });

  for (const p of dirs) {
    const name = String(p.name).toUpperCase()
      .replace(/^(\.)/, "DOT_")
      .replace(/(\..+)$/, "")
      // .replace(/(\.|-|_)\w/g, m => m.toUpperCase())
      .replace(/[-|\\.]/g, "_");

    Object.defineProperty(paths, name, { 
      value: path.join(dir, p.name),
      writable: false,
      enumerable: process.env.NODE_ENV !== "production",
      configurable: false,
    });
  }

  return paths;
}

/**
 * 读取package.json定位最近的根目录
 */

export async function find_root_dir (dir) {
  const pkg_file = path.join(dir, "package.json");
  const isExist = await fs.access(pkg_file, fs.constants.R_OK)
    .then(() => true).catch(() => false);

  if (isExist) {
    return dir
  } else {
    return find_root_dir(path.dirname(dir));
  }
}
