// components/nine-palaces-lottery/index.js

import { getLuckydrewProduct, startLuckydrew } from '../../../api/lottery'
import { LuckDraw } from './utils'
import { ASSETS } from '../../../site.config'

// 九宫格抽奖
Component({
    options: {
        multipleSlots: true, // 在组件定义时的选项中启用多slot支持
        addGlobalClass: true, // 使用外界的css
    },
    /**
     * 组件的属性列表
     */
    properties: {
        activityId: {
            type: String,
            value: '',
            observer: function (newVal, oldVal) {
                if (newVal && newVal !== oldVal) {
                    this.getProduct(newVal)
                }
            }
        },
        lotteryChance: {
            type: Number,
            value: 0,
            observer: function (newVal) {
                if (newVal === 0) {
                    this.setData({ status: -1 })
                } else {
                    this.setData({ status: 0 })
                }
            }
        },
    },
    lifetimes: {
        ready() {
            this.game = new LuckDraw()
        }
    },
    /**
     * 组件的初始数据
     */
    data: {
        // 高亮的子项索引
        current: -1,
        // 0：未开始 1：进行中 -1：没有抽奖次数
        status: -1,
        /** 
         * 奖品
         * id: 奖品id
         * image: 奖品图片
         * text: 奖品文案
         *  */
        prizes: []
    },
    /**
     * 组件的方法列表
     */
    methods: {
        getPrizeName(prize) {
            if (prize.reward.type === "score") {
                return prize.reward.score + '积分'
            }
            if (prize.reward.type === "coupon") {
                return '优惠券'
            }
            if (prize.reward.type === "in_kind") {
                return prize.reward.inKind.name
            }
            return ''
        },
        getPrizeImg(prize) {
            if (prize.reward.type === "score") {
                return `${ASSETS}/lottery/gold-coin.png`
            }
            if (prize.reward.type === "coupon") {
                return `${ASSETS}/lottery/coupon.png`
            }
            return prize.image
        },
        getProduct(id) {
            getLuckydrewProduct(id).then(res => {
                const prizes = res?.rewardSetting?.prizes?.map(item => {
                    return {
                        id: item.prizeId,
                        image: this.getPrizeImg(item),
                        text: this.getPrizeName(item),
                        reward: item.reward
                    }
                })
                if (!prizes) return
                if (prizes.length !== 8) {
                    const locationArr = [1, 3, 4, 6, 5, 7]
                    let index = 0
                    while (prizes.length < 8) {
                        prizes.splice(locationArr[index], 0, {
                            id: `${locationArr[index]}`,
                            image: `${ASSETS}/lottery/thankyou.png`,
                            text: '谢谢参与',
                            type: -1
                        })
                        index++
                    }
                }
                prizes.splice(4, 0, { id: 'btn' })
                this.game.init(prizes)
                this.setData({ prizes })
            })
        },
        /** 开始抽奖 */
        start() {
            this.productId = ''
            this.rewardLogId = {}
            if (this.data.status === -1) return
            this.setData({ status: 1, current: 0 })
            this.game.run(
                (params) => {
                    // 停留在当前格子的回调函数
                    // 拿到当前 active 状态的 index
                    this.setData({ current: params.current })
                },
                (params) => {
                    const resetHandle = () => {
                        //重置GO的状态
                        setTimeout(() => {
                            this.setData({ status: 0, current: -1 })
                        }, 2000)
                    }
                    if (params === -1) {
                        wx.showToast({
                            title: '抽奖失败!',
                            icon: 'error'
                        })
                        resetHandle()
                        return
                    }
                    // 最终停止的回调函数
                    //最后转盘停止的地方，可以弹出奖励弹框或其他操作
                    setTimeout(() => {
                        if (params === 0) {
                            // 未中奖
                            this.triggerEvent('onEnd', -1)
                        } else {
                            const prize = this.data.prizes.find(item => item.id === params.id)

                            this.triggerEvent('onEnd', { ...prize, ...this.reward })
                        }
                    }, 1000)

                    resetHandle()
                }
            )
            // setTimeout(() => {
            //     // this.game.end()
            //     // 中积分
            //     // this.game.end("65f16910c242c755ba782d94")
            //     // 中优惠券
            //     // this.game.end("65f16910c242c755ba782d95")
            //     // 中奖实物
            //     // this.game.end("65f16910c242c755ba782d96")
            // }, 1000)
            startLuckydrew({ luckyDrawId: this.properties.activityId, usePoint: false }).then(res => {
                if (!res.isPrizeWinning) {
                    this.game.end()
                    return
                }
                const { rewardLogId, prizeId } = res.reward
                this.reward = {
                    rewardLogId,
                    luckyDrawLogId: res.id,
                    memberStorePrizeInfoId: res.memberStorePrizeInfoId
                }
                this.rewardLogId =
                    this.game.end(prizeId)
            }).catch(() => {
                this.game.stop()
            })
        }
    }
})