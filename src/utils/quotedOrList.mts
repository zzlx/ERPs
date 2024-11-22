/**
 * Given [ A, B, C ] return '"A", "B", or "C"'.
 */

import { orList } from './orList.mts';

export function quotedOrList(items) {
  return orList(items.map(item => "\"".concat(item, "\"")));
}
