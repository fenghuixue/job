<template>
    <div>
        <button @click="onBind">绑定事件start</button>
        <button @click="offBind">移除事件start</button>
        <button @click="onceBind">once绑定事件once</button>
        <button @click="emitBind">触发事件emit</button>
        <button @click="vueOnce">触发原生once</button>
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
            this.myEc.on('start', this.callbackFunc.bind(this, 'start'))
        },
        offBind() {
            this.myEc.off('start');
        },
        onceBind() {
            this.myEc.once('once', this.callbackFunc.bind(this, 'once'))
        },
        emitBind() {
            this.myEc.emit('once');
            this.myEc.emit('start');
            this.$emit('vueOnce');
        },
        callbackFunc(name) {
            console.log(`callback-${name}执行了...`)
        },
        vueOnce() {
            this.$once('vueOnce', this.callbackFunc.bind(this, 'vueOnce'));
        }

    }
}
</script>

<style lang="less" scoped>
.home {
    flex: 1;
}


</style>
