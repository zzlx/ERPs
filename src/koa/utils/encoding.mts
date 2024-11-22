/**
 * *****************************************************************************
 *
 * Get the preferred encodings from an Accept-Encoding header.
 *
 *
 *
 * *****************************************************************************
 */

const simpleEncodingRegExp = /^\s*([^\s;]+)\s*(?:;(.*))?$/;

export function preferredEncodings(accept, provided) {
  const accepts = parseAcceptEncoding(accept || "");

  if (!provided) {
    return accepts.filter(isQuality).sort(compareSpecs).map(getFullEncoding);
  }

  const priorities = provided
    .map((type, index) => getEncodingPriority(type, accepts, index));

  return priorities.filter(isQuality).sort(compareSpecs)
    .map(priority => provided[priorities.indexOf(priority)]);
}

/**
 * Parse the Accept-Encoding header.
 */

function parseAcceptEncoding(accept) {
  var accepts = accept.split(",");
  var hasIdentity = false;
  var minQuality = 1;

  for (var i = 0, j = 0; i < accepts.length; i++) {
    var encoding = parseEncoding(accepts[i].trim(), i);

    if (encoding) {
      accepts[j++] = encoding;
      hasIdentity = hasIdentity || specify("identity", encoding);
      minQuality = Math.min(minQuality, encoding.q || 1);
    }
  }

  if (!hasIdentity) {
    /*
     * If identity doesn"t explicitly appear in the accept-encoding header,
     * it"s added to the list of acceptable encoding with the lowest q
     */
    accepts[j++] = {
      encoding: "identity",
      q: minQuality,
      i: i,
    };
  }

  // trim accepts
  accepts.length = j;

  return accepts;
}

/**
 * Parse an encoding from the Accept-Encoding header.
 */

function parseEncoding(str, i) {
  var match = simpleEncodingRegExp.exec(str);
  if (!match) return null;

  var encoding = match[1];
  var q = 1;
  if (match[2]) {
    var params = match[2].split(";");
    for (var j = 0; j < params.length; j++) {
      var p = params[j].trim().split("=");
      if (p[0] === "q") {
        q = parseFloat(p[1]);
        break;
      }
    }
  }

  return {
    encoding: encoding,
    q: q,
    i: i,
  };
}

/**
 * Get the priority of an encoding.
 */

function getEncodingPriority(encoding, accepted, index) {
  var priority = {o: -1, q: 0, s: 0};

  for (var i = 0; i < accepted.length; i++) {
    var spec = specify(encoding, accepted[i], index);

    if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
      priority = spec;
    }
  }

  return priority;
}

/**
 * Get the specificity of the encoding.
 */

function specify(encoding, spec, index) {
  var s = 0;
  if(spec.encoding.toLowerCase() === encoding.toLowerCase()){
    s |= 1;
  } else if (spec.encoding !== "*" ) {
    return null;
  }

  return {
    i: index,
    o: spec.i,
    q: spec.q,
    s: s,
  };
}

/**
 * Compare two specs.
 */

function compareSpecs(a, b) {
  return (b.q - a.q) || (b.s - a.s) || (a.o - b.o) || (a.i - b.i) || 0;
}

/**
 * Get full encoding string.
 */

function getFullEncoding(spec) {
  return spec.encoding;
}

/**
 * Check if a spec has any quality.
 */

function isQuality(spec) {
  return spec.q > 0;
}
