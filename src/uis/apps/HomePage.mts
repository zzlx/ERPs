/**
 * *****************************************************************************
 *
 * HomePage application
 *
 * *****************************************************************************
 */

import { useId, createElement as el, useState } from "react";

import * as C from "../components/index.mts";

const userdata = {
  name: "wangxm",
  imageSize: 45,
}

export function HomePage () {
  const nav = el(C.Nav, null, "nav");
  const h1 = el("h1", null, "Welcome");
  const img = el("img", { 
    className: "rounded-circle", 
    style: { width: userdata.imageSize, height: userdata.imageSize },
    src: "https://himg.bdimg.com/sys/portrait/item/public.1.b610c5c.378MdhaybSZVUQV8TgNl3g.jpg"
  });

  const list = el(C.List);
  const textarea = el(C.Input);

  const collapseID = useId().replace(/:/g, "_"); 

  const button = el(C.Button, {
    onClick: C.Collapse.eventHandler,
    "data-target": collapseID,
  }, "collapse");

  const collapse = el(C.Collapse, {
    id: collapseID,
  }, h1, nav, img, list);

  return el(C.Fragment, null, button, collapse);
}
