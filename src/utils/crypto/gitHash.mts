/**
 * *****************************************************************************
 *
 * gitHash
 * 使用sha1计算,用于计算与git hash 一致的哈希值
 *
 * @param {string} content 文件内容
 * @return {string}
 *
 * *****************************************************************************
 */

import { sha1 } from './sha1.mts';
import { utf8 } from '../utf8.mts';

export function gitHash (content) {
  const l = utf8.encode(content).byteLength;
  const header = "blob " + l + "\0";
  const text = header + content;
  return sha1(text).toString('hex');
}
