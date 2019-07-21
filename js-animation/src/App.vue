<template>
<div id="app">
    <router-view></router-view>
</div>
</template>

<script>
import routers from './router';


export default {
    data () {
        return {
            
        };
    },
    computed: {
        
    },
    mounted() {
        
    }
}
</script>


<style lang="less">
html,
body {
    margin: 0 0;
    padding: 0 0;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color: #efefef;
    min-height: 100vh;
    display: flex;
    padding: 30px 20px;
}
#nav {
    padding: 20px;
    width: 100px;
    .nav-item {
        display: block;
        font-weight: bold;
        color: #2c3e50;
        text-align: left;
        &.router-link-exact-active {
            color: #42b983;
        }
    }
}

.canvas {
    margin: 0px auto;
    background-color: #fff;
}

.com-box {
    width: 300px;
}
</style>
