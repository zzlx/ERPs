/**
 * *****************************************************************************
 *
 * Parse arguments
 *
 * @params {array|string} argvs
 * @return {object} retval
 * *****************************************************************************
 */

export function argvParser (a) {
  const argvs = 'string' === typeof a 
    ? a.split(/\s+/) 
    : Array.isArray(a) ? a : [];
  const retval = new Map();

  let lastKey;

  for (const v of argvs) {
    if ( 
      ( v.charAt(0) === "-" && isAlpha(v.charAt(1)) 
        && ((v.charAt(2) && v.charAt(2) === "=") || v.charAt(2) == null)
      ) ||
      ( v.charAt(0) === "-" && v.charAt(1) === "-" 
        && isAlpha(v.charAt(2)) 
        && isAlpha(v.charAt(3))
      ) 
    ) {
      const { key, value } = getKeyValuePair(v);
      retval.set(key, value);
      lastKey = key;
      continue;
    } 

    if (lastKey) {
      retval.set(lastKey, v);
      lastKey = null;
    } else {
      retval.set(v, true);
    }
  }

  return retval;
}

function isAlpha (c) {
  const cc = String(c).charCodeAt(0); // cc: char code
  return (cc >= 65 && cc <= 90) || (cc >= 97 && cc <= 122);
}

/**
 * return the potion of equal 
 */

function getKeyValuePair (str) {
  let i = -1;
  const retval = { key: str, value: true };

  for (const s of str) {
    i++;
    if (s === "=") { 
      retval.key = str.slice(0, i); 
      retval.value = str.slice(i+1); 
      break; 
    }
  }

  return retval;
}
