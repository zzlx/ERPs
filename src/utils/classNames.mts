/**
 * *****************************************************************************
 *
 * classNames 
 * 
 * className is the same as CSS class, and the HTML class attribute.
 * 
 * *****************************************************************************
 */

export function classNames (props): string {
  return Array.prototype.slice.apply(arguments)
    .filter(Boolean)
    .map(v => v.trim())
    .join(" ");
}
