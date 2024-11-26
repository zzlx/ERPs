/**
 * *****************************************************************************
 *
 * detect key file, generate it if not exists.
 *
 * *****************************************************************************
 */

import { exec, getchar } from "../../watchd/utils/index.mts";

export async function generatePrivateKey (keyFile, keyLen = 2048) {
  process.stdout.write(`创建长度为:${keyLen}私钥文件:${keyFile} (Y/N):`);
  const cmd = `openssl genrsa -out ${keyFile} ${keyLen}`;
  const answer = await getchar(); 

  if (answer == "Y\n") {
    return exec(cmd);
  }
}
