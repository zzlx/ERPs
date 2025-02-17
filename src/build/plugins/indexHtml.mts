/**
 * *****************************************************************************
 *
 * 打包前端
 *
 * *****************************************************************************
 */

import fs from "node:fs/promises";
import path from "node:path";
import util from "node:util";
import { settings } from "../../settings/index.mts";
import { templateHtml } from "../../utils/index.mts";

const debug = util.debuglog("debug:esbuild-html-plugin");

export const indexHtml = {
  name: "html-plugin",
  setup: setup,
};

function setup (build) {
  build.onEnd(async () => {
    const public_html = build.initialOptions.outdir;

    const htmlTemplateString = await settings.template("index.html");
    const html = templateHtml(String(htmlTemplateString), {
      title: "首页|HOME",
      styles: "/assets/css/styles.css",
      app: "/assets/es/index.mts",
    });

    const index_html = path.join(public_html, "index.html"); 

    fs.writeFile(index_html, html).catch(debug);
  });
}
