/**
 * *****************************************************************************
 *
 * 构建前端应用程序
 *
 * 使用esbuild构建前端
 *
 * *****************************************************************************
 */

import esbuild from "esbuild"; // third-party app 
import util from "node:util";

import { indexHtml } from "./plugins/indexHtml.mts";
import { copyJS } from "./plugins/copyJS.mts";
import { metaInfo } from "./plugins/meta-info.mts";
import { paths } from "../settings/index.mts";

const debug = util.debuglog("debug:ui-builder");
if (import.meta.filename === process.argv[1]) main();

/**
 *
 *
 */

export function main() {
  const options = getOptions();
  return esbuild.build(options).catch(debug);
}

/**
 * esbuild option settings
 */

export function getOptions () {
  // compiler options
  const options = {
    define: {
      "process.env": JSON.stringify({
        NODE_ENV: process.env.NODE_ENV || "production",
        NODE_DEBUG: process.env.NODE_DEBUG || "",
      }),
    },
    // inject: [ "./injects/process-shim.mts" ],
    platform: "neutral", // node\browser\neutral
    bundle: true, // 默认情况不会打包
    format: "esm", // iife\cjs\esm 
    target: "es2020", // es2020\es2016\es2017\es2018\es2019\es2020\esnext
    splitting: true, // 代码分割
    treeShaking: true, // tree shaking 
    charset: "utf8",
    mainFields: ["module", "main"],
    outExtension: { ".js": ".mjs" },
    // resolveExtensions: [ ".js", ".mts", ".jsx", ".ts", ".tsx" ],
    legalComments: "eof",
    logLevel: "error",
    metafile: true,
    preserveSymlinks: true,
    write: true,
    loader: {
      ".html": "file",
      ".md": "file",
      ".png": "dataurl",
      ".svg": "text",
    },
    plugins: [
      indexHtml,
      copyJS,
      metaInfo,
    ],
  };

  options.chunkNames = "assets/es/[name]-[hash]";
  options.assetNames = "assets/[ext]/[name]-[hash]";
  options.entryNames = "assets/es/[name]";

  options.entryPoints = {
    index: "src/uios/index.mts",
    // app: "src/apps/ReactApp.mts",
    // react: "node_modules/react/index.js",
    // "react-dom": "node_modules/react-dom/index.js", 
    // "scheduler": "node_modules/scheduler/index.js",
    //
  };

  options.external = [
    "lodash",
    // "react",
    // "react-dom",
    // "scheduler",
  ];

  options.absWorkingDir = paths.ROOT;
  options.outbase = paths.SRC; //
  options.outdir = paths.PUBLIC_HTML;
  // options.header = { "js": "// 使用esbuild工具打包" };
  // options.sourceRoot = "https://raw.githubusercontent.com/some/repo/v1.2.3/";
  // options.publicPath = "https://";

  if (process.env.NODE_ENV === "development") {
    options.sourcemap = true;
    options.minify = false;
  }

  if (process.env.NODE_ENV === "production") {
    options.sourcemap = false;
    options.minify = true;
    options.pure = [ "console.log" ];
  }

  return options;
}
