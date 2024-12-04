/**
 * *****************************************************************************
 *
 * PageNotFound页面
 *
 * 前端未匹配页面时显示
 *
 * *****************************************************************************
 */

import React from "react";
import { Context } from "../components/index.mts";
import { debuglog } from "../../utils/index.mts";

const debug = debuglog("debug:PageNotFound");

export class NotFound extends React.Component {
  render (props) {
    const message = React.createElement("h2", {
      className: "text-center"
    }, "Page Not Found.");

    const hr = React.createElement("hr");

    return React.createElement('div', {
      className: "test",
    }, message, hr);
  }

  componentDidMount () {
    //
    debug(this.context.store.getState())

  }
}

NotFound.contextType = Context;
