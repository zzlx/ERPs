/**
 * *****************************************************************************
 *
 * koa context
 *
 * *****************************************************************************
 */

import net from "node:net";
import util from "node:util";

import { Accepts } from "./Accepts.mts";
import { HttpError } from "./HttpError.mts";
import { mimeTypes } from "./mimeTypes.mts";
import { memCache } from "../utils/index.mts";

import { 
  HTTP2_HEADER, 
  HTTP_STATUS, 
  HTTP_STATUS_CODES, 
  HTTP_STATUS_EMPTY_CODES, 
  HTTP_STATUS_REDIRECT_CODES, 
} from "./http_status.mts";

// define symbol constants
export const ACCEPT      = Symbol("context#accept");
export const REQ_BODY    = Symbol("context#request-body");
export const REQ_HEADERS = Symbol("context#request-headers");
export const REQ_URL     = Symbol("context#request-URL");
export const REQ_IP      = Symbol("context#request-ip");
export const RES_BODY    = Symbol("context#response-body");
export const RES_HEADERS = Symbol("context#response-headers");

const typeCache = memCache(100);
const MSG = Symbol("context#message"); 
const debug = util.debug("debug:context");

export class Context {
  constructor () {
    this.request = { };
    this.response = this.response(); 
    this.req = this.request;
    this.res = this.response;
    // this.errors = [];
    this.state = new Map(); // state存储器 使用map替代Object.create(null); 
  }
  
  /**
   *
   * check field from response header
   *
   * @return {Bool}
   * @api public
   */

  has (field) {
    return Boolean(this.response.headers[field.toLowerCase()]);
  }

  /**
   * Return the request socket.
   *
   * @return {Connection}
   * @api public
   */

  get socket() {
    return this.stream.session.socket;
  }

  /**
   *
   */

  get headers () {
    return this.request.headers;
  }


  /**
   * writable
   *
   */
  get writable () {
    return this.stream.writable;
  }
  /**

  /**
   * headersSent
   *
   * @api public
   */

  get headersSent() {
    return this.stream.headersSent;
  }

  /**
   * Get response status code.
   *
   * @return {number}
   * @api public
   */

  get status() {
    return Number.parseInt(this.response.headers[HTTP2_HEADER.STATUS]);
  }

  /**
   * Set response status code.
   *
   * @param {number|string} code
   * @api public
   */

  set status(code) {
    this.response.status = code;
  }

  /**
   * Get response status message
   *
   * @return {String}
   * @api public
   */

  get message() {
    return this[MSG] != undefined ? this[MSG] : HTTP_STATUS_CODES[this.status];
  }

  /**
   * Set response status message
   */

  set message(msg) {
    this[MSG] = msg;
  }

  /**
   * Return request method
   *
   * @return method
   * @api public
   */

  get method() {
    return this.request.headers[HTTP2_HEADER.METHOD];
  }

  /**
   * Set request method, 
   * useful for implementing middleware such as methodOverride().
   */

  set method(method) {
    this.request.headers[HTTP2_HEADER.METHOD] = method;
  }

  /**
   *
   */

  get URL() {
    if (!this[REQ_URL]) {
      const schema = this.request.headers[HTTP2_HEADER.SCHEME];
      const authority = this.request.headers[HTTP2_HEADER.AUTHORITY];
      const path =  this.request.headers[HTTP2_HEADER.PATH];

      try {
        this[REQ_URL] = new URL(`${schema}://${authority}${path}`);
      } catch (err) {
        this[REQ_URL] = Object.create(null);
      }
    }

    return this[REQ_URL];
  }

  /**
   * href
   */

  get href() {
    return this.URL.href;
  }

  get url () {
    return this.URL.href;
  }

  /**
   * Get origin of URL.
   *
   * @return {String}
   * @api public
   */

  get origin() {
    return this.URL.origin;
  }

  /**
   * 返回请求协议, https 或http
   */

  get protocol() {
    return this.URL.protocol;
  }

  /**
   * username
   */

  get username() {
    return this.URL.username;
  }

  /**
   * password
   */

  get password() {
    return this.URL.password;
  }

