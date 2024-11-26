/**
 * *****************************************************************************
 *
 * 日志记录器
 *
 * 使用正确的日志级别,记录结构化日志信息, 应当包含描述性信息、适当的背景信息,
 * 避免记录敏感信息
 * 根据日期、大小限制轮换日志，也可以根据计数或已过天数删除旧日志
 * 日志定时同步和上传（一般在凌晨，流量最小，对服务机器压力较小）,
 * 为后续监控系统接入和例行看板建设做好准备。
 *
 *
 * winston日志库介绍
 *
 * *****************************************************************************
 */

import path from "node:path";
import winston from "winston"; // 载入第三方日志管理工具
import { paths } from "../settings/paths.mts";
import { LOG_LEVELS } from "../settings/constants.mts";

const { createLogger, format, transports } = winston;

export const logger = createLogger({
  defaultMeta: {
    service: "erps",
  },
  format: format.combine(format.timestamp(), format.json()),
  level: "warn", // 默认日志级别
  levels: LOG_LEVELS,
  transports: [
    // new transports.Console({ level: "trace",/* 记录的最高级别 */ }),
    new transports.File({
      filename: path.join(paths.tmpdir, "erps.log"),
      datePattern: "YYYY-MM-DD",
      maxSize: "10g",
      maxFiles: "10d",
    }),
  ],
  exceptionHandlers: [new transports.File({ 
    filename: path.join(paths.tmpdir, "exceptions.log"),
  })],
  rejectionHandlers: [new transports.File({ 
    filename: path.join(paths.tmpdir, "rejections.log"), 
  })],
});
