/**
 * 
 * @param {获取全排列} n 
 */
function getFullArraged(n) {
    let a = Array(n).fill(1).map((item, index) => item = item + index);
    let m = n - 1;
    Perm(a,0,m);
}
function Perm(list, k, m) {
    if (k == m) {
        let s = '';
        for(let i=0 ;i<=m ;i++) {
            s += list[i]; 
        }
        console.log(s)
    } else {
        for(let i=k;i<=m;i++) {
            [list[i], list[k]] = [list[k], list[i]];
	 		Perm(list,k+1,m);
            [list[i], list[k]] = [list[k], list[i]];
        }
    }
}   


getFullArraged(4);
