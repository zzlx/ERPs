/**
 * *****************************************************************************
 *
 * Markdown Editor
 *
 * *****************************************************************************
 */

import React from "react";

export class MarkdownEditor extends React.Component {
  constructor(props) {
    super(props);
    this.md = new Remarkable();
    this.handleChange = this.handleChange.bind(this);
    this.state = { value: 'Hello, **world**!' };
  }
}
