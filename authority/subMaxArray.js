/**
 * @param {number[]} nums
 * @return {number}
 */
// 暴力法
// var maxSubArray = function(nums) {
//     let sumArr = [];
//     if (nums.length < 2) return getSum(nums);
//     let sum = nums[0];
//     for(let i = 0; i < nums.length; i++) {
//         for (let j = i + 1; j <= nums.length; j++) {
//             if (sum < getSum(nums.slice(i, j))) {
//                 sum = getSum(nums.slice(i, j));
//                 sumArr = nums.slice(i, j);
//             }
//         }
//     }
//     function getSum(arr) {
//         return arr.reduce((a, b) => a + b);
//     }
//     return sum;
    
// };

// 分治法
// var maxSubArray = function(nums) {
//     return getSubArr(0, nums.length - 1, nums);
// };

// var getSubArr = function(low, high, arr) {
//     if (low == high) {
//         return arr[low]
//     }
//     let mid = Math.ceil((low + high)/2);
//     let leftMax = getSubArr(low, mid - 1, arr);
//     let rightMax = getSubArr(mid, high, arr);
    
//     let sumMidLeft = arr[mid - 1], sumMidRight = arr[mid];
//     let temp = 0;
//     for (let i = mid - 1; i >= low; i--) {
//         temp += arr[i]
//         if (temp > sumMidLeft) {
//             sumMidLeft = temp;
//         }
//     }
//     temp = 0;
//     for (let j = mid; j <= high; j++) {
//         temp += arr[j]
//         if (temp > sumMidRight) {
//             sumMidRight = temp;
//         }
//     }
//     return Math.max(leftMax, rightMax, sumMidLeft + sumMidRight); 
// }

// 动态规划法
var maxSubArray = function(nums) {
    let dp = [];
    dp[0] = nums[0];
    let max = dp[0];
    for(let i = 1; i < nums.length; i++) {
        // 如果 前i-1为负数， 则从i开始计数
        dp[i] = nums[i] > nums[i] + dp[i - 1] ? nums[i] : dp[i - 1] + nums[i];
        if (max < dp[i]) {
            max = dp[i];
        }
    }
    return max;
};


let result = maxSubArray([-2,1,-3,4,-1,2,1,-5,4])
console.log(result)
