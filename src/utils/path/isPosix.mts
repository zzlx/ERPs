/**
 *
 *
 */

import { isWindowsDeviceRoot } from './isWindowsDeviceRoot.mts';
import { isPathSeparator } from './isPathSeparator.mts';

export function isPosix (path) {
  const firstCode = path.charCodeAt(0);
  return (isWindowsDeviceRoot(path.charCodeAt(0)) &&
          path.charCodeAt(1) === CHAR_COLON &&
          isPathSeparator(path.charCodeAt(2))); 
}

