/**
 * *****************************************************************************
 *
 * is buffer value
 *
 * *****************************************************************************
 */

export function isBuffer (v: any): boolean {
  return v && v.buffer && v.buffer instanceof ArrayBuffer;
}
