/**
 * *****************************************************************************
 *
 * is big endian
 *
 * *****************************************************************************
 */

const f32a = new Float32Array([-1]); // 0xBF800000
const u8a  = new Uint8Array(f32a.buffer);
export const isBigEndian: boolean = () => u8a[3] === 0;
