/**
 * *****************************************************************************
 * 
 * Suspense
 *
 * *****************************************************************************
 */

import { Component, Fragment, createElement } from "react";
import { isPromise } from "../../utils/index.mts";

export class Suspense extends Component {
  render() {
    const { fallback, children } = this.props
    const { promise } = this.state

    return createElement(Fragment, {}, promise ? fallback : children);
  }

  componentDidCatch(err) {
    if (isPromise(err)) {
      this.setState({ promise: err }, () => {
        err.then(() => this.setState({ promise: null }))
      })
    }
  }
}
