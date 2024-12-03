/**
 * *****************************************************************************
 *
 * 下拉控件
 *
 * *****************************************************************************
 */

import { createElement as e } from "react";
import { classNames } from "../../utils/index.mts";

type SelectProps = {
  name?: string;
  tips?: string;
  options: object;
  multiple?: boolean;
  [propname: string]: any;
}

export const Options = props => props.options.map((v, k) => 
  el("option", { key: k, children: v})
);

export const Optgroup = props => el("optgroup", { 
  lable: props.label, 
  children: el(Options, { options: props.options }),
});

export const Select = (props: SelectProps) => {
  const { 
    className, options, 
    tips,
    size, 
    children, 
    ...rests 
  } = props;

  const opts = Array.isArray(options) 
    ? el(Options, { options })
    : Object.keys(options).map((v, k) => 
        el(Optgroup, { key: k, label: v, options: options[v] })
      );

  const cn = classNames(
    "form-select", 
    "mb-3", 
    size ? `form-select-${size}` : false,
    className,
  ); 

  return e("select", { className: cn.className, ...rests }, opts, children);
}
