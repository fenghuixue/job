/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function(n) {
    let res = 1;
    while(n > 0) {
        let arr = res.toString().split('');
        let count = 1;
        if (arr.length == 1) return '1' + arr[0];
        let str = '';
        for(let j = 0; j < arr.length - 1; j++) {
            if (arr[j] == arr[j + 1]) {
                count++;
            } else {
                str = str + count + arr[j];
                console.log(count, str)
                count = 1;
            }
        }
        res = str;
        n--;
    }
    return res;
};