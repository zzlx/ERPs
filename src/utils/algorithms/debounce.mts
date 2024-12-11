/**
 * *****************************************************************************
 *
 * 防抖算法(Debouncing algorithm): 高频触发结束Nms后执行一次任务函数.
 *
 * *****************************************************************************
 */

export function debounce (taskFn, ms = 256) {
  let timer;

  return function () {
    if (timer && timer['_idleTimeout']) clearTimeout(timer); // clear the timer.
    
    timer = setTimeout(() => { 
      taskFn.apply(null, arguments); 
    }, ms);
  }
}
