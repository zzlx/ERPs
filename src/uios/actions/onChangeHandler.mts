/**
 * *****************************************************************************
 *
 * onChange event handler
 * 
 * *****************************************************************************
 */

import { debuglog } from "../../utils/index.mts";

const debug = debuglog("debug:onChangeEventHandler");

export function onChangeHandler (e) {
  if (e.type !== "change") return; // bypass unconcerned event

  e.stopPropagation();
  e.preventDefault();

  debug(e);
}
