/**
 * *****************************************************************************
 * React application.
 * *****************************************************************************
 */

import React from "react";

import {
  Provider,
  Switcher,
  Route,
} from "./components/index.mts";
import { createStore } from "./store/createStore.mts"; 
import { routes as routesMap } from "./routes.mts";

export function ReactApp (props = {}) {
  const store = createStore(props);

  const routes = routesMap.map((route, i) => React.createElement(Route, { 
    key: i, 
    ...route 
  }));

  const switcher = React.createElement(Switcher, {}, routes); 

  return React.createElement(Provider, {
    store: store
  }, switcher);
}
