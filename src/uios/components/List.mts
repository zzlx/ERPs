/**
 * *****************************************************************************
 *
 * List component
 *
 * 数据生成逻辑优先
 * 
 * *****************************************************************************
 */

import { createElement as el, cloneElement } from "react";
import { classNames } from "../../utils/index.mts";
import { listEventHandler } from "../actions/listEventHandler.mts";

export function List (props) {
  const {
    data,
    action, row, flush, withBadge,
    onClick, onKeyDown, 
    className, 
    children, 
    ...rests 
  } = props;

  // 构建list-group-item
  const itemClass = classNames(
    "list-group-item",
    action && "list-group-item-action",
    props.disabled && "disabled",
    withBadge && "d-flex justify-content-between align-items-center",
  );

  const newChildren = [];
  let i = 0;

  if (children) {
    for (const child of children) {
      const cn = itemClass;
      if (child.props.className) cn.push(child.props);
      const newChild = cloneElement(child, {
        key: i++,
        className: cn.join(" "),
        onClick: e => { listEventHandler(e); onClick(e); },
        onKeyDown: e => { listEventHandler(e); onKeyDown(e); },
        tabIndex: -1,
      });

      newChildren.push(newChild);
    }
  }

  const cn = classNames(
    "list-group", 
    flush && "list-group-flush", 
    className,
  ); 

  return el("ul", { 
    className: cn.className, 
    tabIndex: 0, 
    ...rests 
  }, newChildren);
}
