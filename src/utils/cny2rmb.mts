/**
 * *****************************************************************************
 *
 * 人民币小写转大写
 * A = "零壹贰叁肆伍陆柒捌玖"
 * U = "分角元拾佰仟万拾佰仟亿"
 *
 * *****************************************************************************
 */

const cnSplitRegex = /[\u4e00-\u9fa5]/g;
const cnNums = "零,壹,贰,叁,肆,伍,陆,柒,捌,玖".split(cnSplitRegex);
const cnIntRadice = ["", "拾", "佰", "仟"];
const cnIntUnits = ["", "万", "亿", "兆"];
const cnDecUnits = ["角", "分", "毫", "厘"];
const cnInteger = "整";
const cnIntLast = "元";
const maxNum = 9999999999999999.99;

export function cny2rmb (amount) {
  let integerNum;
  let decimalNum;
  let chineseStr = "";
  let parts;
  if (amount === "") { return ""; }
  amount = parseFloat(amount);
  if (amount >= maxNum) {
      return "";
  }
  if (amount === 0) {
      chineseStr = cnNums[0] + cnIntLast + cnInteger;
      return chineseStr;
  }
  amount = amount.toString();
  if (amount.indexOf(".") === -1) {
      integerNum = amount;
      decimalNum = "";
  } else {
      parts = amount.split(".");
      integerNum = parts[0];
      decimalNum = parts[1].substr(0, 4);
  }
  if (parseInt(integerNum, 10) > 0) {
      let zeroCount = 0;
      const IntLen = integerNum.length;
      for (let i = 0; i < IntLen; i++) {
      const n = integerNum.substr(i, 1);
      const p = IntLen - i - 1;
      const q = p / 4;
      const m = p % 4;
      if (n === "0") {
          zeroCount++;
      } else {
          if (zeroCount > 0) {
          chineseStr += cnNums[0];
          }
          zeroCount = 0;
          chineseStr += cnNums[parseInt(n, 10)] + cnIntRadice[m];
      }
      if (m === 0 && zeroCount < 4) {
          chineseStr += cnIntUnits[q];
      }
      }
      chineseStr += cnIntLast;
  }
  if (decimalNum !== "") {
      const decLen = decimalNum.length;
      for (let i = 0; i < decLen; i++) {
      const n = decimalNum.substr(i, 1);
      if (n !== "0") {
          chineseStr += cnNums[Number(n)] + cnDecUnits[i];
      }
      }
  }
  if (chineseStr === "") {
      chineseStr += cnNums[0] + cnIntLast + cnInteger;
  } else if (decimalNum === "") {
      chineseStr += cnInteger;
  }
    return chineseStr;
}
