/**
 * *****************************************************************************
 *
 *
 * *****************************************************************************
 */

import { preferredCharsets } from "./utils/charset.mts";
import { preferredEncodings } from "./utils/encoding.mts";
import { preferredLanguages } from "./utils/language.mts";
import { preferredMediaTypes } from "./utils/mediaType.mts";

export class Negotiator {
  constructor (request) {
    this.request = request;
  }

  charset (available) {
    const set = this.charsets(available);
    return set && set[0];
  }

  charsets (available) {
    return preferredCharsets(this.request.headers["accept-charset"], available);
  }

  encoding (available) {
    const set = this.encodings(available);
    return set && set[0];
  }

  encodings (available) {
    return preferredEncodings(this.request.headers["accept-encoding"], available);
  }

  language (available) {
    const set = this.languages(available);
    return set && set[0];
  }

  languages (available) {
    return preferredLanguages(this.request.headers["accept-language"], available);
  }

  mediaType (available) {
    const set = this.mediaTypes(available);
    return set && set[0];
  }

  mediaTypes (available) {
    return preferredMediaTypes(this.request.headers.accept, available);
  }
}
