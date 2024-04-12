// pages/zoom/index.js
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
  zoomin(){
    this.animate('.zoom-in>.demo-card', [
      // ease 参考： https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-timing-function
      { scale: [1,1],  ease: 'ease-in'},
      { scale: [3,3], translateX: '80rpx', translateY: '40rpx', ease: 'ease-out' },
    ], 300, ()=>{
      // this.clearAnimation('.zoom-in>.demo-card', ()=> {
      //   console.log("清除 zoom-in 动画属性")
      // })
    })
  },
  zoomout(){
    this.animate('.zoom-out>.demo-card', [
      // ease 参考： https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-timing-function
      { scale: [3,3], translateX: '80rpx', translateY: '40rpx', ease: 'ease-in'},
      { scale: [1,1],  ease: 'ease-out' },
    ], 300, ()=>{
      // this.clearAnimation('.zoom-out>.demo-card', ()=> {
      //   console.log("清除 zoom-out 动画属性")
      // })
    })
  }
})