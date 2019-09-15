<template>
    <div>
        <el-form label-width="80px" :model="sizeform" size="mini">
            <el-form-item label="防抖">
                <el-input v-model="sizeform.name" 
                    @input="debunce(logMsg.bind(this, $event), 1000)()">
                </el-input>
            </el-form-item>
            <el-form-item label="节流">
                <el-button type="primary" @click="throtte(logMsg.bind(this, $event), 1000)()">确定</el-button>
            </el-form-item>
            <el-form-item label="节流">
                <el-button type="primary" @click="throtte(logMsg.bind(this, $event), 1000)()">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

import 'element-ui/lib/theme-chalk/index.css';
import { setTimeout } from 'timers';

export default {
    data () {
        return {
            sizeform: {
                name: ''
            },
            flag: true,
            timer: null,
        };
    },
    mounted () {
        
    },
    methods: {
        debunce(fn, time) {
            let that = this;
            return function() {
                if (that.timer) clearTimeout(that.timer);
                that.timer = setTimeout(() => {
                    fn();
                }, time);
            }
        },
        logMsg($event) {
            console.log($event)
        },
        throtte(fn, time) {
            let that = this;
            return function() {
                if (!that.flag) return false;
                that.flag = false;
                setTimeout(() => {
                    fn();
                    that.flag = true;
                }, time);
            }
        }
    }
}
</script>

<style lang="less" scoped>
.home {
    flex: 1;
}


</style>
