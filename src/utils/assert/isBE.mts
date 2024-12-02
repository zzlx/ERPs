/**
 * *****************************************************************************
 *
 * is big endian
 *
 * *****************************************************************************
 */

import { check_endianness } from "../check_endianness.mts";

export const isBE: boolean = () => check_endianness() === "BE";
