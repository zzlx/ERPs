/**
 *
 *
 *
 */

import { isPlainObject } from "./index.mts";
import { warning } from "./warning.mts";

export function verifyPlainObject(value, displayName, methodName) {
  if (!isPlainObject(value)) {
    warning(`${methodName}() in ${displayName} must return a plain object. Instead received ${value}.`);
  }
}
