/**
 * *****************************************************************************
 *
 * exec 
 *
 * *****************************************************************************
 */

import cp from "node:child_process";

export function exec (command: string) {
  return new Promise((resolve, reject) => {
    cp.exec(command, (err, stdout, stderr) => {
      if (err) reject(err);
      if (stdout) resolve(stdout);
      if (stderr) reject(stderr);
    });
  });
}
