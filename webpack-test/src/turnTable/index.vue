<template lang="html">
    <div class="user-welfare-container">
        <div id="lottery" class="ylottery-container">
            <div class="ylottery-wrapper">
                <div class="ylottery-light"></div>
                <div class="ylottery-main" id="yLotteryMain">
                    <div class="ylottery-goods-item" :class="'ylottery-goods-item'+idx" :id="'ylottery-goods-'+idx" v-for="(item, idx) in goods">
                        <div class="ylottery-inner" :class="item.typeClass">
                            <div class="ylottery-goods-txt">{{item.name}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import { ylottery } from '@/utils/lottery/main.js'
import { debounce } from '@/utils/common.js'
import {mapState} from 'vuex'

export default {
    data () {
        return {
            goods: [
                {
                    name: '王者认证礼物',
                    typeClass: 'mt-king',
                    order: 0,
                    prizeId: 1,
                },
                {
                    name: '盛典弹幕(50条)碎片',
                    typeClass: 'mt-barrage',
                    order: 1,
                    prizeId: 6,
                },
                {
                    name: '抓抓券',
                    typeClass: 'mt-mzz',
                    order: 2,
                    prizeId: 3,
                },
                {
                    name: '王者认证礼物',
                    typeClass: 'mt-king',
                    order: 3,
                    prizeId: 1,
                },
                {
                    name: '小萌犬座驾(2天)碎片',
                    typeClass: 'mt-small-set',
                    order: 4,
                    prizeId: 4,
                },
                {
                    name: '超级礼炮礼物',
                    typeClass: 'mt-salute',
                    order: 5,
                    prizeId: 2,
                },
                {
                    name: '独角兽座驾(2天)碎片',
                    typeClass: 'mt-big-set',
                    order: 6,
                    prizeId: 5,
                },
                {
                    name: '王者认证礼物',
                    typeClass: 'mt-king',
                    order: 7,
                    prizeId: 1,
                },
                {
                    name: '美图T8手机碎片',
                    typeClass: 'mt-mobile',
                    order: 8,
                    prizeId: 8,
                },
                {
                    name: '盛典弹幕(50条)碎片',
                    typeClass: 'mt-barrage',
                    order: 9,
                    prizeId: 6,
                },
                {
                    name: '超级礼炮礼物',
                    typeClass: 'mt-salute',
                    order: 10,
                    prizeId: 2,
                },
                {
                    name: '盛典勋章(2天)碎片',
                    typeClass: 'mt-medal',
                    order: 11,
                    prizeId: 7,
                }
            ]
        }
    },
    components: {
        
    },
    computed: {
        
    },
    methods: {
        // 转盘结果弹窗切换
        toggleLotteryPop () {
            this.showLotteryPop = !this.showLotteryPop
        },
        // 合成礼物弹窗切换
        toggleCompoundPop () {
            this.showCompoundPop = !this.showCompoundPop
        },
        // 我的奖品页面
        toggleRewardPop () {
            this.showRewardPop = !this.showRewardPop
        },
       
        lotteryStart: debounce(function(num){
            if (this.isLogin) {
                getPrize({num:num}, (resp) => {
                    if (+resp.code === 100000 && resp.data) {
                        this.lotteryData = resp.data
                        let prizeList = JSON.parse(JSON.stringify(resp.data.prizeList))
                        let end = [];
                        this.goods.forEach((val, idx) => {
                            prizeList.forEach((prizeVal, prizeIdx) => {
                                if (prizeVal.prizeId == val.prizeId) {
                                    end.push(val.order)
                                    // prizeList.splice(prizeIdx,1)
                                }
                            })
                        })
                        this.lotteryOpreation(end,resp.data, num)
                    }else {
                        this.$vux.toast.text(resp.msg);
                        console.log(resp);
                    }
                })
                if (num == 1) {
                    window.statistics('2018年度盛典-用户福利页->抽一次按钮');
                } else if (num == 10) {
                    window.statistics('2018年度盛典-用户福利页->抽十次按钮');
                } else {
                    window.statistics('2018年度盛典-用户福利页->抽五十次按钮');
                }
            } else {
                login()
            }
        }, 500),
        lotteryOpreation (end, lotteryData, num) {
            let goods = this.goods
            let currentEnd = 0
            if (end.length > 1) {
                currentEnd = parseInt(Math.random() * end.length)
            } else {
                currentEnd = 0
            }
            var mylottery = new ylottery('#lottery', {
                start: 0,
                end: end[currentEnd],
                goods: goods,
            });
            mylottery.start()
            this.lotteryBtnActive = false
            setTimeout(()=> {
                mylottery.end(num)
            },1000)
            // 抽奖结束
            if (num == 50 || num == 10) {
                mylottery.$on('end', (etype, endIndex) => {
                    // 先闪烁
                    mylottery.setHover()
                    setTimeout(()=> {
                        mylottery.removeHover()
                        mylottery.setRemoveActiveClass(end[currentEnd])
                        this.toggleLotteryPop()
                        this.lotteryBtnActive = true
                        this.$emit('initUserWelfare')
                        // if (end.length > 1) {
                        //     for (var i = 0; i < end.length; i++) {
                        //         mylottery.setActiveClass(end[i])
                        //     }
                        // }
                        // setTimeout(()=> {
                            // for (var i = 0; i < end.length; i++) {
                            //     mylottery.setRemoveActiveClass(end[i])
                            // }
                            // mylottery.setRemoveActiveClass(end[0])
                            // this.toggleLotteryPop()
                            // this.lotteryBtnActive = true
                            // this.initUserWelfare()
                        // }, 2000)
                    }, 2000)

                });
            } else {
                mylottery.$on('end', (etype, endIndex) => {
                    setTimeout(()=> {
                        for (var i = 0; i < end.length; i++) {
                            mylottery.setRemoveActiveClass(end[i])
                        }
                        this.toggleLotteryPop()
                        this.lotteryBtnActive = true
                        this.$emit('initUserWelfare')
                    }, 2000)
                });
            }
        }
    }
}
</script>

<style lang="less" scoped>
.user-welfare-container {
    .prize-news {
        width: 319px;
        height: 65px;
        background: url('~@/images/2018/year_end/user_welfare/prize_news_bg.png') no-repeat;
        background-size: contain;
        margin: 0 auto;
        padding: 16px 0;
        overflow: hidden;
        .swiper-container {
            height: 50px;
            .prize-news-item {
                font-size: 12px;
                text-align: center;
                color: #b6895f;
                .text-user {
                    color: #fea649;
                }
                .text-prize {
                    color: #ffc384;
                }
            }
        }
    }
    .ylottery-container {
        .ylottery-wrapper {
            margin: 30px auto 0;
            position: relative;
            width: 319px;
            height: 333px;
            background: url('~@/images/2018/year_end/user_welfare/lottery_bg.png') no-repeat;
            background-size: contain;
            padding: 22px;
            .ylottery-light {
                position: absolute;
                top: 0;
                left: 0;
                width: 319px;
                height: 333px;
                background: url('~@/images/2018/year_end/user_welfare/lottery_light.png') no-repeat;
                background-size: contain;
                animation: lightHover 1s ease-out infinite;
            }
            @keyframes lightHover {
                25% {
                    background: url('~@/images/2018/year_end/user_welfare/lottery_light_hover.png') no-repeat;
                    background-size: contain;
                }
                50% {
                    background: url('~@/images/2018/year_end/user_welfare/lottery_light.png') no-repeat;
                    background-size: contain;
                }
                75% {
                    background: url('~@/images/2018/year_end/user_welfare/lottery_light_hover.png') no-repeat;
                    background-size: contain;
                }
            }
            .ylottery-main {
                position: relative;
                &.hover {
                    .ylottery-goods-item {
                        background: url('~@/images/2018/year_end/user_welfare/item_active.png') no-repeat;
                        background-size: contain;
                        color: #f5dcb5;
                        animation: itemHover 1s ease-out infinite;
                    }
                    @keyframes itemHover {
                        50% {
                            background: none;
                        }
                    }
                }
                .ylottery-goods-item {
                    position: absolute;
                    overflow: hidden;
                    float: left;
                    width: 67px;
                    height: 67px;
                    padding: 0px;
                    border-radius: 5px;
                    text-align: center;
                    color: #77332C;
                    user-select: none;
                    &.active {
                        background: url('~@/images/2018/year_end/user_welfare/item_active.png') no-repeat;
                        background-size: contain;
                        color: #f5dcb5;
                    }
                    .ylottery-goods-txt  {
                        font-size: 10px;
                        color: #f5dcb5;
                        height: 22px;
                        display: table-cell;
                        vertical-align: middle;
                        text-align: center;
                    }
                    .mt-king {
                        background: url('~@/images/2018/year_end/user_welfare/item_king.png') no-repeat center -10px;
                        background-size: 80px 80px;
                        text-align: center;
                        padding-top: 39px;
                        padding-left: 3px;
                    }
                    .mt-barrage {
                        background: url('~@/images/2018/year_end/user_welfare/item_barrage.png') no-repeat center 15px;
                        background-size: 60px 20px;
                        text-align: center;
                        padding: 39px 8px 0;

                    }
                    .mt-mzz {
                        background: url('~@/images/2018/year_end/user_welfare/item_mzz.png') no-repeat center -10px;
                        background-size: 60px 60px;
                        text-align: center;
                        padding-top: 39px;
                        padding-left: 16px;

                    }
                    .mt-big-set {
                        background: url('~@/images/2018/year_end/user_welfare/item_big_set.png') no-repeat center -8px;
                        background-size: 60px 60px;
                        text-align: center;
                        padding: 40px 4px 5px;
                    }
                    .mt-small-set {
                        background: url('~@/images/2018/year_end/user_welfare/item_small_set.png') no-repeat center -8px;
                        background-size: 60px 60px;
                        text-align: center;
                        padding: 40px 4px 5px;

                    }
                    .mt-salute {
                        background: url('~@/images/2018/year_end/user_welfare/item_salute.png') no-repeat center -4px;
                        background-size: 66px 70px;
                        text-align: center;
                        padding: 40px 2px 5px;
                    }
                    .mt-mobile {
                        background: url('~@/images/2018/year_end/user_welfare/item_mobile.png') no-repeat center 0px;
                        background-size: 45px 45px;
                        text-align: center;
                        padding: 40px 4px 5px;
                    }
                    .mt-medal {
                        background: url('~@/images/2018/year_end/user_welfare/item_medal.png') no-repeat center 0px;
                        background-size: 50px 50px;
                        text-align: center;
                        padding: 40px 0 5px;
                    }
                }
                .ylottery-goods-item0 {
                    top: 0;
                    left: 0;
                }
                .ylottery-goods-item1 {
                    top: 0;
                    left: 70px;
                }
                .ylottery-goods-item2 {
                    top: 0;
                    left: 140px;
                }
                .ylottery-goods-item3 {
                    top: 0;
                    left: 210px;
                }
                .ylottery-goods-item4 {
                    top: 70px;
                    left: 210px;
                }
                .ylottery-goods-item5 {
                    top: 140px;
                    left: 210px;
                }
                .ylottery-goods-item6 {
                    top: 210px;
                    left: 210px;
                }
                .ylottery-goods-item7 {
                    top: 210px;
                    left: 140px;
                }
                .ylottery-goods-item8 {
                    top: 210px;
                    left: 70px;
                }
                .ylottery-goods-item9 {
                    top: 210px;
                    left: 0;
                }
                .ylottery-goods-item10 {
                    top: 140px;
                    left: 0;
                }
                .ylottery-goods-item11 {
                    top: 70px;
                    left: 0;
                }
                .ylottery-info {
                    width: 136px;
                    height: 134px;
                    position: absolute;
                    top: 70px;
                    left: 70px;
                    border-radius: 5px;
                    padding-top: 10px;
                    .surplus-num {
                        font-size: 57px;
                        font-weight: bold;
                        color: #f67a2a;
                        text-align: center;
                        -webkit-text-stroke: 1px #ffe28e;
                        text-shadow:1px 3px 6px #ecc98d,0 0 0 #f67a2a, 0px 0px 2px #d6601d;
                        height: 60px;
                        line-height: 60px;

                    }
                    .surplus-num-small {
                        font-size: 40px;
                    }
                    .surplus-info {
                        margin: 5px 0 0;
                        font-size: 15px;
                        font-weight: bold;
                        color: #875421;
                        text-align: center;
                        text-shadow: 0 2px 3px #9e743d;
                    }
                    .check-prize-detail {
                        height: 24px;
                        line-height: 24px;
                        margin: 6px auto 0;
                        text-align: center;
                        font-size: 12px;
                        color: #7d4f20;
                        border-bottom: #c38b5b solid 1px;
                        width: 88px;
                    }
                }
            }
        }
        .ylottery-btn-group {
            width: 319px;
            height: 33px;
            margin: 10px auto 0;
            .ylottery-btn {
                display: block;
                float: left;
                width: 100px;
                height: 33px;
                margin-right: 9px;
                text-align: center;
                line-height: 33px;
                color: #764520;
                font-size: 14px;
                text-decoration: none;
                font-weight: bold;
                background: url('~@/images/2018/year_end/user_welfare/lottery_btn_bg.png') no-repeat;
                background-size: contain;
                &:last-child {
                    margin-right: 0;
                }
            }
            .ylottery-disable-btn {
                background: url('~@/images/2018/year_end/user_welfare/lottery_btn_disable_bg.png') no-repeat;
                background-size: contain;
            }
        }
    }
    .lottery-chance {
        margin-top: 30px;
        .lottery-chance-title {
            width: 326px;
            height: 18px;
            background: url('~@/images/2018/year_end/user_welfare/lottery_chance_title.png') no-repeat;
            background-size: contain;
            margin: 0 auto;
        }
        .lottery-chance-main {
            width: 337px;
            height: 87px;
            background: url('~@/images/2018/year_end/user_welfare/chance_bg.png') no-repeat;
            background-size: contain;
            margin: 15px auto 0;
            padding-top: 18px;
            .lottery-chance-item {
                height: 25px;
                margin-bottom: 4px;
                .info {
                    color: #fff0d9;
                    font-size: 12px;
                    float: left;
                    padding-left: 35px;
                    line-height: 25px;
                }
                .btn-finish {
                    width: 80px;
                    height: 32px;
                    float: right;
                    margin-right: 28px;
                }
                .unfinish {
                    background: url('~@/images/2018/year_end/user_welfare/btn_go.png') no-repeat;
                    background-size: contain;
                }
                .already-finish {
                    background: url('~@/images/2018/year_end/user_welfare/btn_already.png') no-repeat;
                    background-size: contain;
                }
            }
        }
    }
    .chip-container {
        margin-top: 30px;
        .chip-title {
            width: 288px;
            height: 18px;
            background: url('~@/images/2018/year_end/user_welfare/chip_title.png') no-repeat;
            background-size: contain;
            margin: 0 auto;
        }
        .chip-info {
            margin-top: 15px;
            color: #ffcc72;
            font-size: 14px;
            text-align: center;
        }
        .chip-description {
            text-align: center;
            margin-top: 10px;
            color: #a26d33;
            .check-type {
                color: #fea549;
            }
        }
        .chip-main {
            width: 337px;
            background: #492c15;
            margin: 15px auto 0;
            box-shadow: -3px -3px 5px #030303;
            padding: 12px 0px;
            position: relative;
            .chip-item {
                height: 25px;
                line-height: 25px;
                overflow: hidden;
                margin-bottom: 5px;
                padding: 0 5px;
                .item-title {
                    color: #ffeeb7;
                    font-size: 14px;
                    margin-right: 3px;
                    min-width: 102px;
                    text-align: center;
                    display: inline-block;
                }
                .item-light {
                    i {
                        width: 11px;
                        height: 11px;
                        transform: rotate(45deg);
                        display: inline-block;
                        background: #020100;
                        margin-right: 6px;
                    }
                }
                .light1 i{
                    &:nth-child(1) {
                        background: #b48947;
                    }
                }
                .light2 i{
                    &:nth-child(-n+2) {
                        background: #b48947;
                    }
                }
                .light3 i{
                    &:nth-child(-n+3) {
                        background: #b48947;
                    }
                }
                .light4 i{
                    &:nth-child(-n+4) {
                        background: #b48947;
                    }
                }
                .light5 i{
                    &:nth-child(-n+5) {
                        background: #b48947;
                    }
                }
                .light6 i{
                    &:nth-child(-n+6) {
                        background: #b48947;
                    }
                }
                .light7 i{
                    &:nth-child(-n+7) {
                        background: #b48947;
                    }
                }
                .item-num {
                    color: #c5935e;
                    font-size: 12px;
                    i {
                        color: #fa973c;
                        font-style: normal;
                    }
                }

                .item-btn {
                    display: inline-block;
                    float: right;
                    width: 60px;
                    height: 25px;
                    background: url('~@/images/2018/year_end/user_welfare/btn_compound.png') no-repeat;
                    background-size: contain;
                    margin-top: 3px;
                }
                .uncomponend {
                    background: url('~@/images/2018/year_end/user_welfare/un_componend.png') no-repeat;
                    background-size: contain;
                }
            }
            .prize-time-info {
                margin-top: 19px;
                font-size: 12px;
                color: #b48947;
                text-align: center;
            }
            .btn-my-prize {
                width: 105px;
                height: 28px;
                background: url('~@/images/2018/year_end/user_welfare/btn_my_prize.png') no-repeat;
                background-size: contain;
                position: absolute;
                bottom: -15px;
                left: 50%;
                margin-left: -53px;
            }
        }
    }
}
</style>
