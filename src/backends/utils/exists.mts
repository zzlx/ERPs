/**
 * *****************************************************************************
 *
 *
 *
 * *****************************************************************************
 */

import fs from "node:fs/promises";

export function exists (file) {
  return fs.access(file, fs.constants.R_OK).then(() => true).catch(() => false);
}
