<template>
<div id="app">
    <div class="link-container">
        <router-link v-for="route in router_list" :key="route.name" :to="{path: route.path}" :class="['mt-link-title', {'active': route.path == $route.path}]">{{route.name}}</router-link>
    </div>
    <router-view class="content-container"></router-view>
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
        router_list() {
            return routers.options.routes
        }
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
.link-container {
    width: 100px;
    text-align: left;
    padding: 20px; 
    .mt-link-title {
        display: block;
    }
}
.content-container {
    margin-left: 100px;
    position: relative;
    background: #fff; 
    padding: 20px; 
    min-width: 800px;  
}
.active {
    color: rgb(241, 8, 8);
}
</style>
