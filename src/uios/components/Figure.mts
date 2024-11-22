/**
 * *****************************************************************************
 *
 * Figure component
 *
 * for displaying related images and text 
 *
 * *****************************************************************************
 */

import { createElement as e } from "react";

interface FigureProps {
  className?: string;
  src?: string;
  caption?: string;
  [propName]: any;
}

export function Figure (props: FigureProps) {
  const { className, src, caption, ...rests } = props;
  const cn = [ "figure", className ].filter(Boolean).join(" ");

  return e("figure", { className: cn, ...rests }, 
      e("img", { src: src, className: "figure-img img-fluid rounded", }),
      e("figcaption", { className: "figure-caption text-center" }, caption)
  );
} 
