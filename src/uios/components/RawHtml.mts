/**
 * *****************************************************************************
 *
 * Raw html container
 *
 * *****************************************************************************
 */

import React from "react";

export function RawHtml (props) {
  const { children, ...rests } = props;

  return React.createElement("div", {
    ...rests,
    dangerouslySetInnerHTML: { __html: children }
  });
}
