/**
 * *****************************************************************************
 *
 * convert unicode to utf8code
 *
 * @param {array} bin
 * @return {array}
 * *****************************************************************************
 */

export function unicode_to_utf8 (bin) {
  const isString = typeof bin === 'string';
  const u8a = [];

  //for (let i = 0; i < bin.length; i++) {
  for (const c of bin) {
    //const c = bin[i];
    const u = isString ? c.charCodeAt(0) : c;
    if (typeof(u) !== 'number') throw new Error(`Invalid code ${u}.`);

    if (u < 0x80) { // ascii char 0~0x7F
      u8a.push(u);
    } else if (u < 0x800) {
      let c0 = u >> 6         | 0xC0;
      let c1 = u       & 0x3F | 0x80;

      u8a.push(c0, c1);
    } else if (u <= 0xFFFF) {
      let c0 = u >> 12        | 0xE0;
      let c1 = u >> 6  & 0x3F | 0x80;
      let c2 = u       & 0x3F | 0x80;

      u8a.push(c0, c1, c2);
    } else if (u <= 0x1FFFFF) {
      let c0 = u >> 18        | 0xF0;
      let c1 = u >> 12 & 0x3F | 0x80;
      let c2 = u >> 6  & 0x3F | 0x80;
      let c3 = u       & 0x3F | 0x80;

      u8a.push(c0, c1, c2, c3);
    } else {
      throw new Error(`Invalid Unicode: ${c}`);
    }
  }

  return new Uint8Array(u8a);
}