  /**
   * host
   *
   * @todo: 完善hostname获取逻辑
   */

  get host() {
    const proxy = this.app.proxy;
    let host = proxy && this.get(HTTP2_HEADER.X_FORWARDED_FOR);
    if (!host) host = this.URL.host;
    if (!host) return "";
    return host.split(/\s*,\s*/, 1)[0];
  }

  /**
   * hostname
   */

  get hostname() {
    return this.URL.hostname;
  }

  /**
   * port
   */

  get port() {
    return this.URL.port;
  }

  /**
   * pathname
   */

  get pathname() {
    return this.URL.pathname;
  }

  /**
   * path
   */

  get path() {
    return this.URL.pathname;
  }

  /**
   * search
   * strings with?
   */

  get search() {
    return this.URL.search;
  }

  get queryString () {
    return this.URL.search;
  }

  /**
   * searchParams
   *
   * Usage: ctx.searchParams.get("param") => value
   */

  get searchParams() {
    return this.URL.searchParams;
  }

  get query () {
    return this.URL.searchParams;
  }

  /**
   * search
   */

  get hash() {
    return this.URL.hash;
  }

  /**
   * Short-hand for:
   *
   *    this.protocol == "https"
   *
   * @return {Boolean}
   * @api public
   */

  get secure() {
    return "https:" === this.protocol;
  }

  /**
   * Set Content-Length field to `n`.
   *
   * @param {Number} n
   * @api public
   */

  set length(n) {
    this.set(HTTP2_HEADER.CONTENT_LENGTH, Number.parseInt(n));
  }

  /**
   * Return parsed Content-Length when present.
   *
   * @return {Number}
   * @api public
   */

  get length() {
    const len = this.response.headers[HTTP2_HEADER.CONTENT_LENGTH];
    return ~~len; // ~~"" => 0
  }

  /**
   * When `app.proxy` is `true`, 
   * parse the "X-Forwarded-For" ip address list.
   *
   * For example if the value were "client, proxy1, proxy2"
   * you would receive the array `["client", "proxy1", "proxy2"]`
   * where "proxy2" is the furthest down-stream.
   *
   * @return {Array}
   * @api public
   */

  get ips() {
    const val = this.request.headers("X-Forwarded-For");

    // 服务器前可以有多个代理
    // 服务器前只有1个代理
    if (this.app.maxIpsCount) {
      // 

    }

    return this.app.proxy && val
      ? val.split(/\s*,\s*/)
      : [];
  }

  /**
   * Return request"s remote address
   * When `app.proxy` is `true`, 
   * parse the "X-Forwarded-For" ip address list and return the first one
   *
   * @return {String}
   * @api public
   */

  get ip() {
    if (!this[REQ_IP]) {
      this[REQ_IP] = this.socket.remoteAddress || "";
    }
    return this[REQ_IP];
  }

  /**
   * Return subdomains as an array.
   *
   * Subdomains are the dot-separated parts of the host before the main domain
   * of the app. By default, the domain of the app is assumed to be the last two
   * parts of the host. This can be changed by setting `app.subdomainOffset`.
   *
   * For example, if the domain is "tobi.ferrets.example.com":
   * If `app.subdomainOffset` is not set, this.subdomains is
   * `["ferrets", "tobi"]`.
   * If `app.subdomainOffset` is 3, this.subdomains is `["tobi"]`.
   *
   * @return {Array}
   * @api public
   */

  get subdomains() {
    if (net.isIP(this.hostname)) return [];
    return this.hostname.split(".").reverse().slice(this.app.subdomainOffset);
  }

  /**
   *
   *
   */

  get type () {
    const type = this.response.headers[HTTP2_HEADER.CONTENT_TYPE];
    if (!type) return "";
    return type.split(";")[0];
  }

  /**
   *
   *
   *
   */

  set type (value) {
    let mimeType = typeCache.get(value);

    if (!mimeType) {
      mimeType = mimeTypes.contentType(value);
      typeCache.set(value, mimeType);
    }

    if (mimeType) this.set(HTTP2_HEADER.CONTENT_TYPE, mimeType);
    else this.remove(HTTP2_HEADER.CONTENT_TYPE);
  }

