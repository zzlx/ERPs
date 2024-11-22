/**
 * *****************************************************************************
 *
 *
 * *****************************************************************************
 */

import { hasBasename } from './hasBasename.mts';

export function stripBasename(path, prefix = '') {
  return hasBasename(path, prefix) ? path.substr(prefix.length) : path;
}

//console.log(stripBasename('/test.abc'));
