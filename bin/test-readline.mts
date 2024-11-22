/**
 * *****************************************************************************
 *
 *
 * *****************************************************************************
 */

import readline from "node:readline/promises";

function test (question = "") {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> ",
  });

  // console.log(process.stdout.isTTY);
  
  rl.prompt();

  let Cc = 0;

  rl.on("SIGINT", () => {
    if (Cc > 0) return rl.close();
    console.log("(To exit, press Ctrl+C again or Ctrl+D or type .exit)");
    Cc++;
  });

  rl.on("line", line => {
    switch (line.trim()) {
      case "hello":
        rl.prompt();
        console.log("Hello");
        break;
      default:
        rl.prompt();
        console.log("Oh!");
        break;
    }

    console.log(`Received: ${line}`);
  });

  rl.on("close", () => {
    rl.prompt();
    console.log('Goodbye!');
    process.exit(0);
  });
}
