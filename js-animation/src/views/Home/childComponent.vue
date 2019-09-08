<template>
    <div >
        
    </div>
</template>

<script>

export default {
    name: 'child-component',
    props: ['pName'],
    data () {
        return {
            name: '11111',
            age: '121313'
        };
    },
    computed: {
        
    },
    mounted() {
        console.log(this)
    }
}
</script>


<style lang="less">

</style>
