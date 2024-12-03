#include <stdio.h>
#include <string.h>
#include <limits.h>
#include <float.h>

#define TRUE  1
#define FALSE 0
typedef unsigned char BYTE;

/* 函数声明 */
int max(int num1, int num2);

int main()
{
     
   /* 局部变量定义 */
   int a = 100;
   int b = 200;
   int ret;
   //char z = "c";

   /* 调用函数来获取最大值 */
   ret = max(a, b);
   //printf( "Max value is : %d\n", ret );
   //char z = "abc";
   //strcat(z,"def");

   printf("%d",EOF);
  FILE *fp;

   fp = fopen("/tmp/test.txt", "w+");
   fprintf(fp, "This is testing for fprintf...\n");
   fputs("This is testing for fputs...\n", fp);
   fclose(fp);
   return 0;
}

/* 函数返回两个数中较大的那个数 */
int max(int num1, int num2) {
   /* 局部变量声明 */
   int result;

   if (num1 > num2)
      result = num1;
   else
      result = num2;

   return result;
}
