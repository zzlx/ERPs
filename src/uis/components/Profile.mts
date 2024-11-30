/**
 * Profile
 */

import React from "react";

export function Profile (props) {
  const { src, alt, ...rests } = props;

  return React.createElement("img", {
    src: src || "", 
    alt: alt || "profile",
    ...rests
  });
}
