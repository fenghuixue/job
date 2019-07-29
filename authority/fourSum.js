var fourSum = function(nums, target) {
    let res = [];
    for (let i = 0; i < nums.length; i++) {
        for(let j = i + 1; j < nums.length; j++) {
            for (let k = j + 1; k < nums.length; k++) {
                for(let l = k + 1; l < nums.length; l++) {
                    if (nums[i] + nums[j] + nums[k] + nums[l] == target) {
                        res.push([nums[i], nums[j], nums[k], nums[l]].sort((a, b) => a -b));
                    }
                }
            }
        }
    }
    return res;
};

fourSum([1,0,-1,0,-2,2], 0)