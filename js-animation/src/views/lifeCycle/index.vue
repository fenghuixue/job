<template>
    <div class="life-cycle">
        
    </div>
</template>
<script>
import myVue from './myVue.js';
export default {
    name: 'lifeCycle',
    data () {
        return {
            top: 0,
            left: 0,
            timer: ''
        };
    },
    created() {
        new myVue();
    },
    mounted () {
        
    },
    updated() {
        
    },
    methods: {
        

    }
}
</script>

<style lang="less" scoped>
.life-cycle {
    flex: 1;
}
</style>
