/**
 * *****************************************************************************
 *
 * is URL
 *
 * *****************************************************************************
 */

export const isURL: boolean = v => /[a-zA-z]+:\/\/[^\s]*/.test(v);
