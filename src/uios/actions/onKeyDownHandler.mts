/**
 * *****************************************************************************
 *
 * onKeyDown event handler
 * 
 * *****************************************************************************
 */

import { debuglog } from "../../utils/index.mts";

const debug = debuglog("debug:onKeyDownEventHandler");

export function onKeyDownHandler (e) {
  if (e.type !== "keydown") return; // bypass unconcerned event

  e.stopPropagation();
  e.preventDefault();

  debug(e);
}
