<template>
    <div>
        <button @click="onBind">绑定事件start</button>
        <button @click="offBind">移除事件start</button>
        <button @click="onceBind">once绑定事件start</button>
        <button @click="emitBind">触发事件emit</button>
    </div>
</template>
<script>
import EventCenter from './eventCenter';

export default {
    data () {
        return {
           myEc: ''
        };
    },
    mounted () {
        this.myEc = new EventCenter();
        console.log(this.myEc)

    },
    methods: {
        onBind() {
            this.myEc.on('start', (e) => {
                console.log('on-start', e)
            })
        },
        offBind() {
            this.myEc.off('start');
        },
        onceBind() {
            this.myEc.once('once', (e) => {
                console.log('once-start', e)
            })
        },
        emitBind() {
            this.myEc.emit('once');
            this.myEc.emit('start');
        }

    }
}
</script>

<style lang="less" scoped>
.home {
    flex: 1;
}


</style>
