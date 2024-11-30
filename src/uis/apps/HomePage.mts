/**
 * *****************************************************************************
 *
 * HomePage application
 *
 * *****************************************************************************
 */

import { Fragment, createElement as el, useState } from "react";

import {
  Nav,
  List,
  Input,
} from "../components/index.mts";

const userdata = {
  name: "wangxm",
  imageSize: 45,
}

export function HomePage () {
  const nav = el(Nav, null, "nav");
  const h1 = el("h1", null, "Welcome");
  const img = el("img", { 
    className: "rounded-circle", 
    style: { width: userdata.imageSize, height: userdata.imageSize },
    src: "https://himg.bdimg.com/sys/portrait/item/public.1.b610c5c.378MdhaybSZVUQV8TgNl3g.jpg"
  });

  const list = el(List);
  const textarea = el(Input);

  return el(Fragment, null, h1, nav, img, list);
}
