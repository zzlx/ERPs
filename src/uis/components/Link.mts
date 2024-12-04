/**
 * *****************************************************************************
 *
 * Anchor Link component
 *
 * *****************************************************************************
 */

import { createElement as e, useState} from "react";
import { classNames } from "../utils/index.mts";

interface LinkProps {
  onClick?: void;
  className?: string;
  text?: string;
  src?: string;
  alt?:string;
  disabled?: boolean;
  subMenu?: object;
  [propName: string]: any;
}

export function Link (props: LinkProps) {
  const { 
    onClick, 
    className, 
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

/**
 *
 *
 */

function clickHandler (e) {
  e.stopPropagation();
  e.preventDefault();

  // event: click nav link
  if (e.target.classList.contains('nav-link')) {
    //e.target.classList.toggle('active');
    const nav = e.target.parentNode.parentNode;
    const links = nav.querySelectorAll('a.nav-link');

    // 遍历links,取消active状态
    for (const link of links) {
      if (link === event.target) link.classList.add('active');
      else link.classList.remove('active');
    }

    const selectors = e.target.hash;
    if (null == selectors || '' === selectors) return;
    const target = document.querySelector(selectors);
    if (null == target) return; // not found
    const tabContent = target.parentNode;
    for (const item of tabContent.children) { item.classList.remove('active'); }
    target.classList.add('active');

    return;
  }
}
