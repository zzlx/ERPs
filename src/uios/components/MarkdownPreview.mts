/**
 * *****************************************************************************
 *
 * Markdown
 *
 * *****************************************************************************
 */

import { createElement as e } from "react";
import { remarkable } from "../../utils/index.mts";

export function MarkdownPreview (props) {
  const { markdown, ...rests } = props;
  const markup = remarkable.render(markdown); 

  return e("div", { dangerouslySetInnerHTML: {__html: markup}, ...rests });
}
