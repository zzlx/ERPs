#include <stdio.h>


// 汉诺塔：请输入盘子数，输出盘子移动的操作步骤
//
//
void move(char from, char to) {
   printf("%c to %c\n", from, to);
}

void hanoi(int n, char a, char b, char c) {
   if (n == 1)
       move(a, c);
   else {
       hanoi(n - 1, a, c, b);
       move(a, c);
       hanoi(n - 1, b, a, c);
  }
}

void main() {
   int n;
   scanf("%d", &n);
   hanoi(n, 'A', 'B', 'C');
}
