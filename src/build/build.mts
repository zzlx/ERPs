/**
 * *****************************************************************************
 *
 * 前端资源构建
 * 
 * 前端应用程序\样式表
 *
 * *****************************************************************************
 */

import util from "node:util";
import { main as build_ui } from "./buildUI.mts";
import { main as build_css } from "./buildScss.mts";

const debug = util.debuglog("debug:build");
if (import.meta.filename === process.argv[1]) main();

export function main (command) {
  debug("receive command:", command);

  switch (command) {
    case "ui":
      build_ui();
      break;
    case "css":
      build_css();
      break;
    default:
      build_css().then(() => build_ui());
      break;
  }
}