  /**
   * Append additional header `field` with value `val`.
   *
   * Examples:
   *
   * ```
   * this.append("Link", ["<http://localhost/>", "<http://localhost:3000/>"]);
   * this.append("Set-Cookie", "foo=bar; Path=/; HttpOnly");
   * this.append("Warning", "199 Miscellaneous warning");
   * ```
   *
   * @param {String} field
   * @param {String|Array} val
   * @api public
   */

  append (field, val) {
    const prev = this.response.headers[field];
    if (prev) {
      val = Array.isArray(prev) ? prev.concat(val) : [prev].concat(val);
    }

    return this.set(field, val);
  }

  /**
   * Remove header `field`.
   *
   * @param {String} name
   * @api public
   */

  remove (field) {
    if (this.headerSent) return;

    if (this.response.headers[field]) {
      delete this.response.headers[field];
    }
  }

  /**
   * Return header settings.
   *
   * The `Referrer` header field is special-cased,
   * both `Referrer` and `Referer` are interchangeable.
   *
   * Examples:
   *
   *     this.get("Content-Type");
   *     // => "text/plain"
   *
   *     this.get("content-type");
   *     // => "text/plain"
   *
   *     this.get("Something");
   *     // => ""
   *
   * @param {String} field
   * @return {String}
   * @api public
   */

  get (field) {
    switch (field = field.toLowerCase()) {
      case "referer":
      case "referrer":
        return this.request.headers[HTTP2_HEADER.REFERER] || "";
      default:
        // 从request、response中返回头字段设置
        return this.request.headers[field] || this.response.headers[field] || "";
    }
  }


  set etag (val) {
    this.response.headers["etag"];
  }

  /**
   * Check if a request cache is fresh, 
   * This method is for cache negotiation between If-None-Match / ETag,
   * and If-Modified-Since and Last-Modified.
   * Last-Modified and/or the ETag still match.
   *
   * @return {Boolean}
   * @api public
   */

  get fresh () {
    const CACHE_CONTROL_NO_CACHE_REGEXP = /(?:^|,)\s*?no-cache\s*?(?:,|$)/;

    const cache_control = this.request.headers[HTTP2_HEADER.CACHE_CONTROL];
    const modifiedSince = this.request.headers[HTTP2_HEADER.IF_MODIFIED_SINCE];
    const noneMatch     = this.request.headers[HTTP2_HEADER.IF_NONE_MATCH];

    // GET or HEAD for weak freshness validation only
    if ("GET" != this.method && "HEAD" != this.method) return false;

    const s = this.status;

    // 2xx or 304 as per rfc2616 14.26
    if ((s >= 200 && s < 300) || 304 == s) {
      if ( !modifiedSince && !noneMatch) return false;
      if (cache_control && CACHE_CONTROL_NO_CACHE_REGEXP.test(cache_control)) {
        return false;
      }

      if (noneMatch && noneMatch !== "*") {
        const etag = this.response.headers["etag"];
        if (!etag) return false;
      }

      if (modifiedSince) {
        const lastModified = this.response.headers["last-modified"];
        const modifiedStale = !lastModified || !(lastModified <= modifiedSince);
        if (modifiedStale) return false;
      }

      return true;
    }

    return false;
  }

  /**
   * Inverse of request.fresh.
   */

  get stale () {
    return !this.fresh;
  }

  /**
   *
   *
   */

  get accept () {
    if (this[ACCEPT] == null) this[ACCEPT] = new Accepts(this.request);
    return this[ACCEPT];
  }



  /**
   * Get response body.
   */

  get body() {
    return this[RES_BODY];
  }

  /**
   * Set response body.
   *
   * If ctx.status has not been set, 
   * will automatically set the status to 200 or 204.
   *
   * @param {String|Buffer|Object|Stream} val
   * @api public
   */

