/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
    let res = [];
    let row = matrix.length - 1, col = matrix[0].length - 1;
    let i = 0, j = 0;
    while(row > 0 || col > 0) {
        while(col > 0 && j < col) {
            res.push(matrix[i][j]);
            ++j;
        }
        while(row > 0 && i < row) {
            ++i;
            res.push(matrix[i][j]);
        }
        while(j > 0) {
            j--;
            res.push(matrix[i][j]);
        }
        while(i > 0) {
            i--;
            res.push(matrix[i][j]);
        }
        row -= 2;
        col -= 2;
        i++;
        j++;
    }
    return res;
};

console.log(spiralOrder([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9,10,11,12]
]))