/**
 * *****************************************************************************
 *
 * sum algerthem
 *
 * *****************************************************************************
 */

import { plus } from "./plus.mts";

export function sumifs () {
	let sum = 0;
	for (const v of arguments) sum = plus(sum, v);
	return sum;
}
