<template>
    <div>
        <div class="quare-50" :style="{top: top + 'px', left: left + 'px'}"></div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            top: 0,
            left: 0,
            timer: ''
        };
    },
    mounted () {
        let cbkHandler = function(data){
            console.log('你查询的航班结果是：票价 ' + data.msg + ' 元，');
        };
        // 提供jsonp服务的url地址（不管是什么类型的地址，最终生成的返回值都是一段javascript代码）
        let url = "http://fe1.static.bst.meitu.com/dsp_admin/page/remote.js";
        // 创建script标签，设置其属性
        let script = document.createElement('script');
        script.setAttribute('src', url);
        // 把script标签加入head，此时调用开始
        document.getElementsByTagName('head')[0].appendChild(script); 
        let p = 10;
        this.move2((p) => {
            return p;
        });
    },
    methods: {
        step() {
            
        },
        move() {
            this.timer = setInterval(this.frame, 10);
        },
        frame() {
            this.left += 5;
            this.top = Math.sqrt(2 * this.left);
            if (this.left == 500) {
                clearInterval(this.timer);
            }
        },
        move2(delta, duration) {
            let to = 500
            this.animate({
                delay: 10,
                duration: duration || 1000, // 1 sec by default
                delta: delta,
                step: function(delta) {
                    this.left = to * delta + "px"    
                }
            })
            
        },
        animate(opts){
            let start = new Date;
            let id = setInterval(function(){
                var timePassed = new Date - start;
                var progress = timePassed / opts.duration;
                if(progress > 1) progress = 1;
                var delta = opts.delta(progress);
                opts.step(delta);
                if(progress == 1) clearInterval(id);
            }, opts.delay || 10);
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
</style>
