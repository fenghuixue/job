<template>
    <Pop :isShow="true"
        :btns="btns"
        :btnFns="btnFns"
    ></Pop>
</template>
<script>
import Pop from './pop.vue'
export default {
    name: 'app',
    data() {
        return {
            btns: ['11', '22'],
            btnFns: [() => {
                console.log(111)
            }, ()=> {
                console.log(2222)
            }]
        }
    },
    computed: {

    },
    watch: {

    },
    components: {
        Pop
    },
    methods: {

    },
    mounted() {

    },

}
</script>
<style lang="less" scoped>

</style>
