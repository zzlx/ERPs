/**
 * *****************************************************************************
 *
 * Switcher组件
 *
 * 用于选择路由
 *
 * *****************************************************************************
 */

import React from "react";
import { Context } from "./Context.mts";
import { matchPath } from "../../utils/index.mts";

export class Switcher extends React.PureComponent {
  render () {
    const location = this.props.location
      ? this.props.location
      : this.context.store
        ? this.context.store.getState("location")
        : { pathname: "/" };

    let match, matchedRoute;

    for (const route of this.props.children) {
      if (match == null && React.isValidElement(route)) {
        const path = route.props.path || route.props.from;
        const opts = Object.assign({}, route.props, { path });
        match = matchPath(location.pathname, opts);
        if (match) { 
          matchedRoute = route; 
          break; 
        }
      }
    }

    return match == null ? null : React.cloneElement(matchedRoute, {
      location, 
      match,
    });
  }
}

Switcher.contextType = Context;
