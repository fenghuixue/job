<template>
    <div>
        
    </div>
</template>
<script>

import promiseMixin from './promiseMixin';
import { setTimeout } from 'timers';

export default {
    data () {
        return {
           
        };
    },
    mounted () {
        promiseMixin();
        let p1 = new Promise((resolve, reject) => {
            setTimeout(function () {
                resolve('p1---');
            }, 2000)
        });
        let p2 = new Promise((resolve, reject) => {
            setTimeout(function () {
                resolve('p2---');
            }, 1000)
        })
        new Promise((resolve, reject) => {}).some([p1, p2]).then(res => {
            console.log('some', res)
        }, err => {
            console.error('some', err)
        })
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
