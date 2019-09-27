<template>
    <div>
        <ChildTest :propToChild="propToChild"/>
    </div>
</template>

<script>

import ChildTest from './children.vue';
import {proxy} from './proxy.js'

export default {
    name: 'ProxyTest',
    data () {
        return {
            propToChild: {
                name: 'zhangqian',
                value: 1,
                arr: [1,3, 4,5],
                childObj: {
                    name: 'child',
                    value: 1.1
                },
                booleanItem: false
            }
        };
    },
    mounted () {
        proxy(this, 'propToChild', 'childObj');
        console.log(this.childObj)
    },
    components: {
        ChildTest
    },
    methods: {
       
    }
}
</script>

<style lang="less" scoped>
.home {
    flex: 1;
}


</style>
