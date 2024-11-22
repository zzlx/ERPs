/**
 * *****************************************************************************
 *
 * Accordion Component
 *
 * data：[ 
 *   { header: 'header1', body: 'strings', show: true },
 *   ...
 * ]
 *
 * *****************************************************************************
 */

import { createElement as e } from 'react';
import { RawHtml } from './RawHtml.mts';
import { eventHandler } from '../actions/eventHandler.mts';

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
