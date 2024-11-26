/**
 * *****************************************************************************
 *
 * 身份证ID解析器
 *
 * 根据身份证号字段分析计算:
 * 年龄
 * 性别
 * 出生年月日
 * 省份编码
 * 城市编码
 * 地区编码的个人信息对象
 *
 * *****************************************************************************
 */

import { isEvenNumber } from "../is/index.mts";

export const idParser = (id: string) => new Proxy({ id: id }, {
  get: function (target, property, receiver) {
    if (/sex$|gender$/.test(property)) {
      return isEvenNumber(target.id.charAt(16)) ? "female" : "male"; 
    }

    if (property === "isMale") return receiver.gender === "male"; 
    if (property === "isFemale") return receiver.gender === "female"; 
    if (property === "cityCode") return target.id.substr(0, 4);
    if (property === "regionCode") return target.id.substr(0, 6);
    if (property === "stateCode") return target.id.substr(0, 3);
    if (property === "birthday") {
      return target.id.substr(6, 8).replace(/(\d{4})(\d{2})(\d{2})/,"$1-$2-$3");
    }

    if (property === "age") {
      return ((Date.now() - Date.parse(receiver.birthday))/31536000000).toFixed();
    }

    return Reflect.get(target, property, receiver);
  },
});

// test
// console.log(idParser("401100200010104129").sex);
