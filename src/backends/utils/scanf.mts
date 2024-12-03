/**
 * *****************************************************************************
 *
 *
 * *****************************************************************************
 */

export function scanf() {
  console.log(arguments);

  return new Promise((resolve, reject) => {
    process.stdin.resume().on('data', (data) => {
      resolve(data);
      process.stdin.pause();
    });
  });
}
