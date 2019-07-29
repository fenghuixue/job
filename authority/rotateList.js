/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function(head, k) {
    if (head == null || head.next == null)
        return head
    let len = 1, tmp = head, tmp1 = head;
    while (tmp.next != null) {
        tmp = tmp.next
        len++
    }
    let step = len - k % len - 1
    while (step > 0) {
        tmp1 = tmp1.next
        step--
    }
    tmp.next = head
    let tmp2 = tmp1.next
    tmp1.next = null
    return tmp2
};

function ListNode(val) {
    this.val = val;
    this.next = null;
}
rotateRight(ListNode([1,2,3,4,5]), 2);
