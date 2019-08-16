<template>
    <div ref="leftBox" class="left-box">
        
    </div>
</template>
<script>
import {handleError} from '../utils/error';

export default {
    name: 'Left',
    data () {
        return {
           
        };
    },
    components: {
        
    },
    created() {
        
    },
    mounted () {
        handleError({
            message: "a is not defined",
            stack: "ReferenceError: a is not defined",
            __proto__: Error
        }, this.$refs.leftBox, 'create hooks')

    },
    methods: {
        

    }
}
</script>

<style lang="less" scoped>
.left-box {
    width: 100px;
    height: 300px;
    background: rgb(216, 96, 176);
}
</style>
