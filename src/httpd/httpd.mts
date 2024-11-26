/** 
 * *****************************************************************************
 * 
 * http service daemon
 *
 *
 * *****************************************************************************
 */

import fs from "node:fs/promises";
import http2 from "node:http2";
import path from "node:path";
import tls from "node:tls";
import util from "node:util";

import { settings } from "../settings/index.mts";
import { argvParser, flattenArray } from "../utils/index.mts";
import { spawn } from "../utils.node/index.mts";
import { app } from "../koa/app.mts";

const debug = util.debuglog("debug:httpd");
const is_main_process =  import.meta.filename === process.argv[1];
if (is_main_process) { main(process.argv.slice(2)); } // execute program

/**
 * http daemon program
 */

export function main () {
  const argv = flattenArray(Array.prototype.slice.call(arguments));
  const paramMap = argvParser(argv);

  // no paramater condition
  if (paramMap.size === 0) {
    debug("@todos:检测服务状态,服务未启动时,自动启动");
    return;
  }

  // loop parameters
  for (const param of paramMap.keys()) {
    switch (param) {
      case "--start":
        if (is_main_process) start(); // run https
        else spawnHttpd(param); // run in child process
        break;
      case "--stop":
        debug("#TODOS:receive stop command.");
        break;
      case "--restart":
        debug("#TODOS:receive restart command.");
        break;
      case "--status": 
        getStatue();
        break;
      default:
        console.warn("param:%s is not supported. see 'erpd --help'", param);
        break;
    }
  }

}

/**
 * *****************************************************************************
 * Functions
 * *****************************************************************************
 */

/**
 * spawn httpd process
 */

function spawnHttpd (command) {
  spawn(import.meta.filename, command);
}

/**
 *
 *
 */

function getStatue () {
  // 
  sendCommand("STATUE");
}

/*
 * start httpd
 */

async function start () {
  getStatue();
  const server = await createServer();
  server.on("stream", app.callback());
  server.listen({ host: settings.host, port: settings.port }, listenHandler);
}

/**
 *
 *
 */

async function createServer () {

  const options = { 
    allowHTTP1: true,
    // ca: settings.ca,
    key: await fs.readFile(settings.privateKey),
    cert: await fs.readFile(settings.cert),
    passphrase: settings.passphrase,
    requestCert: false, // 客户端证书支持,特殊应用支持
    rejectUnauthorized: false,

    // sigalgs: 
    // ciphers: 
    // clientCertEngine: 
    // dhparam
    // ecdhCurve
    // origins: [],
    // privateKeyEngine
    // pfx: fs.readFileSync("etc/ssl/localhost_cert.pfx"),
    // ticketKeys: crypto.randomBytes(48), 

    handshakeTimeout: 120 * 1000, // milliseconds
    sessionTimeout: 300, // seconds
  };

  const server = http2.createSecureServer(options);
  server.on("error", serverSideErrorHandler);
  server.on("connection", secureConnectionHandler);

  return server;
}

/**
 * listen handler
 */

function listenHandler () {
  debug("%j", Object.assign({ status: "listen" }, this.address()));
}

/**
 * secure connection handler
 */

function secureConnectionHandler (socket) {
  const server = this;

  socket.on("data", buffer => {
    try {
      // 过滤数据帧
      if (buffer.readUInt8(0) !== 0b11111111) return; // 根据第一个字节判断

      const data = buffer.slice(1); 
      const message = JSON.parse(data.toString());

      if (message.token !== settings.passphrase) return; // 过滤socket

      debug(`received command: ${message.command}`);

      switch(message.command) {
        case "STOP": 
          debug("Received STOP command, service is closing...");
          server.close(() => {
            debug("Server is closed successfully.");
          });
          break;

        case "RESTART": 
          debug("Received RESTART command, service is restarting...");
          // debug(server);

          server.close(() => {
            debug("Server is closed successfully.");
          });
          break;
        default:
          debug("Unknown Server Action.");
      }
    } catch (e) {
      debug("frame filter", e); // 不做处理
    }
  });
}

/**
 *
 *
 */

function sendCommand (command) {
  const options = {
    host: settings.host,
    port: settings.port,
    ca: settings.cert,
    rejectUnauthorized: false,
    checkServerIdentity: (hostname, cert) => {
      debug(hostname);
      debug(cert);
      return null;
    },
  };

  const client = tls.connect(options, () => {
    process.stdin.pipe(client);
    process.stdin.resume();
  });

  client.on("secureConnect", clientSecureConnectionHandler);
  client.on("error", clientSideErrorHandler);
  client.on("end", clientSideEndEventHandler); 

  function clientSecureConnectionHandler () {
    const client = this;

    // byte1: token
    const byte1 = new Uint8Array(1);
    byte1.set([0b11111111], 0); // surfix

    const data = Buffer.from(JSON.stringify({
      token: settings.passphrase,
      authorized: client.authorized,
      command: command,
    }));

    client.end(Buffer.concat([byte1, data]));
  }

}

/**
 *
 *
 */

function clientSideEndEventHandler () {
  debug("client ended.");
}

/**
 *
 *
 */

/**
 * client-side error handler
 *
 */

function clientSideErrorHandler (e) {
  switch (e.code) {
    case "ECONNREFUSED":
      debug("控制信号被拒绝");
      break;
    case "ECONNRESET":
      debug("链接被重置");
      break;
    default:
      debug("主控程序客户端错误:", e.code);
      break;
  }
}

/**
 *
 *
 * handshack limits:
 *
 * > TLSv1.3 does not support renegotiation.
 *
 * tls.CLIENT_RENEG_LIMIT default: 3.
 * tls.CLIENT_RENEG_WINDOW default: 600(10 minutes)
 *
 * to mitigate the denial-of-service attacks, 
 * renegotiation is limitted to three times ervery ten minutes.
 *
 * the default renegotiation limits should not be modified without a full
 * understanding of implications and risks.
 *
 * error event is emitted when the threshold is exceeded.
 *
 */

function clientHandshake () {


}

/**
 * server-side error handler
 */

export function serverSideErrorHandler (e) {
  const server = this;

  if (e.code === "EADDRINUSE") {

    // 生产环境端口被占用时提醒端口被占用
    if (process.env.NODE_ENV === "production") {
      return console.error(
        "[%s]:%s is in use, try again later.", 
        e.address, 
        e.port,
      );
    }
    
    // 开发环境端口被占用时
    if (process.env.NODE_ENV === "development") {
      // 需要强制使用端口
      if (process.channel && process.send) {
        const message =  {
          message: "服务器端口已被占用,请确认服务是否已启动",
          pid: process.pid,
          // address: this.address(),
        };

        debug("给主进程发送信息:", message);
        process.send(message);

        debug(server);
        return;
      } 

      sendCommand("STOP");
    }
  } else {
    debug("Unhandled error:", e);
  }
}
