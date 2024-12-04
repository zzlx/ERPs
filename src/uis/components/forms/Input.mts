/**
 * *****************************************************************************
 *
 * <input> Form component
 *
 * *****************************************************************************
 */

import { createElement as el, useId } from "react";
import { type _ElementProps } from "../_ElementProps.d.mts";
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

interface InputProps  extends _ElementProps {
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
        el("input", {
          key: i++,
          type: type,
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

/**
 *
 *
 */

function eventHandler (e) {
  if (e.target.type === 'radio') { return radioHandler(e); }
  if (e.target.type === 'checkbox') { return checkboxHandler(e); }
  if (e.target.type === 'range') { return rangeHandler(e); }
}


/**
 *
 *
 */

function rangeHandler (e) {
  e.target.focus();

  if(e.target.nextSibling.classList.contains('form-label')) {
    const label = e.target.nextSibling;
    label.innerHTML = e.target.value;
  }
}

/**
 * 多选框控制
 *
 * 支持特性:
 *
 * * switch样式
 * * indeterminatae选项
 *
 */

export function checkboxHandler (e) {

  e.target.focus(); // get focus 

  debug(e);

  // Handle Keyboard event
  if (e.type === 'keydown') {

    if (e.key === 'Escape') {
      e.stopPropagation();
      e.preventDefault();
      e.target.checked = false;
    }

    if (e.key === 'Enter') {
      sp(e);
      pd(e);
      e.target.click();
    }

    if (e.key === 'Space') {
      e.target.click();
    }

    return;
  }

  if (e.type === 'keyup') { return }


  // condition:1
  // switcher 
  if (e.target.parentNode.classList.contains('form-switch')) {
    // 

  } else { // checkbox
    // condition:2
    // 从checked状态取消选取时 置interminate为true
    if (e.target.checked === false) {
      e.target.indeterminate = true; 
      e.target.classList.add("indeterminate");
    } // end of condition 2

    // condition:3
    if (e.target.checked === true && e.target.classList.contains("indeterminate")) {
      e.target.indeterminate = false; 
      e.target.classList.remove("indeterminate");
      e.target.checked = false;
    } // end of condition 3

  } // end of else
}


/**
 *
 *
 *
 */

export function radioHandler (e) {
  const radios = t => t.querySelectorAll('input[type="radio"]');
  const isPNode = t => radios(t).length > 1;
  const pNode = isPNode(e.target.parentNode) 
    ? e.target.parentNode 
    : isPNode(e.target.parentNode.parentNode)
      ? e.target.parentNode.parentNode
      : null;

  // 单选逻辑,仅保留当前选项处于被选状态
  if (pNode) {
    radios(pNode).forEach(r => { r.checked = false; });
    e.target.checked = true;
  }
}

