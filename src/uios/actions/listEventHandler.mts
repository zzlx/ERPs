/**
 * *****************************************************************************
 *
 *
 * *****************************************************************************
 */

export function listEventHandler (e) {
  const list = e.target.parentNode;

  if (e.type === "click") {
    const items = list.children;
    for (let i = 0; i < items.length; i++) {
      items.item(i).classList.remove("active")
    }

    let now = e.target;
    now.classList.add("active");
    now.focus();
    return;
  }

  e.preventDefault();
  let now = e.target;
  let next = null;

  // Enter
  if (/Enter/.test(e.key)) {
    if (now === list) return null;
    e.preventDefault();
    now.click();
  } 

  // Next
  if (/ArrowRight|ArrowDown/.test(e.key) || (/Tab/.test(e.key) && !e.shiftKey)) {
    if (now === list) { // 如果焦点位于container, 默认选中第1个
      now = list.firstChild;
      now.classList.add("active");
      now.focus();
      return;
    }
    next = now.nextSibling;
  }

  // Prev
  if (/ArrowLeft|ArrowUp/.test(e.key) || (/Tab/.test(e.key) && e.shiftKey)) {
    next = now.previousSibling;
  }

  if (!next) return;
  now.classList.remove("active");
  next.classList.add("active");
  next.focus();
}

