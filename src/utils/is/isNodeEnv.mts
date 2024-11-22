/**
 * *****************************************************************************
 *
 * is node env
 *
 * *****************************************************************************
 */

export const isNodeEnv: boolean = () => globalThis.process 
  && typeof globalThis.process.cwd === "function";
