/**
 * *****************************************************************************
 *
 * Constants variables
 *
 * *****************************************************************************
 */

interface Levels {
  FATAL: number;
  ERROR: number;
  WARN: number;
  INFO: number;
  DEBUG: number;
  TRACE: number;
}

// 定义日志级别
export const LOG_LEVELS: Levels = {
  FATAL: 0, // 致命错误
  ERROR: 1, // 系统错误,中止特定操作,但不影响系统运行.例如，当第三方 API 返回错误时
  WARN:  2, // 运行时的条件不良或异常。例如，主数据源不可用时，使用备数据源
  INFO:  3, // 用户驱动或特定于应用程序的事件可在此级别记录.例如，如服务的启动或关闭
  DEBUG: 4, // 用于故障排除的调试信息
  TRACE: 5, // 记录应用程序行为的每个可能的细节
};

// 定义系统常量
export const CLEAR_PAGE: string = process && process.platform === "win32"
  ? "\x1B[2J\x1B[0f"
  : "\x1B[2J\x1B[3J\x1B[H";
export const CLEAR_LINE: string = "\x1B[0K";
export const MOVE_LEFT: string = "\x1B[1000D";
export const MOVE_UP: string = "\x1B[1A";
export const BLOCK_EMPTY: string = "░";
export const BLOCK_CELL: string = "▓";
export const TABLE_INTER: string = "┊";
