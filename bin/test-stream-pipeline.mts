/**
 * *****************************************************************************
 * 
 * Cluster
 *
 * *****************************************************************************
 */

import { pipeline } from "node:stream/promises";
import { createReadStream, createWriteStream } from "node:fs";
import { createGzip } from "node:zlib";

await pipeline(
  createReadStream("test-tsc.mts"),
  createGzip(),
  createWriteStream("test-tsc.mts.gz"),
);
