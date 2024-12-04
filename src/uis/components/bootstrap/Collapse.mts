/**
 * *****************************************************************************
 *
 * Collapse Component
 *
 * *****************************************************************************
 */

import React from "react";
import { classNames, debuglog } from "../../utils/index.mts";

const debug = debuglog("debug:collapse");

export function Collapse (props) {
  const { className, horizontal, show, ...rests} = props;

  const cn = classNames(
    "collapse",
    horizontal && "collapse-horizontal",
    show && "show",
    className,
  );

  return React.createElement("div", { 
    className: cn.className,
    ...rests
  });
}

/**
 *
 *
 */

export function collapseEventHandler (e) {
  e.preventDefault(); // prevent default actions
  
  
  const target = e.currentTarget.dataset["target"];
  const collapse = document.querySelectorAll(target);
  debug(collapse);

  for (const item of collapse) {
    if (e.key === "Escape") { item.classList.remove("show"); continue; }
    if (e.type === "keydown" && e.key === "Enter" || e.type === "click") {
      item.classList.toggle("show");
      e.currentTarget.focus();
      const toggle = e.currentTarget;
      const rm = () => item.classList.remove("show");
      
      // 鼠标进入时注销blur事件
      e.currentTarget.parentNode.addEventListener("mouseenter", () => {
        toggle.removeEventListener("blur", rm, {once: true});
      });

      // 鼠标移出时绑定blur事件
      e.currentTarget.parentNode.addEventListener("mouseleave", () => {
        toggle.addEventListener("blur", rm, {once: true});
      });
    }
  }

}

Collapse.eventHandler = collapseEventHandler;
