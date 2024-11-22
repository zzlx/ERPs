/**
 * *****************************************************************************
 *
 * Browser environment render application.
 *
 * *****************************************************************************
 */

import ReactDOM from "react-dom/client";
import { ReactApp } from "./ReactApp.mts";
import { deviceDetect } from "../utils/index.mts";

export default function browserRender () {
  const d = deviceDetect(navigator.userAgent);

  printHelloWorld({
    helloWorld: "🚩欢迎使用前端UI系统!", 
    sysinfo: {
      doc: `${location.origin}/docs`,
      os: d.device,
      browser: d.browser,
      env: process.env.NODE_ENV,
    },
  });

  // const html = document.getElementsByTagName("html")[0];
  //
  // 初始化状态数据
  const initialState = Object.assign({}, {
    location: {
      pathname: location.pathname,
    },
  }, window.__PRELOADED_STATE__);

  // 存在服务端渲染等页面使用hydrate方法渲
  // 空的容器对象上使用render方法渲染
  // 判断container是否存在服务端渲染内容
  // 判断方法需要补充完善一下,要能识别到服务端渲染的标记
  let container = document.getElementById("root");

  if (null == container) {
    container = document.createElement("div");
    container.id = "root";
    document.body.appendChild(container);
  }

  const el = ReactApp(initialState);

  if (container.innerHTML) {
    ReactDOM.hydrateRoot(container, el);
  } else {
    const root = ReactDOM.createRoot(container);
    root.render(el);
  }
}

/**
 * print hello word
 *
 */

export function printHelloWorld (data) {
  console.groupCollapsed(data.helloWorld); // eslint-disable-line
  console.log(JSON.stringify(data.sysinfo)); // eslint-disable-line
  console.groupEnd(); // eslint-disable-line
}
