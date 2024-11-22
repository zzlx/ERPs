/**
 * *****************************************************************************
 *
 * <input> Form component
 *
 * *****************************************************************************
 */

import { createElement as e } from "react";
import { type ElementProps } from "../declarations/ElementProps.d.mts";
import { onChangeHandler } from "../actions/index.mts";
import { debuglog, classNames, debounce } from "../../utils/index.mts";

const debug = debuglog("debug:InputComponent");

interface InputProps  extends ElementProps {
  name: string;
  type: string;
  checkd?: boolean; // For checkbox or a radio button, controls whether it is selected.
  value?: string;
  group?: boolean;
  switcher?: any;
  description?: string;
  // [propName: string]: any;
}

export function Input (props: InputProps) {
  const {
    type, disabled, className, label, description,
    switcher,
    floating,
    group,
    ...rests
  } = props;


  const children = [];
  let i: number = 0;

  for (const item of Object.keys(props)) {
    if (item === "label") {
      children.push( 
        e("label", { className: "form-label", key: i++ }, label ? label : "Label")
      );
    }

    if (item === "type") {
      const cn = classNames(
          /checkbox|radio/.test(type)
            ? "form-check-input"
            : /range/.test(type) 
              ? "form-range"
              : "form-control", 
          type === "color" && "form-control-color",
      );

      children.push(
        e(type === "textarea" ? "textarea" : "input", {
          key: i++,
          type: type === "textarea" ? null : type,
          className: cn,
          onChange: debounce(onChangeHandler),
          ...rests
        }),
      );
    }

    if (item === "description") {
      children.push(e("div", { className: "form-text", key: i++ }, description));
    }
  }

  const cn = classNames(
      className, 
      /checkbox|radio/.test(type) && "form-check",
      switcher && "form-switch",
      floating && "form-floating",
      // group && "input-group",
      //"mb-3",
  );

  return e("div", { className: cn }, children); 
}
