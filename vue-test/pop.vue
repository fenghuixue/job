<template>
<div class="lm-dialog">
    <div v-if="isShow">
        <div class="lm-mask"></div>
        <div
            class="lm-dialog-wrapper"
            @click="maskClick"
        >

            <div
                class="content-wrapper pop-box"
                @click.stop="contentClick"
            >
                <div class="pop-circle">
                    <div class="inner"></div>
                </div>
                <div class="pop-head"></div>
                <div class="pop-body">

                    <div class="pop-body-content">
                        <div
                            v-if="$slots['dialog-title']"
                            class="pop-title"
                        >
                            <slot name="dialog-title">
                                标题
                            </slot>
                        </div>
                        <div
                            v-if="$slots['dialog-desc']"
                            class="pop-desc"
                        >
                            <div class="rect-show rect-start"></div>
                            <div class="desc-text">
                                <slot name="dialog-desc"></slot>
                            </div>
                            <div class="rect-show rect-end"></div>
                        </div>
                        <div class="pop-inner-content">
                            <slot name="dialog-content" class="">
                                <div class="dialog-content ">
                                    <slot></slot>
                                </div>
                            </slot>
                        </div>

                    </div>
                </div>
                <div class="pop-foot">
                    <div class="btns-wrapper clearfix">
                        <button
                            v-for="(item, index) of btns"
                            :key="index"
                            class="pop-btn"
                            @click="handleClick(btnFns[index])"
                        >
                            {{item}}
                        </button>
                    </div>
                </div>

            </div>
            <a
                href="javascript:;"
                class="lm-close"
                @click="handelShow"
            ></a>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'lm-dialog',
    data() {
        return {
            isShowed: false,
            show: true
        };
    },
    model: {
        prop: 'isShow',
        event: 'giveShow'
    },
    props: {
        btns: Array,
        btnFns: Array,
        hideOnBlur: Boolean,
        isShow: Boolean,
    },
    watch: {
        isShow(newVal, oldVal) {
            if (!this.isShowed && newVal && newVal !== oldVal) {
                this.$emit('onShow');
                this.isShowed = true;
            }
        },
    },
    methods: {
        handelShow() {
            this.$emit('giveShow', false);
            this.$emit('onHide');
        },
        maskClick() {
            this.hideOnBlur && this.handelShow();
        },
        contentClick() {
            console.log('contentClick');
        },
        handleClick(fn) {
            fn && fn();
        }
    }
}
</script>

