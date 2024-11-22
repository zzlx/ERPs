/**
 * *****************************************************************************
 *
 * ERP daemon server.
 *
 * *****************************************************************************
 */

import cp from "node:child_process";
import path from "node:path";
import util from "node:util";

import { debounce, flattenArray } from "../utils/index.mts";
import { exec } from "./utils/index.mts";
import { paths } from "../settings/paths.mts";
import { PathWatcher } from "./PathWatcher.mts";

const debug = util.debuglog("debug:erpd");

const is_main_process = import.meta.filename === process.argv[1];
if (is_main_process) { main(); }

/**
 * running in individual process
 */

export function main() {
  debug(`@todos:
    1. 监控httpd状态,掉线时重启服务
    2. vim编辑触发pathwatch事件
  `);

  if (is_main_process) { 
    process.title = "org.zzlx.erpd"; // set process title
  } else {

  }

  // backend(...arguments);

  if (process.env.NODE_ENV === "development") {
    pathWatcher(paths.SRC);
  }

}

/**
 *
 * 目录监控程序
 */

export function pathWatcher () {
  const paths = flattenArray(Array.prototype.slice.call(arguments));
  if (paths.length === 0) paths.push(process.cwd());
  debug("watch paths:", paths);

  const pw = new PathWatcher({paths});

  pw.on("change", changeAction());
}

/**
 *
 */

function handleFileChange (f) {
  debug("file: %s was be modified", f);

  if (/\.mjs|\.mts|\.jsx$/.test(f)) {
    import("./build/buildUI.mts").then(m => m.main())
      .then(() => restartHttpd())
      .then(() => eslint(f));
  } else if (/\.scss$/.test(f)) {
    import("./build/buidScss.mts").then(m => m.main());
  } else if (/\.mts$/.test(f)) {
    exec(`tsc --noEmit ${f}`).then(debug).catch(debug);
  } else {
    debug("file:%s is changed.", f);
  }

}

/**
 * 检测到文件改动时执行的程序
 */

function changeAction () {
  debug("changeAction");
  return debounce(handleFileChange, 800);
}

/**
 * Print eslint message
 */

function eslint (file) {
  debug("@todos:传给浏览器控制台打印输出");
  return exec(`eslint ${file}`).then(debug).catch(debug);
}

/**
 *
 */

function restartHttpd () {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === "development") {
      cp.exec(
        "lsof -i:8888 | grep 'LISTEN' | awk '{print $2}' |xargs kill -9", 
        (error, stdout, stderr) => {
          if (error) reject(error);
          if (stdout === "") httpd("--start");
          if (stderr) debug(stderr);
          resolve();
        },
      );
    }
  });
}

/**
 *
 *
 */

function httpd (command) {
  import("./httpd/httpd.mts").then(m => m.main(command));
}
