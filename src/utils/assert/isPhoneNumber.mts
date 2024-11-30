/**
 * *****************************************************************************
 *
 * is phone number
 *
 * *****************************************************************************
 */

const phoneNumberReg = /(?:^\d{3,4}-\d{7,8}$)|(?:^\d{10}$)/;
export const isPhoneNumber: boolean = v => phoneNumberReg.test(String(v));
