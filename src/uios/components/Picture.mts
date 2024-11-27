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
import { Image } from "./Image.mts";

export function Picture (props) {
  const { src, sources, ...rests } = props;

  const Sources = Array.isArray(sources) 
    ? sources.map((source, index) => {
      return e('source', { 
        srcset: source.src,
        media: source.media, 
        key: index,
      });
    })
    : null;

  const Img = e(Image, { src: src, ...rests, });
  
  return e("picture", null, Sources, Img);
}
