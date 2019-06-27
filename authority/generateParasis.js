var index = 0;
var generateParenthesis = function(n) {
    let res = [];
    generateDFS(n, n, '', res);
    return res;
};

function generateDFS(left, right, cur, res) {
    // console.log('----------', left, right, cur)
    index++;
    if (left > right) return;
    if (!left && !right) res.push(cur);
    console.log('--------', left, right, cur)
    if (left) generateDFS(left-1, right, cur + '(', res);
    if (right) generateDFS(left, right -1, cur + ')', res);
    // console.log(left, right, cur)
}

generateParenthesis(3);
console.log(index)
