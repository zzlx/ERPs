/**
 * *****************************************************************************
 * 
 * Suspense
 *
 * *****************************************************************************
 */

import React from "react";
import { isPromise } from "../../utils/index.mts";

export class Suspense extends React.Component {
  render() {
    const { fallback, children } = this.props
    const { promise } = this.state

    return React.createElement(React.Fragment, {}, promise ? fallback : children);
  }

  componentDidCatch(err) {
    if (isPromise(err)) {
      this.setState({ promise: err }, () => {
        err.then(() => this.setState({ promise: null }))
      })
    }
  }
}
