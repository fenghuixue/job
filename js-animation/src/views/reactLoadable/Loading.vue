<template>
    <div class="loading-box">
        <span class="loading-dot loading-dot-1"></span>
        <span class="loading-dot loading-dot-2"></span>
        <span class="loading-dot loading-dot-3"></span>
    </div>
</template>
<script>

export default {
    data () {
        return {
           
        };
    },
    mounted () {
        
    },
    methods: {
       

    }
}
</script>

<style lang="less" scoped>
    .loading-box {
        position: relative;
    }
    .loading-dot {
        position: absolute;
        display: inline-block;
        border-radius: 50%;
        margin-right: 5px;
    }
    .loading-dot-1 {
        background: rgb(228, 113, 5);
        animation: load1 1s ease infinite;
    }
    .loading-dot-2 {
        top: 0;
        background: rgb(230, 136, 14);
        animation: load2 1s ease infinite;
    }
    .loading-dot-3 {
        top: 10px;
        background: rgba(248, 182, 96, 0.904);
        animation: load3 1s ease infinite;
    }
    @keyframes load1 {
        0%, 100% {
            left: 0;
            top: 10px;
            width: 30px;
            height: 30px;
        }
        25%, 75% {
            top: 0;
            width: 45px;
            height: 45px;
        }
        50% {
            top: 10px;
            left: 90px;
            width: 30px;
            height: 30px;
        }
    }
    @keyframes load2 {
        0%, 100% {
            top: 0;
            left: 35px;
            width: 45px;
            height: 45px;
        }
        25% {
            top: 10px;
            left: 70px;
            width: 30px;
            height: 30px;
        } 
        75% {
            top: 10px;
            left: 0;
            width: 30px;
            height: 30px;
        }
    }
    @keyframes load3 {
        0%, 100% {
            top: 10px;
            left: 90px;
            width: 30px;
            height: 30px;
        }
        25%, 75% {
            top: 0;
            width: 45px;
            height: 45px;
        }
        50% {
            top: 10px;
            left: 0;
            width: 30px;
            height: 30px;
        }
    }


</style>
