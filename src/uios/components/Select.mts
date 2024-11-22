/**
 * *****************************************************************************
 *
 * 下拉选项组件
 *
 * *****************************************************************************
 */

import { createElement as e } from "react";
import { classNames } from "../../utils/index.mts";

type SelectProps = {
  name?: string;
  tips?: string;
  options: [option: string];
  [propname: string]: any;
}

export function Select (props: SelectProps) {

  const { 
    className, options, children, 
    tips,
    size, 
    ...rests 
  } = props;

  const optionArray = [
    e("option", { selected: true }, tips),
  ]; 

  Array.isArray(options) && options.map((v, k) => {
      const isObjectOpt = typeof v === "object";
      const value = isObjectOpt ? v.value : v;
      const text = isObjectOpt ? v.text : v;
      optionArray.push(e("option", { value: value, key: k }, text));
  });

  const cn = classNames(
      "form-select", 
      "mb-3", 
      size ? `form-select-${size}` : false,
      className,
  ); 

  return e("select", { className: cn, ...rests }, children, optionArray);
}
