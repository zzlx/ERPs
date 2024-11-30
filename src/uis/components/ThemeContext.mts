/**
 * *****************************************************************************
 *
 * Theme context
 *
 * *****************************************************************************
 */

import { createContext } from "react";

export const themes = {
  light: {
    background: "#fff",
    text: "#000",
    current: "light"
  },
  dark: {
    background: "#000",
    text: "#fff",
  },
};

export const ThemeContext = createContext(themes.light);
