/**
 * *****************************************************************************
 *
 * classNames manager
 * 
 * *****************************************************************************
 */

export function classNames (props): string {
  return Array.prototype.slice.apply(arguments)
    .filter(Boolean)
    .map(v => v.trim())
    .join(" ");
}
