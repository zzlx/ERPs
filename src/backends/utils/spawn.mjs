/**
 * *****************************************************************************
 *
 * spawn child process
 *
 * *****************************************************************************
 */

import cp from "node:child_process";

export function spawn () {
  const args = [
    "--experimental-sqlite", // sqlite support
    "--experimental-strip-types", // typescript support
    "--disable-warning=ExperimentalWarning", // disable experimental warning
    "--trace-warnings",
    ...arguments,
  ];

  cp.spawn(process.argv[0], args, {
    stdio: [0, 1, 2, null],
    detached: false,
  });
}
