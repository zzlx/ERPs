/**
 * *****************************************************************************
 *
 * package.json文件管理器
 *
 * *****************************************************************************
 */

import fs from 'node:fs/promises';
import { paths } from './paths.mts';

const package_json = await fs.readFile(paths.PACKAGE)
  .then(c => JSON.parse(c))
  .catch(() => { return {}; });

export const packageInfo = new Proxy(package_json, {
  get: function (target, property, receiver) {
    return Reflect.get(target, property, receiver);
  },
  set: function (target, property, value) {
    target[property] = value;

    fs.writeFile(paths.PACKAGE, JSON.stringify(target, null, 2)).catch(e => {
      // write package.json file failure
      console.error(e);
    });

    return true;
  }
});
