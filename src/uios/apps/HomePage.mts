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
  Button,
} from "../components/index.mts";

export function HomePage () {
  const button = el(Button, null, "button");
  const nav = el(Nav, null, "nav");

  return el(Fragment, null, button);
}
