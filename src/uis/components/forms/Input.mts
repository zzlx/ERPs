/**
 * *****************************************************************************
 *
 * <input> Form component
 *
 * *****************************************************************************
 */

import { createElement as el, useId } from "react";
import { type ElementProps } from "../../declarations/ElementProps.d.mts";
import { onChangeHandler } from "../../actions/index.mts";
import { debuglog, classNames, debounce } from "../../utils/index.mts";

const debug = debuglog("debug:InputComponent");

const inputTypes = [
  "email",
  "search",
  "tel",
  "url",
  "number",
  "range",
  "datetime-local",
  "month",
  "time",
  "week",
  "date",
  "color",
];

interface InputProps  extends ElementProps {
  name: string;
  type: string;
  checkd?: boolean; // For checkbox or a radio button, controls whether it is selected.
  value?: string;
  group?: boolean;
  switcher?: any;
  description?: string;
  multiple?: boolean;
  min?: string | number;
  max?: string | number;
  step?: string | number;
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

  const inputId = useId();

  const children = [];
  let i = 0;

  for (const item of Object.keys(props)) {
    if (item === "label") {
      children.push( 
        el("label", { 
          key: i++, 
          id: inputId,
          className: "form-label", 
        }, label ? label : "Label")
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
        el(type === "textarea" ? "textarea" : "input", {
          key: i++,
          type: type === "textarea" ? null : type,
          className: cn,
          onChange: debounce(onChangeHandler),
          "aria-describedby": inputId,
          ...rests
        }),
      );
    }

    if (item === "description") {
      children.push(el("div", { className: "form-text", key: i++ }, description));
    }
  }

  const cn = classNames(
    className, 
    /checkbox|radio/.test(type) && "form-check",
    switcher && "form-switch",
    floating && "form-floating",
  );

  return el("div", { className: cn.toString() }, children); 
}
