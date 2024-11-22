/**
 * *****************************************************************************
 *
 * Badge Component
 *
 * *****************************************************************************
 */

import { createElement as e } from "react";
import { classNames } from "../../utils/index.mts";

type BadgeProps = {
  theme?: string;
}

export function Badge (props: BadgeProps) {
  const { 
    className, 
    pill, 
    theme, 
    ...rests 
  } = props;

  const cn = classNames(
    "badge",
    pill && "badge-pill",
    theme && `badge-${theme}`,
    className,
  );

  // return e("sup", { className: cn, ...rests }); 
  return e("span", { className: cn, ...rests }); 
}
