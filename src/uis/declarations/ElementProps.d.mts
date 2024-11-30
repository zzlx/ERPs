/**
 * *****************************************************************************
 * 
 *
 * *****************************************************************************
 */

export interface ElementProps {
  children?: any;
  dangerouslySetInnerHTML?: object;
  ref?: any;
  suppressContentEditableWarning?: boolean;
  suppressHydrationWarning?: boolean;
  style?: object;
  accessKey?: string;
  autoCapitalize?: string;
  className?: string;
  contentEditable?: boolean;
  dir?: string; // ltr or rtl
  // data-*
  // aria-*
  draggable?: boolean;
  enterKeyHint?: string;
  htmlFor?: string;
  hidden?: boolean | string;
  id?: string; // Specifies a unique identifier for this element
  is?: string; // If specified, the component will behave like a custom element.
  inputMode?: string; // display what kind of keyboard(text/number/telephone).
  itemProp?: string; // which property element represents for structured data crawlers
  lang?: string;
  onAnimationEnd?: any;
  onAnimationIteration?: any;
  onAnimationStart?: any;
  onAuxClick?: any; // A MouseEvent handler. Fires non-primary mouse button was clicked
  onClick?: any;
  onMouseDown?: any;
  onMouseEnter?: any;
  onMouseLeave?: any;
  onMouseOver?: any;
  onMouseUp?: any;
  onPointerDown?: any;
  onPointerEnter?: any;
  onPointerLeave?: any;
  onPointerMove?: any;
  onPointerUp?: any;
  onContextMenu?: any; // mouseEvent handler, the user tries to open a context menu.
  onCopy?: any; // Fires when the user tries to copy something into the clipboard.
  onCut?: any;
  onDrag?: any;
  onDrop?: any;
  onBlur?: any;
  onFocus?: any;
  onKeyDown?: any;
  onKeyUp?: any;
  onKeyPress?: any;
  onKeyUp?: any;
  onPaste?: any;
  onScroll?: any;
  onTouchEnd?: any;
  onTouchStart?: any;
  onTouchMove?: any;
  onTransitionEnd?: any;
  onWheel?: any;
  role?: string; // Specifies the element role explicitly for assistive technologies.
  slot?: string; // pecifies the slot name when using shadow DOM
  tabIndex?: number;
  title?: string;
}

