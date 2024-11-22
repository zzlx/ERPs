/**
 * *****************************************************************************
 *
 * 打字机效果
 *
 * *****************************************************************************
 */

export async function typewriter(characters, delay = 10) {
  for (const c of characters) {
    await new Promise((resolve) => {
      setTimeout(() => {
        process.stdout.write(c);
        resolve();
      }, delay);
    });
  } 

  process.stdout.write("\n"); // typing the line bread in the last
}
