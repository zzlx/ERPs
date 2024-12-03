/**
 * *****************************************************************************
 *
 * read char from standard input
 *
 * *****************************************************************************
 */

export function getchar () {
  return new Promise((resolve) => {
    // process.stdin.setEncoding("utf8");
    if (process.stdin.isPaused()) process.stdin.resume();

    process.stdin.on("data", (chunk) => {
      process.stdin.pause();
      const input = String(chunk).trim();
      resolve(input);
    });
  });
}
