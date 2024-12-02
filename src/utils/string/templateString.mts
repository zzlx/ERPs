/**
 * *****************************************************************************
 *
 * 模板字符串: 实现类似模板字符串``的功能
 *
 * *****************************************************************************
 */

export function templateString (str, obj) {
  let retval = "";
  let flag = false;
  let start;

  for (let i = 0; i < str.length; i++) {

    // 解析遇到$
    if (str[i] === "$" && str[ i + 1 ] === "{") {
      flag = true;
      start = i + 2; // 
      continue;
    }

    if (!flag) {
      retval += str[i]; // 转储字符串至retval
      continue;
    }

    if (str[i] === "}") {
      flag = false;
      retval += match(str.slice(start, i), obj);
      continue;
    }
  }

  return retval;
}

/**
 * 从对象中取值
 */

export function match (str, obj) { 
  let o = obj;

  const keys = str.split(".");

  for (const key of keys) {
    if (o[key] == null) { o = ""; break; }
    o = o[key];
  }

  return o;
}
