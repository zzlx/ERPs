/**
 * *****************************************************************************
 *
 * 多行文本域组件
 *
 * *****************************************************************************
 */

import { createElement as e } from "react";
import { classNames } from "../../utils/index.mts";

interface TextareaProps {
  cols?: number;
  rows?: number;
  wrap?: string; // soft/hard/off
  resize?: string; // both/horizontal/vertical/none
}

export function Textarea (props) {
  const { className, ...rests } = props;
  const cn = calssNames("form-control", className);

  return el("textarea", { className: cn.className, ...rests });
}
