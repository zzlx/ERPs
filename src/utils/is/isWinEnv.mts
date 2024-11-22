/**
 * *****************************************************************************
 *
 * is Win env
 *
 * *****************************************************************************
 */

export const isWinEnv: boolean = () => 
  !isBrowser && globalThis.process && globalThis.process.platform === "win32";
