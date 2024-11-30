/**
 * *****************************************************************************
 *
 * Breadcrumb Component
 * 
 * Indicate the current page’s location within a navigational hierarchy 
 * that automatically adds separators via CSS.
 *
 * *****************************************************************************
 */

import { createElement as e } from "react";
import { classNames } from "../utils/index.mts";

type BreadcrumbItem = {
  href: string;
  item: string;
  active?: boolean;
}

type BreadcrumbProps = {
  data: [item: BreadcrumbItem];
  divider?: string;
  [ propname: string]: any;
}

export function Breadcrumb(props: BreadcrumbProps) {
  const { data, divider, ...rests } = props;

  return e("nav", { 
    style: divider ? { 
      "--bs-breadcrumb-divider" : `'${divider || "/"}'`
    } : null,
    "aria-label": "breadcrumb", 
    ...rests
  }, breadcrumb(data));
}

/**
 * breadcrumb list
 */

function breadcrumb (data) {
  return e("ol", { className: "breadcrumb" }, data.map((v, i) => {
    const isLastItem = i === (data.length - 1);

    return e(BreadcrumbItem, {
      key: i,
      active: v.active ? v.active : isLastItem,
      href: v.href,
      children: v.item,
    });
  }));
}

/**
 * Breadcrumb Item
 */

function BreadcrumbItem (props) {
  const {
    className,
    active, // is current position
    href,
    children,
    ...rests
  } = props;

  const cn = classNames("breadcrumb-item", className, active && "active");
  const child = active ? children : e("a", { href: href || "#"}, children);

  return e("li", { 
    className: cn, 
    "aria-current": active ? "page" : null, 
    ...rests 
  }, child);
}
