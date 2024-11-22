/**
 * *****************************************************************************
 *
 * UTF8
 *
 * [RFC3629](https://www.rfc-editor.org/info/rfc3629)
 *
 * *****************************************************************************
 */

import { unicode_to_utf8 } from "./unicode_to_utf8.mts";
import { utf8_to_unicode } from "./utf8_to_unicode.mts";

export const utf8 = {
  encode: unicode_to_utf8,
  decode: utf8_to_unicode,
  parse: unicode_to_utf8,
}
