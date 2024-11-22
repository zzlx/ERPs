/**
 * *****************************************************************************
 *
 * is Mac env
 *
 * *****************************************************************************
 */

export const isMacEnv: boolean = () => globalThis.process 
    && globalThis.process.platform === "darwin" 
    && globalThis.process.env.TERM_PROGRAM === "Apple_Terminal";
