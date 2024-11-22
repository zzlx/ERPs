/**
 * *****************************************************************************
 *
 * Anchor Link component
 *
 * *****************************************************************************
 */

import { createElement as e, useState} from "react";
import { classNames } from "../../utils/index.mts";

interface LinkProps {
  onClick?: any;
  className?: string;
  text?: string;
  src?: string;
  alt?:string;
  disabled?: boolean;
  subMenu?: any;
  [propName: string]: any;
}

export function Link (props: LinkProps) {
  const { 
    onClick, className, 
    text,
    width, height,
    src, alt,
    subMenu, // 解决navbar组件subMenu显示数据的bug
    disabled,
    ...rests 
  } = props;

  const [active, setActive] = useState(false);

  const img = src ? e("img", { 
    src, 
    alt, 
    width,
    height,
    className: "d-inline-block text-align-top me-2"
  }) : null;

  const textWrapper = src ? e("span", { className: "", }, text) : text;
  const cn = classNames(
    disabled ? "disabled" : null,
    active == true ? "active" : null,
    "link-opacity-50-hover",
    "link-underline-success",
    className,
  );

  return e("a", { 
    className: cn,
    tabIndex: disabled ? "-1" : null,
    disabled: disabled,
    onClick: ev => { 
      ev.preventDefault();       // 阻止默认行为,主要是阻止页面刷新行为
      if (onClick) onClick(ev);  // 执行绑定的click事件处理器
      if (disabled == null) return;
    },
    ...rests
  }, img, textWrapper);
}
