/**
 * *****************************************************************************
 *
 * Dropdown component
 *
 * *****************************************************************************
 */

import React from 'react';

export function Dropdown (props) {
  const { directions, split, className, children, ...rests } = props;
  
  const cn = ['dropdown'];
  if (className) cn.push(className);

  let type = 'div';

  if (React.isValidElement(children)) {
    type = children;
    if (children.props.className) {
      cn.push(children.props.className);
    }
  }

  return React.createElement(type, {
    className: cn.join(' '),
    ...rests
  });
}

export function DropdownMenu (props) {
  const { className, children, ...rests } = props;

  const cn = ['dropdown-menu'];
  if (className) cn.push(className);

  const newChildren = React.Children(children, child => {
    const cn = [ 'dropdown-item' ];
    if (child.props.className) cn.push(child.props.className);
    return React.clone(child, {className: cn.join(' ')});
  });

  return React.createElement('div', { 
    className: cn.join(' '), 
    ...rests 
  }, newChildren);
}
