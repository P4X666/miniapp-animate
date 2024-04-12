// pages/flip/index.js
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
  flipx(){
    this.animate('.flip-x>.demo-card', [
      // ease 参考： https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-timing-function
      { rotateX: 0},
      { rotateX: 180},
    ], 2000, ()=>{
      this.clearAnimation('.flip-x>.demo-card', ()=> {
        console.log("清除 .flip-x>.demo-card 动画属性")
      })
    })
  }, 
  flipy(){
    this.animate('.flip-y>.demo-card', [
      // ease 参考： https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-timing-function
      { rotate3d: [0]},
      { rotate3d: [0,1,0, 180]},
    ], 2000, ()=>{
      // this.clearAnimation('.flip-y>.demo-card', ()=> {
      //   console.log("清除 .flip-y>.demo-card 动画属性")
      // })
    })
  }, 
})