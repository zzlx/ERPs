/**
 * *****************************************************************************
 *
 * 防抖算法(Debouncing algorithm)
 *
 * 高频触发结束Nms后执行一次操作任务.
 *
 * *****************************************************************************
 */

export function debounce (fn, ms = 256) {
  let timer;

  return function () {
    if (timer && timer['_idleTimeout']) clearTimeout(timer); // clear the timer.
    timer = setTimeout(() => { 
      fn.apply(null, arguments); 
    }, ms);
  }
}
