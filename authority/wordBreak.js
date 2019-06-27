/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
// var wordBreak = function(s, wordDict) {
//     let res = []
//     for(let i = 0; i < wordDict.length; i++) {
//         let reg = new RegExp('^' + wordDict[i]);
//         if (!reg.test(s)) continue;
//         if (s.length == wordDict[i].length) {
//             res.push(wordDict[i])
//         } else {
            
//             let subList = wordBreak(s.slice(wordDict[i].length), wordDict);
//             subList && subList.map(item => {
//                 res.push(wordDict[i] + ' ' + item);
//             });
//         }
//     }
//     return res;
// };

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
    let res = [];
    let dp = new Array(s.length + 1).fill(false);
    dp[0] = [];
    for(let i = 1; i < wordDict.length; i++) {
        for(let j = 0; j < i; j++) {
            if (dp[j] && wordDict.includes(s.substr(j, i -j))) {
                if (!dp[j].length) {
                    dp[j] = [s.substr(j, i -j)];
                } else {
                    dp[i] = [];
                    dp[j].map((item, index) => {
                        dp[i][index] = item + ' ' +  s.substr(j, i -j);
                    });
                }
                
            }
       }
    }
    console.log(dp)
    return dp[s.length];
};

console.log(wordBreak("catsanddog", ["cat","cats","and","sand","dog"]))