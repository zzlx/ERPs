/**
 * *****************************************************************************
 *
 * is absolute path
 *
 * @param {string} path
 * @return {boolean} 
 * *****************************************************************************
 */

import { isURLPath } from './isURLPath.mts';
import { isPathSeparator } from './isPathSeparator.mts';
import { isWindowsDeviceRoot } from './isWindowsDeviceRoot.mts';

export function isAbsolute(path) {
  if (path.length === 0) return false;
  if (isURLPath(path)) return true;

  const code = path.charCodeAt(0);

  return isPathSeparator(code) ||
    (path.length > 2 &&
      isWindowsDeviceRoot(code) &&
      path.charCodeAt(1) === CHAR_COLON &&
      isPathSeparator(path.charCodeAt(2)));
}

