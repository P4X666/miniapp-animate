// pages/slide/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  slideUp(){
    this.animate('.slide-up>.demo-card', [
      // ease 参考： https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-timing-function
      { height: '120rpx', ease: 'ease-in'},
      { height: '500rpx', ease: 'ease-out' },
    ], 2000, ()=>{
      this.clearAnimation('.slide-up>.demo-card', ()=> {
        console.log("清除 slide-up 动画属性")
      })
    })
  },
  slideDown(){
    this.animate('.slide-down>.demo-card', [
      // ease 参考： https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-timing-function
      { height: '500rpx'},
      { height: '120rpx', ease: 'cubic-bezier(0.2, -2, 0.8, 2)' },
    ], 2000, ()=>{
      // this.clearAnimation('.slide-down>.demo-card', ()=> {
      //   console.log("清除 slide-down 动画属性")
      // })
    })
  }
})