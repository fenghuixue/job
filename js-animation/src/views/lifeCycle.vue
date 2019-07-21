<template>
    <div class="life-cycle">
        <div class="quare-50" :style="{left: left + 'px', top: top + 'px'}"></div>
    </div>
</template>
<script>
export default {
    name: 'lifeCycle',
    data () {
        return {
            top: 0,
            left: 0,
            timer: ''
        };
    },
    mounted () {
        Promise.resolve().then(() => {
            console.log('微任务执行了~~')
        })
        // this.top = 10;
        // this.left = 20;
        this.$nextTick(function() {
            // this.top = 10;
            console.log(11111)
        })
        setTimeout(function() {
            console.log('宏任务执行了~~~')
        });
        
    },
    updated() {
        // dom更新
        console.log('dom更新了')
    },
    methods: {
        

    }
}
</script>

<style lang="less" scoped>
.life-cycle {
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
