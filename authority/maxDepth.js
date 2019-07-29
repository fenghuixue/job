/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
    if (!root) return 0;
    const queue = [root]; // [3]
    let depth = 0;
    while (queue.length !== 0) {
        depth++; //1
        const len = queue.length; // 1
        for (let i = 0; i < len; i++) {
            if (queue[i].left) queue.push(queue[i].left); // [3, 9]
            if (queue[i].right) queue.push(queue[i].right); // [3, 9, 20]
        }
        queue.splice(0, len); // [3]
    }
    return depth;
};

// function TreeNode(val) {
//     this.val = val;
//     this.left = this.right = null;
// }
// let arr = [3,9,20,null,null,15,7, 6];
// let TreeNode = arr.map(item => {
//     this.val = item;
// })

maxDepth()