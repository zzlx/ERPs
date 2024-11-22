/**
 * *****************************************************************************
 *
 * textarea component
 *
 * render a multiline text input.
 * 
 * 文本框字数限制
 * 
 * *****************************************************************************
 */

import { createElement as el } from "react";
import { classNames } from "../../utils/index.mts";

type TextareaProps = {
  name: string;
  value?: string;
  [propName: string]: any;
}

export function Textarea (props: TextareaProps) {
  const { className, ...rests } = props;
  const cn = classNames("form-control", className);

  for (const item of Object.keys(props)) {
    // 
  }

  return el("textarea", { 
    className: cn, 
    ...rests 
  }); 
}
