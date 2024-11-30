/**
 * *****************************************************************************
 *
 * withOnLine
 *
 * 监测网络状态
 * 
 * *****************************************************************************
 */

import { Component, createElement } from "react";

export class WithOnLine extends Component {
  constructor(props) {
    super(props);
    this.state = { onLine: true };
  }

  updateOnlineStatus() {
    this.setState({
      onLine: window.navigator.onLine,
    }); 
  }

  render() {
    return createElement(Component, {
      onLine: this.state.onLine, 
      ...this.props,
   });
  }

  componentDidMount() {
    window.addEventListener('online',  this.updateOnlineStatus);
    window.addEventListener('offline', this.updateOnlineStatus);
  }

  componentWillUnmount() {
    window.removeEventListener('online',  this.updateOnlineStatus);
    window.removeEventListener('offline', this.updateOnlineStatus);
  }
}
