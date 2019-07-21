/**
 * @file 获取基本手势
 * @author zq
 */

export default class Gesture {
    constructor() {

    }
    getPoint(e, index) {
        return {
            x: Math.round(e.touches[index].pageX),
            y: Math.round(e.touches[index].pageY)
        }
    }
    getVector(p1, p2) {
        let x = Math.round(p1.x - p2.x);
        let y = Math.round(p1.y - p2.y);
        return {x, y}
    }
    getVectorLength(vct) {
        return Math.sqrt(vct.x * vct.x + vct.y * vct.y)
    }
    getVectorRad(vct1, vct2) {
        let len1 = this.getVectorLength(vct1);
        let len2 = this.getVectorLength(vct2);
        // 两个向量的夹角公式  cosα = a*b/|a||b|
        // 弧度值
        let rad = Math.acos((vct1.x * vct2.x + vct1.y * vct2.y) / (len1 * len2));
        return rad;
    }
    transToAngle(rad) {
        // 弧度转角度
        return rad/Math.PI * 180;
    }
    getOffset(el) {
        let rect = el.getBoundingClientRect();
        let offset = {
            left: rect.left + + document.body.scrollLeft,
            top: rect.top + + document.body.scrollTop,
            width: el.offsetWidth,
            height: el.offsetHeight
        }
        return offset;
    }
    getBasePoint(el) {
        let offset = this.getOffset(el);
        let x = offset.left + el.getBoundingClientRect().width / 2,
            y = offset.top + el.getBoundingClientRect().width / 2;
        return {x: Math.round(x), y: Math.round(y)}
    }

} 