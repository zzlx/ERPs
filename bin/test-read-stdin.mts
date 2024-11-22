/**
 * *****************************************************************************
 *
 *
 * *****************************************************************************
 */

const read = () => new Promise((resolve, reject) => {
  process.stdin.resume().on('data', (data) => {
    resolve(String(data));
    process.stdin.pause();
  });

});

const test = await read();
console.log(test);
