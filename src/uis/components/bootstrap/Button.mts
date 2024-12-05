/**
 * *****************************************************************************
 *
 * Button Component
 *
 * *****************************************************************************
 */

import { createElement as e } from "react";
import { type _ElementProps } from "../_ElementProps.d.mts";
import { classNames } from "../../utils/index.mts";

interface ButtonProps extends _ElementProps {
   link: string;
   theme: string;
   outline: boolean;
}

export function Button (props: ButtonProps) {
  const { 
    link, theme, outline, lg, sm, block, // 样式配置
    onClick, onKeyDown,
    type, role, value, className, children, ...rests // 元素属性
  } = props;

  const cn = classNames(
    "btn",
    theme ? `btn-${theme}` : "btn-primary",
    "d-print-none",
    outline && "btn-outline",
    lg ^ sm && lg && "btn-lg",
    sm ^ lg && sm && "btn-sm",
    link && "btn-link",
    block && "btn-block",
    props.disabled && "disabled",
    className,
  );

  // 设置button类型
  const button = type && /submit|reset/.test(type) 
    ? "input" 
    : props.href ? "a" : "button";

  return e(button, {
    onClick: onClick ? onClick : eventHandler,
    onKeyDown: onKeyDown ? onKeyDown : eventHandler,

    className: String(cn),
    type: type ? type : button === "a" ? null : "button",
    role: role ? role : button === "a" ? "button" : null,
    value: button === "input" ? value ? value : children : null,
    children: button === "input" ? null : children, 
    ...rests,
  });
}


/**
 * event handler
 */

function eventHandler(e) {
  const bt = e.currentTarget;

  if (bt.dataset["dismiss"]) {
    switch (bt.dataset["dismiss"]) {
      case "modal": 
        return modalHandler(e); 
      default: break;
    }
  }

  if (bt.dataset["toggle"]) {
    switch (bt.dataset["toggle"]) {
      case "modal": 
        return modalHandler(e); 
      case "collapse": 
        return collapse(e);
      case "dropdown": 
        return dropdown(e);
      default: 
        break;
    }
  }

  if (bt.dataset["print"]) {
    return window.print();
  }

  if (bt.dataset["readFile"]) {
    const target = bt.dataset["target"];
  }
}

/**
 *
 */

function handleFile (e) {
  const file = e.target.files[0]; 
  const fileReader = new FileReader();

  fileReader.addEventListener("load", e => { 
    const content = e.target.result;
    window.sessionStorage.setItem(file.name, content)
    //const data = csvToJSON(content);
    // 处理data数据
  });

  fileReader.readAsText(file);
}
