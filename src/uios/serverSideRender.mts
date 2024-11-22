/**
 * *****************************************************************************
 *
 * Server side render function.
 *
 * *****************************************************************************
 */

import ReactDOMServer from "react-dom/server";
import { ReactApp } from "./ReactApp.mts";

export default function serverSideRender (initialState) {
  const app = ReactApp(initialState);
  return ReactDOMServer.renderToString(app);
}