<style lang="less">
.lm-dialog {
    @top-height: .6rem;
    @bottom-height: 1rem;
    @padding: 0rem;
    box-sizing: border-box;
    position: relative;
    z-index: 1000;

    .lm-mask {
        width: 100%;
        height: 100%;
        top: 0;
        position: fixed;
        z-index: 1000;
        background: rgba(0, 0, 0, .85);
    }

    .lm-dialog-wrapper {
        @min-width: 4rem;
        @min-height: 1.4rem;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        min-width: @min-width;
        min-height: @min-height;
        max-height: 90%;
        z-index: 1001;
        box-sizing: border-box;
        -webkit-overflow-scrolling: touch;

        .content-wrapper {
            background: rgba(0, 0, 0, .9);
            // overflow: hidden;
            position: relative;
            // padding-bottom: .3rem;
        }

        .lm-close {
            width: .55rem;
            height: .54rem;
            background: url('~@/images/2018/year_end/pop_close.png') no-repeat;
            background-size: 100% 100%;
            position: absolute;
            top: -.1rem;
            display: block;
            right: -.1rem;
            border-radius: 50%;
        }

        .pop-head {
            width: 6.55rem;
            height: .5rem;
            box-sizing: border-box;
            background: url('~@/images/2018/year_end/pop_head.png') no-repeat;
            background-size: 100% 100%;
            padding-top: .42rem;
        }

        .pop-title {
            width: 5.83rem;
            height: .67rem;
            background: url('~@/images/2018/year_end/pop_title.png') no-repeat;
            background-size: 100% 100%;
            margin: 0 auto .4rem;
            text-align: center;
            color: #fbd7b3;
            line-height: .67rem;
            font-size: .32rem;
        }

        .pop-foot {
            width: 6.55rem;
            height: .5rem;
            background: url('~@/images/2018/year_end/pop_foot.png') no-repeat;
            background-size: 100% 100%;
            position: relative;
            text-align: center;

            .btns-wrapper {
                width: 100%;
                position: absolute;
                bottom: -.16rem;
                text-align: center;
                z-index: 2;

                .pop-btn {
                    width: 2.3rem;
                    height: .72rem;
                    border-radius: .3rem;
                    border: none;
                    color: #533a18;
                    font-size: .36rem;
                    margin: 0 .2rem;

                    &:first-child {
                        background: linear-gradient(to bottom, #e5daca, #cfb9a1);
                        box-shadow: 0 .1rem 0 #8c7163;
                    }

                    &:last-child {
                        background: linear-gradient(to bottom, #f5da99, #e9b961);
                        box-shadow: 0 .1rem 0 #aa6c2a;
                    }
                }
            }
        }

        .pop-body {
            width: 6.55rem;
            min-height: 2rem;
            /* height: auto; */
            max-height: 6.95rem;
            overflow-y: auto;
            box-sizing: border-box;
            -webkit-overflow-scrolling: touch;
            background: url('~@/images/2018/year_end/pop_body.png') no-repeat;
            background-size: 100% 100%;
            margin-top: -.1rem;
            // padding-bottom: .3rem;
        }

        .pop-body-content {
            position: relative;
            z-index: 1;
        }

        .pop-circle {
            width: 100%;
            height: 100%;
            overflow: hidden;
            margin: auto;
            position: absolute;
            z-index: 0;
            box-sizing: border-box;

            .inner {
                margin-top: 2%;
                width: 6rem;
                height: 6rem;
                background: radial-gradient(circle, rgb(68, 52, 30), rgba(49, 37, 22, 0) 80%);
            }
        }

        .pop-desc {
            margin: 0 auto .3rem;
            text-align: center;

            .desc-text {
                padding: 0 .4rem;
                display: inline-block;
                color: #fdd0af;
                vertical-align: middle;

                .special-desc {
                    margin: 0;
                    font-size: 14px;
                }

                .special-desc-text {
                    margin-top: 8px;
                    font-size: 14px;
                }
            }

            .rect-show {
                position: relative;
                width: 0;
                height: 0;
                vertical-align: middle;
                display: inline-block;

                &:before {
                    content: ' ';
                    position: absolute;
                    width: .18rem;
                    height: .18rem;
                    background: #52351b;

                }

                &:after {
                    content: ' ';
                    position: absolute;
                    width: .26rem;
                    height: .26rem;
                    background: #815e39;

                }
            }

            .rect-start {
                &:before {
                    top: 0;
                    left: 0;
                }

                &:after {
                    bottom: -.09rem;
                    right: -.09rem;
                }
            }

            .rect-end {
                &:before {
                    top: 0;
                    right: 0;
                }

                &:after {
                    bottom: -.09rem;
                    left: -.09rem;
                }
            }
        }

        b {
            color: #ff9946;
            font-weight: bold;
        }

    }

    .lm-content {
        text-align: left;
        padding: @padding;
        box-sizing: border-box;
        max-height: 100%;
        margin-bottom: @bottom-height;
    }

    .pop-inner-content {
        padding: 0 .62rem;

        .title-text {
            margin: 0;
            font-size: .24rem;
            font-family: monospace, 'Microsoft Yahei';
            color: #d5a071;
            line-height: .48rem;
            margin-bottom: .14rem;
        }

        .text-list {
            margin: 0;
            padding: 0;
            margin-bottom: .25rem;

            .item {
                list-style: none;
                line-height: .42rem;
                color: #d5a071;
                padding-left: .36rem;
                position: relative;

                .number {
                    font-style: normal;
                    width: .26rem;
                    height: .26rem;
                    font-size: .20rem;
                    line-height: .26rem;
                    text-align: center;
                    background: #b0804d;
                    border-radius: 50% 50% 50% 0;
                    display: inline-block;
                    margin-right: .1rem;
                    color: #333;
                    position: absolute;
                    left: 0;
                    top: .08rem;
                }

                .special-style {
                    margin: 0;
                    padding: 0;
                    color: #ffd181;
                    margin-left: -18px;

                    &:before {
                        content: '•';
                        color: #ffd181;
                        padding-right: 8px;
                    }
                }
            }
        }

        .content-notice-text {
            font-size: .22rem;
            text-align: center;
            margin: 0 auto;

            .notice-text {
                position: relative;
                display: inline-block;
                color: #b0804d;

                &:before {
                    content: '◆';
                    color: #ac8240;
                    position: absolute;
                    left: -1.5em;
                    top: 50%;
                    transform: translate(0 -50%);
                }

                &:after {
                    content: '◆';
                    color: #ac8240;
                    position: absolute;
                    right: -1.5em;
                    top: 50%;
                    transform: translate(0 -50%);
                }
            }

        }
    }

}
</style>
