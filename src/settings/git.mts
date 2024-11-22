/**
 * *****************************************************************************
 *
 * git配置管理器
 *
 * *****************************************************************************
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { paths } from './paths.mts';

const isGitReperatory = await fs.access(paths.DOT_GIT).then(() => true);
fs.readFile(path.join(paths.DOT_GIT, "HEAD")).then(c => {
  String(c).split(":")[1].trim()
});

export const git = new Proxy({ }, {
  get: function (target, property, receiver) {
    if (property === "head") {
      target["HEAD"] = head();
    }
    
    if (property === "branch") return path.basename(head());
    return Reflect.get(target, property, receiver);
  },
  set: function (target, property, value) {
  }
});