  set body(val) {
    const original = this[RES_BODY]; // original body

    // no content
    if (null == val || false === val || true === val) {

      if (HTTP_STATUS_EMPTY_CODES.includes(this.status)) {
        this.status = HTTP_STATUS.NO_CONTENT; // 204
      }

      this.remove("Content-Type");
      this.remove("Content-Length");
      this.remove("Transfer-Encoding");
      return;
    }

    // set a proper status
    if (!this.status) this.status = HTTP_STATUS.OK; // 200

    // string
    if ("string" === typeof val) {
      if (!this.has("content-type")) {
        this.type = /^\s*<xml/.test(val) 
          ? "xml" 
          : /^\s*<(:?html)?/.test(val) 
            ? "html" 
            : "text";
      }

      this.length = Buffer.byteLength(val);
      this[RES_BODY] = val;
      return;
    }

    // buffer
    if (Buffer.isBuffer(val)) {
      if (!this.has("content-type")) this.type = "bin";
      this.length = val.length;
      this[RES_BODY] = val;
      return;
    }

    // stream body
    if (val && typeof val.pipe === "function") {

      if (null !== original && original != val) this.remove("Content-Length");
      if (!this.has("content-type")) this.type = "bin";
      this[RES_BODY] = val;
      return;

    }

    // object body
    // convert obj to string
    if (typeof val === "object") {
      this[RES_BODY] = JSON.stringify(val);
      if (!this.has("content-type")) { this.type = "json"; }
      this.length = Buffer.byteLength(this[RES_BODY]);
      return;
    }

    this.throw(500, "Setting body error.");
  }
}

/**
 *
 * Set header `field` to `val`, or pass an object of header fields.
 *
 * Examples:
 *
 *    this.set("Foo", ["bar", "baz"]);
 *    this.set("Accept", "application/json");
 *    this.set({ Accept: "text/plain", "X-API-Key": "tobi" });
 *
 * @param {String|Object|Array} field
 * @param {String} val
 * @return {Boolean}
 * @api public
 */

Context.prototype.set = function (field, val) {
  if (this.headerSent) return false; // set header failure

  if (arguments.length === 2) {
    if (Array.isArray(val)) val = val.map(v => typeof v === "string" ? v : String(v));
    else if (typeof val !== "string") val = String(val);

    this.response.headers[field.toLowerCase()] = val;
  }

  if (typeof field === "object") {
    for (const key of Object.keys(field)) {
      this.set(key, field[key]);
    }
  }

  return true; // set header success
};

/**
 *
 * ctx.throw([status], [msg], [properties])
 *
 * Throw an error with `status` (default 500) and `msg`. 
 * Note that these are user-level errors, 
 * and the message may be exposed to the client.
 *
 *    this.throw(403)
 *    this.throw(400, "name required")
 *    this.throw("something exploded")
 *    this.throw(new Error("invalid"))
 *    this.throw(400, new Error("invalid"))
 *
 * See: https://github.com/jshttp/http-errors
 *
 * Note: `status` should only be passed as the first parameter.
 *
 * @param {String|Number|Error} err, msg or status
 * @param {String|Number|Error} [err, msg or status]
 * @param {Object} [properties]
 * @api public
 */

Context.prototype.throw = function () {
  throw new HttpError(...arguments);
};

/**
 * push stream
 */

Context.prototype.push = function (pathname) {
  this.stream.pushStream({":path": pathname }, (err, pushStream, headers) => {
    debug(headers);
    if (err) this.throw(err);
    pushStream.respond({ ":status": 200 });
    pushStream.end("some pushed data");
  });
};

/**
 * error handler
 */

Context.prototype.onerror = function (err) {
  if (err == null) return;

  if ("ENOENT" === err.code) this.status = 404;
  else this.status = 500;

  this.type = "text";
  this.body = err.expose && this.app.env === "development" 
    ? err.message 
    : HTTP_STATUS_CODES[this.status];
};

/**
 *
 * Content-Disposition 响应标头指示回复的内容该以何种形式展示，
 * 是以内联inline的形式（即网页或者页面的一部分），还是以附件attchment的形式下载并保存到本地。
 *
 * Reference: https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Disposition
 */

Context.prototype.attachment = function (filename = "", options = {}) {
  if (options) {
    // 
  }

  this.set(HTTP2_HEADER.CONTENT_DISPOSITION, `attachment;fileName=${filename}`);
};

