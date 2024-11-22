/**
 * *****************************************************************************
 *
 * is browser env
 *
 * *****************************************************************************
 */

export const isBrowserEnv: boolean = () => globalThis.window 
  && typeof globalThis.window === "object";
