/**
 * *****************************************************************************
 *
 * Compose single-argument functions from right to left. 
 *
 * The rightmost function can take multiple arguments 
 * as it provides the signature for the resulting composite function.
 *
 * For example:
 * compose(f, g, h) is identical to doing (...args) => f(g(h(...args))).
 *
 * *****************************************************************************
 */

export function compose(...fns) {
  for (const fn of fns) {
    if (typeof fn !== "function") {
      throw new TypeError(fn, " must be function for compose.");
    }
  }

  return fns.reduce((a, b) => (...args) => a(b(...args)));
}
