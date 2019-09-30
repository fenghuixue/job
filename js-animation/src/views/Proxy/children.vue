<template>
    <div class="child-container">
    </div>
</template>

<script>

import {validateProp} from '@/views/lifeCycle/utils/props'
export default {
    name: 'ChildTest',
    props: {
        propToChild: {
            type: [Object, Number],
        },
        validateBoolean: {
            type: Boolean,
            default: true
        }
    },
    data () {
        return {
            
        };
    },
    mounted () {
        console.log(this._myProps)
        validateProp('validateBoolean', this._myProps, this.$options.propsData, this);
    },
    methods: {
       
    }
}
</script>

<style lang="less" scoped>
.child-container {
    width: 200px;
    height: 200px;
    
}

</style>
