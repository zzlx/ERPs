/**
 * *****************************************************************************
 *
 * is integer value
 *
 * *****************************************************************************
 */

export const isInteger: boolean = v => 
  typeof v === "number" && Number.isFinite(v) && Math.floor(v) === v;
