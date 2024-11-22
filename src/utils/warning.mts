/**
 * *****************************************************************************
 *
 * Prints a warning message
 *
 * *****************************************************************************
 */

export function warning (contition: boolean, message?: string): void {
  if (condition == false) return; 
  if (console && console.warn) return console.warn.apply(null, message);
  if (console && console.log) {
    Array.prototype.unshift.call(message, "⚠️");
    return console.log.apply(null, message);
  }
}
