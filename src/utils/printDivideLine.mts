/**
 * *****************************************************************************
 *
 * 打印分隔线
 *
 * *****************************************************************************
 */

export function printDivideLine (symbol = '=') {
  const columns = process && process.stdout ? process.stdout.columns : 80;
  return new Array(columns > 80 ? 80 : columns).join(symbol);
}
