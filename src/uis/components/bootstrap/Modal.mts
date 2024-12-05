/**
 * *****************************************************************************
 *
 * Modal
 *
 * *****************************************************************************
 */

import React from "react";
import { Button } from "./Button.mts";
import { classNames } from "../../utils/index.mts";

export function Modal(props) {
  const { show, children, ...rests } = props;


  const cn_dialog = ["modal-dialog"];

  if (props.scrollable) cn_dialog.push("modal-dialog-scrollable");
  if (props.centered) cn_dialog.push("modal-dialog-centered");

  const title  = React.createElement("h5", { 
    className: "modal-title"
  }, props.title || "Untitled");

  const span   = React.createElement("span", { 
    "aria-hidden": "true"
  }, "x");

  const close  = React.createElement(Button, { 
    className: "close", 
    "data-dismiss": "modal", 
    nostyle: "true",
  }, span);

  const header = React.createElement("div", { 
    className: "modal-header"
  }, title, close);

  const content= React.createElement("div", { 
    className: "modal-content"
  }, header, children);

  const dialog = React.createElement("div", { 
    className: cn_dialog.join(" "), 
    role: "document"
  }, content);

  const cn = classNames(
    "modal",
    "fade",
    show && "show",
  );

  return React.createElement("div", { 
    className: cn.className,
    tabIndex: "-1", 
    role: "dialog" 
  }, dialog);
}


/**
 *
 *
 */

function modalEventHandler(e) {
  const b = e.currentTarget;

  if (b.dataset["dismiss"] && b.dataset["dismiss"] === "modal") {
    const modal = b.parentNode.parentNode.parentNode.parentNode; 
    modal.classList.remove("show", "d-block");
    const backdrop = document.querySelector(".modal-backdrop");
    if (backdrop) document.body.removeChild(backdrop);
    document.body.classList.remove("modal-open");
  }

  if (b.dataset["toggle"] && b.dataset["toggle"] === "modal") {
    const target = b.dataset["target"];
    if (target == null) return;
    const modal = document.querySelector(target);
    if (modal.classList.contains("show")) {
      document.body.classList.remove("modal-open");

      const backdrop = document.querySelector(".modal-backdrop");
      if (backdrop) document.body.removeChild(backdrop);
      document.body.classList.remove("modal-open");
    } else {
      const backdrop = document.createElement("div");
      backdrop.classList.add("modal-backdrop", "show");
      document.body.appendChild(backdrop);
      document.body.classList.add("modal-open");
    }

    modal.classList.toggle("show");
    modal.classList.toggle("d-block");
  }
}

Modal.eventHandler = modalEventHandler;
