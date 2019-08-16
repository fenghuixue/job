<template>
    <div class="life-cycle">
        <div id="container">
            <p></p>
        </div>
        <Left></Left>
    </div>
</template>
<script>
import myVue from './myVue.js';
import Left from './components/Left';
export default {
    name: 'lifeCycle',
    data () {
        return {
            top: 0,
            left: 0,
            timer: ''
        };
    },
    components: {
        Left
    },
    created() {
        this.vueInstance = new myVue({
            name: 'myVue'
        });

        
    },
    mounted () {
        

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
