/**
 * *****************************************************************************
 *
 * 判断是否为数字
 *
 * *****************************************************************************
 */

export function isPlainObject (obj): boolean {
  if (typeof obj !== "object" || obj === null) return false;

  let proto = Object.getPrototypeOf(obj);
  if (proto === null) return true;

  let baseProto = proto;

  while (Object.getPrototypeOf(baseProto) !== null) {
    baseProto = Object.getPrototypeOf(baseProto);
  }

  return proto === baseProto;
}

