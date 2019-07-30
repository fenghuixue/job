/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function(tokens) {
    let result;
    let res = [];
    const operators = {
        '+': (a, b) => b + a,
        '-': (a, b) => b - a,
        '*': (a, b) => b * a,
        '/': (a, b) => parseInt(b / a)
    };
    for (let i = 0; i < tokens.length; i++) {
        if (/\d/.test(tokens[i])) {
            res.push(tokens[i]);
        } else {
            let a = res.pop();
            if (result == void 0) result = res.pop();
            result = operators[tokens[i]](+a, +result);
        }
    }
    
    return result;
};

evalRPN(["10","6","9","3","+","-11","*","/","*","17","+","5","+"]);

