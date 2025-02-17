/**
 * *****************************************************************************
 *
 * Assert
 *
 * @param {} value
 * @param {string} message
 *
 * *****************************************************************************
 */

export function assert (value, message: string) {
  if (!value) {
    const err = new Error(message || `Assertion failed.`);
    if (Error.captureStackTrace) Error.captureStackTrace(err, assert);
    throw err;
  }
}
