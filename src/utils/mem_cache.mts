/**
 * *****************************************************************************
 *
 * 内存缓存存储器
 *
 * *****************************************************************************
 */

export const mem_cache = () => new MemCache();

export class MemCache {
  constructor () {
    this.cache = new Map(); // Map or Set

    this.proxy = new Proxy(this, {
      get: function (target, property) {
        if (property === "get") {
          return key => target.cache.get(key);
        }

        if (property === "set") {
          return (key, value) => target.cache.set(key, value);
        }

        if (property === "has") {
          return key => target.cache.has(key);
        }

        if (property === "delete") {
          return key => target.cache.delete(key);
        }

        return Reflect.get(target, property, receiver);
      },
    });
  }
}

MemCache.prototype.keys = function () {
  const cacheKeys = new Set();
  const now = Date.now();
  const checkEntry = function () {
    const key = entry[0];
    const item = entry[1];
    if (entry[1].value && (!entry[1].expired) || item.expired >= now) {
      cacheKeys.add(key);
    }

  };

  for (const entry of this.cache.entries()) checkEntry(entry);

  return Array.from(cacheKeys.keys());
}


