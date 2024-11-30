/**
 * *****************************************************************************
 *
 * Picture 
 *
 * 图片框,可为不同的设备提供多个版本的显示源，以获得最佳显示尺寸及效果
 *
 * *****************************************************************************
 */

import { createElement as e } from "react";

type ImageProps = {
  src: string;
}

export function Image (props) {
  const { alt, ...rests } = props;

  return e("img", {
    alt: alt,
    ...rests
  });
}
