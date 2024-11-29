/**
 * *****************************************************************************
 *
 * convert rgb value to Hex value
 *
 * *****************************************************************************
 */

export const rgbToHex: string = (r: number, g: number, b: number) => "#" + 
  ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

// test
// console.log(rgbToHex(122, 122, 122));
