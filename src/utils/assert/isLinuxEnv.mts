/**
 * *****************************************************************************
 *
 * is linux env
 *
 * *****************************************************************************
 */

export const isLinuxEnv: boolean = () => 
  globalThis.process && globalThis.process.platform === "linux";
