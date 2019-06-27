/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    let digitsArr = digits.split('');
    let letterMap = {
        "2": "abc",
        "3": "def",
        "4": "ghi",
        "5": "jkl",
        "6": "mno",
        "7": "pqrs",
        "8": "tuv",
        "9": "wxyz"
    };
    if (digitsArr.length < 2) return digitsArr[0] ? letterMap[digitsArr[0]].split('') : [];
    return digitsArr.reduce((a, b) => {
        let arr = [];
        let arr1 = Array.isArray(a) ? a : letterMap[a].split('');
        let arr2 = letterMap[b].split('');
        for(let i = 0; i < arr1.length; i++) {
            for(let j = 0; j < arr2.length; j++) {
                arr.push(arr1[i] + arr2[j]);
            }
        }
        return arr;
    });
    
};
console.log(letterCombinations(''));

// /**
//  * @param {string} digits
//  * @return {string[]}
//  */
// var letterCombinations = function(digits) {
//     let letterMap = {
//         "2": "abc",
//         "3": "def",
//         "4": "ghi",
//         "5": "jkl",
//         "6": "mno",
//         "7": "pqrs",
//         "8": "tuv",
//         "9": "wxyz"
//     };
//     let sum = [];
//     let digitsArr = digits.split('');
//     if (!digitsArr.length) return sum;
//     for (let i = 0; i < digitsArr.length; i++) {
//         sum = i ? combination(sum, digitsArr[i]) : letterMap[digitsArr[i]].split(''); 
//     }
//     function combination(a, b) {
//         let arr = [];
//         let arr1 = a;
//         let arr2 = letterMap[b].split('');
//         for(let i = 0; i < arr1.length; i++) {
//             for(let j = 0; j < arr2.length; j++) {
//                 arr.push(arr1[i] + arr2[j]);
//             }
//         }
//         return arr;
//     }
//     return sum

    
// };
// console.log(letterCombinations('235689'));
