/**
 * *****************************************************************************
 *
 * Offcanvas component
 *
 * build offcanvas component with React
 *
 * *****************************************************************************
 */

import React from 'react';

export function Offcanvas (props) {
  const { title, placement, className, children, ...rest } = props;

  const t  = React.createElement('h5', { className: 'offcanvas-title' }, title);
  const b  = React.createElement('button', { 
    className: 'btn-close', 
    type: 'button', 
    'data-bs-dismiss': "offcanvas",
    onClick: eventHandler,
  });

  const header = React.createElement('div', {
    className: 'offcanvas-header',
  }, t, b);
  const body = React.createElement('div', {
    className: 'offcanvas-body',
  }, children);

  return React.createElement('div', {
    className: [
      'offcanvas',
      `offcanvas-${['start', 'end', 'top', 'bottom'].includes(placement) 
          ? placement 
          : 'bottom'
      }`,
      className,
    ].filter(Boolean).join(' '),
    tabIndex: "-1",
    ...rest
  }, header, body);
}

function eventHandler (e) {
  if (e.target.dataset) {
    if (e.target.dataset.bsDismiss === 'offcanvas') return dismissOffcanvas(e);
    if (e.target.dataset.bsToggle === 'offcanvas') return toggleOffcanvas(e);
  }
}


export function dismissOffcanvas (e) {
  const offcanvas = e.target.parentNode.parentNode;
  offcanvas.classList.remove('show');
}

export function toggleOffcanvas (e) {
  const target = e.target.dataset.bsTarget;
  const offcanvas =  document.getElementById(target);
  offcanvas.classList.toggle('show');
}


