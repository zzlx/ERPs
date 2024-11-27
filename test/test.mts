/**
 * *****************************************************************************
 *
 *
 * *****************************************************************************
 */

import path from "node:path";
import XLSX from "xlsx";

// 测试读取xlsx表数据
const file = path.join(process.env.HOME, "Desktop", "housingEstate.xlsx")
const workbook = XLSX.readFile(file);

console.log(workbook);
