/**
 * *****************************************************************************
 *
 * is email value
 *
 * *****************************************************************************
 */

export const isEmail: boolean = v => /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(String(v));
