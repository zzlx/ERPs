/**
 * *****************************************************************************
 *
 * Container component
 *
 * 提供一个容器组件
 *
 * @param {bool} props.fluid
 * @param {string} props.breakpoint
 * @return {obj} React element
 * @api public
 *
 * *****************************************************************************
 */

import React from 'react';

export function Row (props) {
  const { className, ...rests } = props;

  const cn = [
    'row',
    className,
  ].filter(Boolean).join(' ');

  return React.createElement('div', { className: cn, ...rests });
}
