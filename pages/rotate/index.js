// pages/rotate/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startRotate: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  rotate(){
    this.animate('.rotate>.demo-card', [
      // ease 参考： https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-timing-function
      { rotate: 0, },
      { rotate: 360, },
    ], 1000, ()=>{
      this.clearAnimation('.rotate>.demo-card', ()=> {
        console.log("清除 rotate 动画属性")
      })
    })
  },
  rotateRight(){
    this.setData({startRotate: true}, ()=>{
      const during=800
      this.cardMove(during)
      this.showLine(during)
    })
  },
  cardMove(during){
    this.animate('.rotate-right>.demo-card', [
      // ease 参考： https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-timing-function
      { translateX: 0 },
      { translateX: '300rpx' },
    ], during, ()=>{
      // this.clearAnimation('.rotat-righte>.demo-card', ()=> {
      //   console.log("清除 rotate 动画属性")
      // })
    })
  },
  showLine(during){
    this.animate('.line', [
      // ease 参考： https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-timing-function
      { width: 0 },
      { width: '300rpx' },
    ], during, ()=>{
      // this.clearAnimation('.line', ()=> {
      //   console.log("清除 line 动画属性")
      // })
      this.textMove(during)
    })
  },
  textMove(during) {
    this.animate('.text', [
      // ease 参考： https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-timing-function
      { opacity: 0, left: '-200rpx' },
      { opacity: 1, left: '100rpx' },
    ], during, ()=>{
      // this.clearAnimation('.text', ()=> {
      //   console.log("清除 text 动画属性")
      // })
    })
  }
})