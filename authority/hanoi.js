/**
 * @file 汉诺塔问题
 * @description 汉诺塔(Tower of Hanoi)源于印度传说中，大梵天创造世界时造了三根金钢石柱子，其中一根柱子自底向上叠着64片黄金圆盘。大梵天命令婆罗门把圆盘从下面开始按大小顺序重新摆放在另一根柱子上。并且规定，在小圆盘上不能放大圆盘，在三根柱子之间一次只能移动一个圆盘。 
 */
function hanoi(n, a, b, c) {
    if (n > 0) {
        hanoi(n-1, a, c, b); // 将n-1个盘子由a移动到b，以c为辅助柱子
        console.log('move 盘子' +  n + ' from ' + a + ' to ' + c);
        hanoi(n - 1, b, a, c); // 将n-1个盘子由b移动到c，以a为辅助柱子
    }
}

hanoi(3, 'a', 'b', 'c');



