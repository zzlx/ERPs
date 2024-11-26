/**
 * *****************************************************************************
 *
 * 监控目录
 *
 * @todos:
 * 将监控目录的代码单独存放
 * 独立进程监控代码库改动，重启服务时使用热加载并保持原进程ID
 *
 * *****************************************************************************
 */

import crypto from "node:crypto";
import EventEmitter from "node:events";
import fs from "node:fs";
import { readdir } from "../utils.node/readdir.mts";

export class PathWatcher extends EventEmitter {
  constructor (props) {
    super();
    this.paths = props.paths;
    this.cache = new Map();
    this.watchmode = false;

    this.on("complete", () => {
      setTimeout(() => {
        this.detect();
      }, 1500);
    });

    this.detect();
  }

  /**
   * have a detect
   *
   */

  async detect () {
    const files = await readdir(this.paths);

    for (const file of files) {
      if (/~+$/.test(file)) continue;

      try {
        const content = fs.readFileSync(file, "utf8");
        const sha1 = crypto.createHash("sha1").update(content).digest("hex");

        if (this.cache.has(file) && this.cache.get(file) !== sha1) {
          this.emit("change", file);
          this.cache.set(file, sha1);
          break;
        }

        this.cache.set(file, sha1); // 存储文件哈希值
        
      } catch (error) {
        // debug("读取文件出错", error);
        // 读取文件出错时，时触发change事件
        // 如果文件被删除，删除file健
        this.cache.delete(file);
        this.emit("change", file);
        break;
      }

    }

    this.emit("complete"); // 通知检测完成事件
  }
}
