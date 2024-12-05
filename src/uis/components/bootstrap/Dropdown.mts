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

/**
 * 下拉框控制
 *
 */

function dropdownEventHandler (e) {
  if (e.currentTarget.tagName === "A") { 
    e.preventDefault(); // 禁用默认行为
  }

  const button = e.currentTarget;
  const parent = e.currentTarget.parentNode;
  const menu = parent.querySelector(".dropdown-menu");

  if (window.getComputedStyle(menu, null)["position"] === "absolute") {

    let position = "bottom";
    if (parent.classList.contains("dropdown")) position = "bottom"; 
    if (parent.classList.contains("dropup")) position = "top"; 
    if (parent.classList.contains("dropleft")) position = "left"; 
    if (parent.classList.contains("dropright")) position = "right"; 

    const b = e.currentTarget.getBoundingClientRect();
    const m = menu.getBoundingClientRect();
    const d = document.body.getBoundingClientRect();

    // 超出右边界
    if (b.x + b.width - d.width > 0) {
      menu.setAttribute("style",`top: ${b.y + b.height}px; left: -${d.width - b.x - b.width}px;`);
    }

    // 超出下边界

  } 

  if (e.type === "blur" || (e.type === "keydown" && e.key === "Escape")) {
    menu.classList.remove("show"); 
  }

  if (e.type === "click") {
    if (!menu.classList.contains("show")) {
      e.currentTarget.focus();
      const removeShow = e => menu.classList.remove("show");

      // 注册blur事件
      button.addEventListener("blur", removeShow);

      // 注册mouseenter事件
      menu.addEventListener("mouseenter", e => {
        if (e.target === menu) button.removeEventListener("blur", removeShow);
      });

      // 注册mouseout事件
      menu.addEventListener("mouseleave", e => {
        if (e.target === menu) button.addEventListener("blur", removeShow);
      });
    }
    //menu.classList.add("collapsing");
    menu.classList.toggle("show");
  }
}
