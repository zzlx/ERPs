#include <stdio.h>

int check_enddianess() 
{
  // 联合体
  // 联合体占用的字节数与其成员中最大数据类型占用的字节数相等
    union {
        int i;
        char c;
    } un;

    un.i = 1;
    // 如果是大端机则是0x1000 0000 0000 0000
    // 如果是小端机则是0x0000 0000 0000 0001
    // 由于联合体的特性，大端机ret=0(0000)，小端机ret=1(0001)
    return un.c;

    return 0;
}

int main ()
{
  int retval = check_enddianess();

  if (1 == retval) {
    printf("当前模式为小端存储\n");
  } else {
    printf("当前模式为大端存储\n");
  }

  return 0;
}
