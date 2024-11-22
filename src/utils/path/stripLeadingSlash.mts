/**
 * *****************************************************************************
 *
 * strip leading slash
 *
 * *****************************************************************************
 */

export function stripLeadingSlash(path: string): string {
  let retval = path;
  while (retval.charAt(0) === '/') { retval = retval.substr(1); }
  return retval;
}

// test 
// console.log(stripLeadingSlash("///test"));
