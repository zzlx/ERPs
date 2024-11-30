/**
 * *****************************************************************************
 *
 * The frontend application entrypoint.
 *
 * 以查询字符串方式配置执行环境:
 *
 * * index.mts
 * * index.mts?env=development
 *
 * *****************************************************************************
 */

"use strict";

// setting the client-side environment
const env = new URL(import.meta.url).searchParams.get("env");
process.env.NODE_ENV = env ? env : "production";

// Browser environment
if (globalThis.window && globalThis.location) {
  import("./browser-client.mts").then(m => m.default());
}

// Native environment
if (false) {
  import("./native-client.mts").then(m => m.default());
}
