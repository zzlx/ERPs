/**
 * *****************************************************************************
 *
 * detect key file, generate it if not exists.
 *
 * *****************************************************************************
 */

import { exec, getchar } from "../../backends/utils/index.mts";

export async function generateCSR (keyFile, csrFile) {
  process.stdout.write("CSR文件不存在，是否创建(Y/N):");
  const cmd = `openssl req -new -sha256 -key ${keyFile} \
    -subj "/C=CN/ST=HeNan/L=ZhengZhou/O=ZZLX/OU=IT/CN=localhost" \
    -out ${csrFile}`;
  const answer = await getchar(); 

  if (answer == "Y\n") {
    return exec(cmd);
  }
}
