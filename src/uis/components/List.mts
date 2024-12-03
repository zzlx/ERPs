/**
 * *****************************************************************************
 *
 * List component
 *
 * *****************************************************************************
 */

import { createElement as el, cloneElement } from "react";
import { classNames } from "../utils/index.mts";

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

  return el("ul", { className: cn.className, ...rests }, listItems, children);
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
