// pages/fade/index.js
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
  fadein(){
    this.animate('.fade-in', [
      // ease 参考： https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-timing-function
      { translateX: '150rpx', opacity: 0 },
      { translateX: '400rpx', opacity: 1, ease: 'ease-in' },
    ], 2000, ()=>{
      // this.clearAnimation('.fade-in', ()=> {
      //   console.log("清除 fade-in 动画属性")
      // })
    })
  },
  fadeout(){
    this.animate('.fade-out', [
      { translateX: '0', opacity: 1, },
      { translateX: '400rpx', opacity: 0, ease: 'ease-out' },
    ], 2000, ()=>{
      this.clearAnimation('.fade-out', ()=> {
        console.log("清除 fade-out 动画属性")
      })
    })
  },
  fadeinBottom(){
    this.animate('.fade-in-bottom', [
      { translateX: '0', translateY: '0', opacity: 0.5, },
      { translateX: '150rpx', translateY: '100rpx', opacity: 1, ease: 'cubic-bezier(0.2, -2, 0.8, 2)' },
    ], 2000, ()=>{
      // this.clearAnimation('.fade-in-bottom', ()=> {
      //   console.log("清除 fade-in-bottom 动画属性")
      // })
    })
  }
})