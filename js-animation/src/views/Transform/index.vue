<template>
    <div>
        <input type="file" class="" @change="onchange"/>
        <div class="image-box" ref="imgRef">
            <img v-if="target" 
                width="100px"
                ref="imageTarget"
                :src="target" 
                :style="{'transform': transform}"
                @touchstart="onTouchstart" 
                @touchmove="onTouchmove" 
                @touchend="onTouchend"/>
        </div>
        <canvas ref="canvasRef" class="image-box canvas-box"></canvas>
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
            default: {
                scale: 1,
                rad: 0,
                x: 0,
                y: 0
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
            if (e.touches.length == 1) {
                this.fingers = e.touches.length;
                let startPoint = this.gesture.getPoint(e, 0);
                this.start = {
                    startPoint
                }  
            }
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
            }
            this.imageMatrix.length && (this.default = {
                ...this.default,
                ...this.matrixTo()
            });
        },
        onTouchmove(e) {
            if (e.touches.length < this.fingers) {
                return;
            }
            if (e.touches.length == 1) {
                this.fingers = e.touches.length;
                let curPoint = this.gesture.getPoint(e, 0);
                let x = curPoint.x - this.start.startPoint.x;
                let y = curPoint.y - this.start.startPoint.y;
                this.set(0, 1, x, y);
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
                this.set(this.cur.rad, this.cur.scale, 0, 0)
            }

        },
        onTouchend(e) {
            let target = this.$refs.canvasRef;
            let img = this.$refs.imageTarget;
            let ctx = target.getContext("2d");
            ctx.clearRect(0, 0, target.offsetWidth, target.offsetHeight);
            ctx.save();
            let width = img.offsetWidth;
            let height = img.offsetHeight;
            let {x, y, scale, rad} = this.matrixTo();
            console.log(x, y, scale, rad, width, height)
            ctx.translate(x + width/2*scale, y + height/2*scale);
            ctx.rotate(rad);
            // let img_x = x + width/2*scale;
            // let img_y = y + height/2*scale;
            ctx.translate(-scale * width/2,-scale * height/2);//修正画布坐标系
            ctx.drawImage(img, 0, 0, width*scale, height*scale);
            ctx.restore();

        },
        matrixTo() {
            let cos = this.imageMatrix[0];
            let sin = this.imageMatrix[1];
            let rad = Math.asin(sin);
            if (cos < 0 && sin > 0) {
                // 二象限
                rad = Math.PI - rad;
            } else if (cos < 0 && sin < 0) {
                rad = Math.PI - rad;
            } else if (cos > 0 && sin < 0) {
                rad = 2 * Math.PI + rad;
            }
            let scale = cos / Math.cos(rad);
            let x = this.imageMatrix[4];
            let y = this.imageMatrix[5];
            return {
                x, y, rad, scale
            }
        },
        set(rad, scale, x, y){
            window.requestAnimationFrame(() => {
                let curRad = rad + this.default.rad;
                this.imageMatrix = [scale*this.default.scale * Math.cos(curRad), Math.sin(curRad), -Math.sin(curRad), scale*this.default.scale * Math.cos(curRad), this.default.x + x, this.default.y + y];
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
    text-align: left;
    width: 300px;
    height: 150px;
    border: 1px solid red;
    overflow: hidden;
}
</style>