/**
 * Check if the given `type(s)` is acceptable, 
 * returning the best match when true, otherwise `false`, 
 * in which case you should respond with 406 "Not Acceptable".
 *
 * The `type` value may be a single mime type string
 * such as "application/json", the extension name
 * such as "json" or an array `["json", "html", "text/plain"]`. When a list
 * or array is given the _best_ match, if any is returned.
 *
 * Examples:
 *
 *     // Accept: text/html
 *     this.accepts("html");
 *     // => "html"
 *
 *     // Accept: text/*, application/json
 *     this.accepts("html");
 *     // => "html"
 *     this.accepts("text/html");
 *     // => "text/html"
 *     this.accepts("json", "text");
 *     // => "json"
 *     this.accepts("application/json");
 *     // => "application/json"
 *
 *     // Accept: text/*, application/json
 *     this.accepts("image/png");
 *     this.accepts("png");
 *     // => false
 *
 *     // Accept: text/*;q=.5, application/json
 *     this.accepts(["html", "json"]);
 *     this.accepts("html", "json");
 *     // => "json"
 *
 * @param {String|Array} type(s)...
 * @return {String|Array|false}
 * @api public
 */

Context.prototype.accepts = function accepts () {
  return this.accept.types(...arguments);
};

/**
 * Return accepted encodings or best fit based on `encodings`.
 *
 * Given `Accept-Encoding: gzip, deflate`
 * an array sorted by quality is returned:
 *
 *     ["gzip", "deflate"]
 *
 * @param {String|Array} encoding(s)...
 * @return {String|Array}
 * @api public
 */

Context.prototype.acceptsEncodings = function () {
  return this.accept.encodings(...arguments);
};

/**
 * Return accepted charsets or best fit based on `charsets`.
 *
 * Given `Accept-Charset: utf-8, iso-8859-1;q=0.2, utf-7;q=0.5`
 * an array sorted by quality is returned:
 *
 *     ["utf-8", "utf-7", "iso-8859-1"]
 *
 * @param {String|Array} charset(s)...
 * @return {String|Array}
 * @api public
 */

Context.prototype.acceptsCharsets = function () {
  return this.accept.charsets(...arguments);
};

/**
 * Return accepted language
 *
 * @param {String|Array} language(s)...
 * @return {String|Array}
 * @api public
 */

Context.prototype.acceptsLanguage = function () {
  return this.accept.language(...arguments);
};

/**
 *
 */

Context.prototype.end = function (arg) {
  return this.stream.end(arg);
};

/**
 * ctx.assert(value, [status], [msg], [properties])
 */

Context.prototype.assert = function () {
  const value = arguments[0];
  if (!value) this.throw(...arguments.slice(1));
};


/**
 * redirect url
 */

Context.prototype.redirect = function (url, alt = "/") {
  let dest = url;

  if ("back" === url) dest = this.ctx.get("Referrer") || alt;

  this.set("Location", encodeURI(dest));

  if (!HTTP_STATUS_REDIRECT_CODES[this.status]) {
    this.status = HTTP_STATUS.FOUND;
  }

  this.body = `Redirect to ${dest}`;
};


/**
 * response object
 */

Context.prototype.response = function () {
  const ctx = this;

  return new Proxy({ }, {
    get: function (target, prop, receiver) {
      if ("headers" === prop) {
        if (!target[RES_HEADERS]) target[RES_HEADERS] = Object.create(null);
        return target[RES_HEADERS];
      }

      if ("socket" === prop) return ctx.socket;
      if ("body" === prop) return ctx.body;

      return Reflect.get(target, prop, receiver);
    },
    set: function (target, prop, value, receiver) {
      if ("status" === prop) {
        const code = value;
        const sCode = Number.parseInt(code);

        if (HTTP_STATUS_CODES[sCode] == null) {
          ctx.throw(500, `Settings status ${code} is invalid.`);
          return;
        }

        this._setStatus = true;

        receiver.headers[HTTP2_HEADER.STATUS] = sCode;

      }

      return true;
    },
  });
};
