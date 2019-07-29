/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    if (nums1.length < m + n) return nums1;
    let res = [];
    let i = 0, j = 0;
    while(i < m && j < n) {
        if (nums1[i] <= nums2[j]) {
            i++;
            res.push(nums1[i]);
        } else {
            j++;
            res.push(nums2[j]);
        }
    }
    if (j < nums2.length) res = res.concat(j.slice(j));
    return res;
    
};

merge([1,2,3,4,1,2,3],4,[2,5,6],3);