/**
 * *****************************************************************************
 *
 * User context
 *
 * *****************************************************************************
 */

import { createContext } from "react";

export const UserContext = createContext({
  username: "",
  age: 0,
});
