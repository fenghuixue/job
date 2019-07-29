var twoSum = function(nums, target) {
    nums.map((item, index) => {
        let index2 = nums.indexOf(target - item);
        if (index2 > -1 && index2 != index) {
            return [index, index2];
        }
    });
};
twoSum([2,7,11,15], 9)

