<template>
    <div>
        <button @click="onBind">绑定事件start</button>
        <button @click="offBind">移除事件start</button>
        <button @click="onceBind">once绑定事件once</button>
        <button @click="emitBind">触发事件emit</button>
    </div>
</template>
<script>
import EventCenter from './eventCenter';

export default {
    data () {
        return {
           myEc: '',
        };
    },
    mounted () {
        this.myEc = new EventCenter();

    },
    methods: {
        onBind() {
            this.myEc.on('start', this.callbackFunc)
        },
        offBind() {
            this.myEc.off('start');
        },
        onceBind() {
            this.myEc.once('once', this.callbackFunc)
        },
        emitBind() {
            this.myEc.emit('once');
            this.myEc.emit('start');
        },
        callbackFunc(name) {
            console.log(`callback-${name}执行了...`)
        }

    }
}
</script>

<style lang="less" scoped>
.home {
    flex: 1;
}


</style>
