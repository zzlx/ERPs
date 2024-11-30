/**
 * *****************************************************************************
 *
 * is native error 
 *
 * *****************************************************************************
 */

export const isNativeError: boolean = e => 
  Object.prototype.toString.call(e) === "[object Error]" || e instanceof Error;
