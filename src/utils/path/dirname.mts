/**
 * *****************************************************************************
 *
 * dirname
 *
 * return dir of the path
 *
 * @param {string} pathname
 * @return {string} dirname
 * *****************************************************************************
 */

import { isAbsolute } from './isAbsolute.mts';
import { isPathSeparator } from './isPathSeparator.mts';

export function dirname(path) {
  if (path.length === 0) return '.';

  const isAbsolutePath = isAbsolute(path);

  let end = -1;

  for (let i = path.length -1; i >= 1; --i) {
    if (isPathSeparator(path.charCodeAt(i))) {
      end = i; 
      break;
    }

  }

  if (end === -1) return isAbsolutePath ? path.charAt(end) : '.';

  return path.slice(0, end);
}
