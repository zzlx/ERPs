/**
 * *****************************************************************************
 *
 *
 * *****************************************************************************
 */

import fs from "node:fs/promises";
import path from "node:path";
import util from "node:util";

const debug = util.debuglog("debug:esbuild-copyJS-plugin");

export const copyJS = {
  name: "coyp-js-plugin",
  setup: setup,
};

/**
 *
 *
 */

function setup (build) {
  build.onEnd(() => {

    const options = build.initialOptions;
    const src = path.join(options.absWorkingDir, "src", "templates", "noModule.js");
    const des = path.join(options.outdir, "assets", "js", "noModule.js"); 
    
    fs.cp(src, des).catch(debug);
  });
}
