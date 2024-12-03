/**
 * *****************************************************************************
 *
 * detect key file, generate it if not exists.
 *
 * *****************************************************************************
 */

import { exec, getchar } from "../../backends/utils/index.mts";

export async function generateCert (keyFile, csrFile, certFile) {
  process.stdout.write("证书文件不存在，是否创建(Y/N):");
  const cmd = `openssl x509 -req -days 365 \
    -signkey ${keyFile} \
    -in ${csrFile} \
    -out ${certFile}`;
  const answer = await getchar(); 

  if (answer == "Y\n") {
    return exec(cmd);
  }
}
