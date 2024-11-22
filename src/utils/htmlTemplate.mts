/**
 * *****************************************************************************
 *
 * *****************************************************************************
 */

import { templateString } from "./templateString.mts";

export function htmlTemplate (template) {
  const data = Object.assign({}, {
    charset: "utf-8",
    viewport: "width=device-width, initial-scale=1.0",
    title: "首页|Home",
    description: "",
    keywords: "",
    styles: "/assets/css/styles.css",
    importmap: {
      imports: {
        // "react": "/assets/es/react.mts",
        // "react-dom": "/assets/es/react-dom.mts",
        "lodash": "https://cdn.jsdelivr.net/npm/lodash@latest/lodash.js"
      }
    },
    app: `/assets/es/index.mjs${
      process.env.NODE_ENV === "development" ? "?env=development" : ""
    }`,
    root: "",
    error: "",
  }, arguments[1]);

  if (Array.isArray(data.keywords)) data.keywords = data.keywords.join(",");

  if (typeof data.importmap !== "string") {
    data.importmap = JSON.stringify(data.importmap);
  }

  return templateString(template, data); 
}
