/**
 * *****************************************************************************
 *
 * is little endian
 *
 * *****************************************************************************
 */

import { check_endianness } from "../check_endianness.mts";

export const isLE: boolean = () => check_endianness() === "LE";
