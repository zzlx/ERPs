/**
 * *****************************************************************************
 *
 * Copyright Component
 *
 * 用于输出版权标记
 *
 * *****************************************************************************
 */

import { createElement as e } from "react";
import { classNames } from "../../utils/index.mts";

type CopyrightProps = {
  year?: number | string;
  [propname: string]: any;
}

export function Copyright (props: CopyrightProps) {
  const { 
    className, 
    children, 
    href, 
    year, 
    ...rests 
  } = props;

  const cn = classNames(className, "small");
  const currentYear = (new Date()).getFullYear(); 
  const copyright = year == currentYear ? ` © ${year}` : ` © ${year}-${currentYear}`;

  return e("div", { className: cn, ...rests }, "Copyright", copyright, children);
}
