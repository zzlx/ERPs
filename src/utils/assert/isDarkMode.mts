/**
 * *****************************************************************************
 *
 * is DarkMode
 *
 * *****************************************************************************
 */

export const isDarkMode = () => window.matchMedia 
  && window.matchMedia("(prefers-color-scheme: dark)").matches;
