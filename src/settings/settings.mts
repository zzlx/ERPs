/**
 * *****************************************************************************
 *
 * environment settings management
 *
 * *****************************************************************************
 */

// import assert from "node:assert";
import cp from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import util from "node:util";
import { git } from "./git.mts";
import { paths } from "./paths.mts";
import { packageInfo } from "./packageInfo.mts";
import * as constants from "./constants.mts";
import { 
  getchar, exec, exists, 
  generatePrivateKey, 
  generateCSR,
  generateCert,
} from "../backends/utils/index.mts";
import { debounce } from "../utils/index.mts";

const debug = util.debuglog("debug:settings");

// 检测用户配置文件是否存在
if (!paths.DOT_CONFIG) {
  paths.DOT_CONFIG = process.env.NODE_ENV === "development"
    ? path.join(paths.ROOT, ".config")
    : path.join(os.homedir(), ".config", "erps");
}

if (!paths.NODE_MODULES) {
  debug("项目依赖未安装,请先执行npm install");
}

const user_settings_file = path.join(paths.DOT_CONFIG, "erps-config.json");
const user_settings = await fs.readFile(user_settings_file)
  .then(contents => JSON.parse(contents))
  .catch(() => { return {}; });
const writeFile = debounce(data => { 
  fs.writeFile(user_settings_file, data).catch(e => debug(e));
}, 5); // 5ms interval

const handler = {
  get: function (target, property, receiver) {

    if (property === "pg") return receiver.postgresql;
    if (property === "package") return packageInfo;
    if (property === "git") return git;
    if (property === "IPv6") return isSupportIPv6();
    if (property === "constants") return constants;
    if (property === "paths") return paths;

    if (property === "template") {
      return file => fs.readFile(path.join(paths.SRC, "templates", file));
    }

    return Reflect.get(target, property, receiver);
  },
  set: function (target, property, value) {
    target[property] = value;

    const str = JSON.stringify(target, null, 2) + os.EOL;
    const data = new Uint8Array(Buffer.from(str));

    writeFile(data);

    return true;
  },
};

export const settings = new Proxy(user_settings, handler);

// traps 拦截器
// const interceptors = { };

export const settingsTest = new Proxy(new Map(), {
  get: function (target, property, receiver) {
    return Reflect.get(target, property, receiver);
  },

});

// debug(settings);
// detect user settings
if (!settings.host) settings.host = process.env.HOST || "::";
if (!settings.port) settings.port = parseInt(process.env.PORT, 10) || 8888;
if (!settings.passphrase) settings.passphrase = Math.random().toString(16).substr(2,8);
if (!settings.privateKey) settings.privateKey = path.join(paths.DOT_CONFIG, "erps-key.pem");
if (!settings.cert) settings.cert = path.join(paths.DOT_CONFIG, "erps-cert.pem");

if (!settings.database) {
  process.stdout.write("postgresql数据库配置:\n");

  const db = {
    PGHOST: "",
    PGPORT: "",
    PGUSER: "",
    PGPASSWORD: "",
    PGDATABASE: "",
  };

  for (const item of Object.keys(db)) {
    process.stdout.write(item + ":");
    const answer = await getchar(); 
    db[item] = answer;
  }

  settings.database = db;
}

// 数据库配置读入process.env
for (const key of Object.keys(settings.database)) {
  process.env[key] = settings.database[key];
}

// detect key file, generate it if not exists.
if (!(await exists(settings.privateKey))) {
  generatePrivateKey(settings.privateKey);
}

// detect cert file
await fs.access(settings.cert, fs.constants.R_OK).catch(async function () {
  // detect csr file
  if (!settings.csr) settings.csr = path.join(paths.DOT_CONFIG, "erps-csr.pem");
  if (!(await exists(settings.csr))) {
    await generateCSR(settings.privateKey, settings.csr);
  }

  await generateCert(settings.privateKey, settings.csr, settings.cert);
});

/**
 * *****************************************************************************
 * 以下为函数定义
 * *****************************************************************************
 */

/**
 * 判断系统是否支持IPv6
 */

function isSupportIPv6 () {
  let hasIPv6 = false;

  for (const networkInterface of Object.values(os.networkInterfaces())) {
    for (const network of networkInterface) {
      if (network.family === "IPv6") { 
        hasIPv6 = true; 
        break; 
      }
    }

    if (hasIPv6) break;
  }

  return hasIPv6;
}

/**
 * 检测是否配置systemd service
 */

export async function isSupportSystemd (service) {
  [
    "/usr/lib/systemd/system",
    "/etc/systemd/system/multi-user.target.wants",
  ].map(loc => fs.existsSync(path.join(loc, service)));
}

/**
 *
 *
 */

export function isInGitRepository() {
  try {
    cp.execSync("git rev-parse --is-inside-work-tree", { stdio: "ignore" });
    return true;
  } catch (e) {
    return false;
  }
}
