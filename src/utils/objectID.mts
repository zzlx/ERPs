/**
 * *****************************************************************************
 *
 * object ID
 *
 * 12个字节
 *
 * * 0-3位为时间戳,
 * * 4-6为机器码,主机名称的散列值
 * * 7-8为PID,保证同一秒不同进程产生的id唯一
 * * 9-11为计数器,确保同进程同一秒产生的id 唯一
 *
 * exapmle:
 * 643922155741d4033387b635
 * 643921e760f523cd8641c138
 *
 * *****************************************************************************
 */

// Regular expression that checks for hex value
const checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');

// Unique sequence for the current process (initialized on first use)
let PROCESS_UNIQUE: Uint8Array | null = null;

export interface ObjectIdLike {
  id: string | Buffer;
  __id?: string;
  toHexString(): string;
}

export const objectID = () => null;

class ObjectID {

  toHexString(): string {
    const hexString = this.id.toString('hex');
    return hexString;
  }
}
