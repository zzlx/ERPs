/**
 * *****************************************************************************
 *
 * Convert utf8 to unicode
 * 
 * [Unicode® 13.0.0](https://www.unicode.org/versions/Unicode13.0.0/)
 * *****************************************************************************
 */

export function utf8_to_unicode (bin) {
  const isString = typeof bin === 'string';
  //for (const c of bin) u8a.push(c.charCodeAt(0));

  const u8 = [];

  for (let i = 0; i < bin.length; i++) {

    if (bin[i] >>> 7 === 0b0) {
      u8.push(bin[i]);
      continue;
    }

    if (bin[i] >>> 5 === 0b110) {
      u8.push((bin[i] << 27 >>> 21) | (bin[++i] << 26 >>> 26));
      continue;
    } 

    if (bin[i] >>> 4 === 0b1110) {
      u8.push(
        (bin[i] << 28 >>> 16) | (bin[++i] << 26 >>> 20) | (bin[++i] << 26 >>> 26)
      );
      continue;
    } 

    if (bin[i] >>> 3 === 0b11110) {
      u8.push(
        (bin[i] << 29 >>> 11)   | (bin[++i] << 26 >>> 14) | 
        (bin[++i] << 26 >>> 20) | (bin[++i] << 26 >>> 26)
      );
      continue;
    } 

    throw new Error(`Invalid utf8 encode: ${String.fromCharCode(bin[i])}`);
  }

  return String.fromCharCode(...u8);
}
