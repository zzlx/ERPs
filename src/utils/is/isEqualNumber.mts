/**
 * *****************************************************************************
 *
 *
 * *****************************************************************************
 */

// the fifth letter of the Greek alphabet (Ε, ε),
if (!Number.EPSILON) Number.EPSILON = Math.pow(2, -52);

export const isEqualNumber = (n1, n2) => Math.abs(n1 - n2) < Number.EPSILON;
