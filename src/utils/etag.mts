/**
 * *****************************************************************************
 *
 *
 * ETag calculate algorithm
 *
 * Create a simple ETag.
 *
 * @param {string|Buffer|Stats} entity
 * @param {object} [options]
 * @param {boolean} [options.weak]
 * @return {String}
 * *****************************************************************************
 */ 

import { sha1 } from "./crypto/sha1.mts";
import { base64 } from "./crypto/base64.mts";

export function etag (entity, options) {
  if (entity == null) throw new TypeError('argument entity is required');

  // support fs.Stats object
  const isStats = isstats(entity);
  const weak = options && typeof options.weak === 'boolean'
    ? options.weak
    : isStats;

  // validate argument
  if (!isStats && typeof entity !== 'string' && !Buffer.isBuffer(entity)) {
    throw new TypeError('argument entity must be string, Buffer, or fs.Stats')
  }

  // generate entity tag
  const tag = isStats ? statTag(entity) : entitytag(entity);

  return weak ? 'W/' + tag : tag
}

/**
 * Determine if object is a Stats object.
 *
 * @param {object} obj
 * @return {boolean}
 * @api private
 */

function isstats (obj) {
  // genune fs.Stats
  if (typeof Stats === 'function' && obj instanceof Stats) return true

  // quack quack
  return obj && typeof obj === 'object' &&
    'ctime' in obj && toString.call(obj.ctime) === '[object Date]' &&
    'mtime' in obj && toString.call(obj.mtime) === '[object Date]' &&
    'ino' in obj && typeof obj.ino === 'number' &&
    'size' in obj && typeof obj.size === 'number'
}

/**
 * Generate an entity tag.
 *
 * @param {Buffer|string} entity
 * @return {string}
 * @private
 */

function entitytag (entity) {
  // fast-path empty
  if (entity.length === 0) return '"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk"'

  /*
  const hash = crypto
    .createHash('sha1')
    .update(entity, 'utf8')
    .digest('base64')
    .substring(0, 27)
  */
  // compute hash of entity
  const hash = base64.encode(sha1(entity)).substring(0, 27);

  // compute length of entity
  const len = typeof entity === 'string' 
    ? Buffer.byteLength(entity, 'utf8') 
    : entity.length;

  return '"' + len.toString(16) + '-' + hash + '"';
}


/**
 * Generate a tag for a stat.
 *
 * @param {object} stat
 * @return {string}
 * @private
 */

function statTag (stat) {
  const mtime = stat.mtime.getTime().toString(16);
  const size = stat.size.toString(16);

  return '"' + size + '-' + mtime + '"';
}
