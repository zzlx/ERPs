/**
 * *****************************************************************************
 *
 * List component
 *
 * *****************************************************************************
 */

import { createElement as el, cloneElement } from "react";
import { classNames } from "../../utils/index.mts";

export function List (props) {
  const { 
    data,       // list data
    flush,      // flush 
    numbered,   // numbered
    horizontal, // 水平排版
    className,  // 
    children,   // 
    ...rests 
  } = props;

  const listItems = el(ListItem, { data });

  const cn = classNames(
    "list-group", 
    flush && "list-group-flush",
    numbered && "list-group-numbered",
    horizontal && "list-group-horizontal",
    className
  );

  return el("ul", { 
    className: cn.className, 
    ...rests 
  }, listItems, children);
}

interface ListItemProps {
  data: object;
}

export function ListItem (props: ListItemProps) {
  const { data, className } = props;

  const cn = classNames(
    "list-group-item",
    className,
  );

  return Array.isArray(data)
    ? data.map((v, k) => {
        return typeof v === "object"
          ? el("li", { key: k , className: cn.className }, el("a", {
              ...v
            }))
          : typeof v === "string"
            ? el("li", { key: k , className: cn.className }, v)
            : null;
      })
    : null; 
}

export function listEventHandler (e) {
  const list = e.target.parentNode;

  if (e.type === "click") {
    const items = list.children;
    for (let i = 0; i < items.length; i++) {
      items.item(i).classList.remove("active")
    }

    let now = e.target;
    now.classList.add("active");
    now.focus();
    return;
  }

  e.preventDefault();
  let now = e.target;
  let next = null;

  // Enter
  if (/Enter/.test(e.key)) {
    if (now === list) return null;
    e.preventDefault();
    now.click();
  } 

  // Next
  if (/ArrowRight|ArrowDown/.test(e.key) || (/Tab/.test(e.key) && !e.shiftKey)) {
    if (now === list) { // 如果焦点位于container, 默认选中第1个
      now = list.firstChild;
      now.classList.add("active");
      now.focus();
      return;
    }
    next = now.nextSibling;
  }

  // Prev
  if (/ArrowLeft|ArrowUp/.test(e.key) || (/Tab/.test(e.key) && e.shiftKey)) {
    next = now.previousSibling;
  }

  if (!next) return;
  now.classList.remove("active");
  next.classList.add("active");
  next.focus();
}
