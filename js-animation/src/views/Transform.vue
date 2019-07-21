<template>
    <div>
        <input type="file" class="" @change="onchange"/>
        <div class="image-box">
            <img v-if="target" 
                ref="imageTarget"
                :src="target" 
                width="200px"
                :style="{'transform': transform}"
                @touchstart="onTouchstart" 
                @touchmove="onTouchmove" 
                @touchend="onTouchend"/>
        </div>
    </div>
</template>

<script>
import Gesture from './gesture';

export default {
    data () {
        return {
            target: '',
            gesture: new Gesture(),
            fingers: 0,
            imageMatrix: [],
            start: {},
            cur: {
                curPoint: {},
                curSecondPoint: {},
                curVct: {},
                curLength: 0,
                angle: 0
            },
            transform: ''
            
        };
    },
    mounted () {

    },
    methods: {
        onchange(e) {
            let f = e.target.files[0];
            this.target = window.webkitURL.createObjectURL(f) 
        },
        onTouchstart(e) {
            if (e.touches.length == 2) {
                this.fingers = e.touches.length;
                // 获取开始的点
                let startPoint = this.gesture.getPoint(e, 0);
                let startSecondPoint = this.gesture.getPoint(e, 1);
                let startVct = this.gesture.getVector(startPoint, startSecondPoint);
                let startLength = this.gesture.getVectorLength(startVct);
                this.start = {
                    startPoint,
                    startSecondPoint,
                    startVct,
                    startLength
                }
                // 获取图片的初始位置
                
                // let style = window.getComputedStyle(this.$refs.imageTarget, null)
                // let cssTrans = style.transform || style.webkitTransform;
                // if (window.getComputedStyle && cssTrans !== 'none') {
                //     this.matrixTo(cssTrans)
                // }
            }
        },
        onTouchmove(e) {
            if (e.touches.length < this.fingers) {
                return;
            }

            if (e.touches.length == 2) {
                // 实时计算 双指向量模；
                let curPoint = this.gesture.getPoint(e, 0);
                let curSecondPoint = this.gesture.getPoint(e, 1);
                let curVct = this.gesture.getVector(curPoint, curSecondPoint);
                let curLength = this.gesture.getVectorLength(curVct);
                let rad = this.gesture.getVectorRad(this.start.startVct, curVct);
                let scale = curLength / this.start.startLength;
                this.cur = {
                    curPoint,
                    curSecondPoint,
                    curVct,
                    curLength,
                    scale,
                    rad
                }
                this.set(this.cur.rad, this.cur.scale)
            }

        },
        onTouchend(e) {

        },
        matrixTo(maxtrix) {
            console.log(maxtrix)
            this.transform = maxtrix;
        },
        set(rad, scale){
            window.requestAnimationFrame(() => {
                this.imageMatrix = [scale * Math.cos(rad), scale * Math.sin(rad), -scale * Math.sin(rad), scale * Math.cos(rad), 0, 0];
                this.transform = 'matrix(' + this.imageMatrix.join(',') + ')';
            });
        }

    }
}
</script>

<style lang="less" scoped>
.home {
    flex: 1;
}

.quare-50 {
    width: 50px;
    height: 50px;
    border: 1px solid red;
    background: red;
    position: absolute;
}
.image-box {
    width: 300px;
    height: 300px;
    border: 1px solid red;
}
</style>
