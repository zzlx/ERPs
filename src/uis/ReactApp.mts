/**
 * *****************************************************************************
 *
 * UI Operation System.
 *
 *
 * *****************************************************************************
 */

import React from "react";
import { Provider } from "./components/Provider.mts";
import { Switcher } from "./components/Switcher.mts";
import { Route } from "./components/Route.mts";
import { createStore } from "./store/createStore.mts"; 
import { routes as routesMap } from "./routes.mts";

// import { default as lodash }from "lodash";
// console.log(lodash);

/**
 * UI Application.
 */

export function ReactApp (props = {}) {
  const store = createStore(props);

  const routes = routesMap.map(
    (route, i) => React.createElement(Route, { key: i, ...route })
  );
  const switcher = React.createElement(Switcher, {}, routes); 

  return React.createElement(Provider, {
    store: store
  }, switcher);
}
