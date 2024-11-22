/**
 * *****************************************************************************
 *
 *
 * *****************************************************************************
 */

import fs from "node:fs/promises";
import path from "node:path";
import esbuild from "esbuild";
import { paths } from "../../../settings/index.mts";

export const metaInfo = {
  name: "meta-info-plugin",
  setup: setup,
};

function setup (build) {
  build.onEnd((result) => {
      const metafile = path.join(paths.PUBLIC_HTML, "assets", "meta.txt");

    if (result && result.metafile) {
      const text = 
      esbuild.analyzeMetafile(result.metafile, { 
        verbose: true,
      }).then(text => {
        fs.writeFile(metafile, text);
      });
    }
  });
}
