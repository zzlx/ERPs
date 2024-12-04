/**
 * *****************************************************************************
 *
 * Accordion Component
 *
 * 手风琴效果组件
 *
 * data：[ 
 *   { header: 'header1', body: 'strings', show: true },
 *   ...
 * ]
 *
 * *****************************************************************************
 */

import { createElement as e } from 'react';
import { RawHtml } from '../RawHtml.mts';

export function Accordion (props) {
  const { 
    alwaysOpen, 
    flush, 
    data,
    className, 
    ...rests 
  } = props;

  const cn = [
    "accordion",
    flush && "accordion-flush",
    className,
  ].filter(Boolean).join(' ');

  const dataChildren = Array.isArray(data) ? data.map((d, i) => {
    return e(Item, { 
      key: i, ...d 
    });
  }) : null;

  return e('div', { 
    className: cn, 
    'data-always': alwaysOpen ? true : false,
    children: dataChildren,
    ...rests 
  });
}

const Header = props => e("h2", {
  className: "accordion-header",
}, e("button", {
  type: "button",
  className: `accordion-button${props.show ? "" : " collapsed"}`,
  onClick: eventHandler,
  children: props.children
})); // End of Header

const Body = props => e('div', {
  className: `accordion-collapse collapse${props.show ? " show" : ""}`
}, typeof props.children === 'string' ? e(RawHtml, {
  className: "accordion-body",
  children: props.children,
}) : React.isValidElement(props.children) ? e('div', {
  className: "accordion-body",
  children: props.children,
}) : null
); // End of Body

const Item = props => e("div", {
  className: "accordion-item",
  children: [
    e(Header, { 
      key: 0,
      show: props.show,
      children:  props.header
    }),
    e(Body, { 
      key: 1,
      show: props.show, 
      children: props.body 
    }),
  ],
});

export function eventHandler (e) {

  if (e.type === 'click' && e.target.classList.contains("accordion-button")) {
    // record collapsed status
    const isCollapsed = e.target.classList.contains('collapsed'); 
    // location accordion
    const a = e.target.parentNode.parentNode.parentNode; 
    
    if (a.dataset.always === 'false') {
      a.childNodes.forEach(item => {
        item.firstChild.firstChild.classList.add('collapsed');
        item.lastChild.classList.remove('show');
      });
    }

    // 根据情况切换显示状态
    if (isCollapsed) {
      e.target.classList.remove('collapsed');
      e.target.parentNode.nextSibling.classList.add("show");
    } else {
      e.target.classList.add('collapsed');
      e.target.parentNode.nextSibling.classList.remove("show");
    }

    return; // finish event handler
  } // End of accordion click event
}
