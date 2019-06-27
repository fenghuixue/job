/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
    let res = [];
    let arr = [];
    let count = 0;
    findNQueen(1, n);
    function findNQueen(k, n) {
        if(k > n) {
            res.push([...arr]);
            count++;
        } else {
            for (let i = 1; i <= n; i++) {
                if (check(k, i)) {   //检查是否满足条件
                    arr[k] = i;
                    findNQueen(k + 1, n);   //递归查找
                }
            }
        }
        
    }
    //检验第row行的col列上是否可以摆放皇后
    function check(row, col) {
        for(let i = 1; i < row; i++) {
            if (col == arr[i] || Math.abs(row - i) == Math.abs(col - arr[i])) {
                return 0;
            }
        }
        return 1;
    }
    function getResult(res) {
        let outerArr = [];
        for(let k = 0; k < res.length; k++) {
            let resArr = [];
            for(let i = 1; i < res[k].length; i++) {
                let str = '';
                for(let j = 0; j < n; j++) {
                    if (res[k][i] == j + 1) {
                        str += 'Q';
                    } else {
                        str += '.';
                    }
                }
                resArr.push(str);
            }
            outerArr.push(resArr);
        }
        return outerArr;
    }
    return getResult(res);
    
};