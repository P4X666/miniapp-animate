const app = getApp()

Page({
  data: {
    list: [
      'fade 淡入淡出',
      'slide 滑动',
      'zoom 缩放',
      'rotate 旋转',
      'flip 翻转',
    ]
  },
  onLoad() {
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    console.log('https://developers.weixin.qq.com/miniprogram/dev/devtools/minicode.html')
    wx.nextTick(()=>{
      this.fadein()
    })
  },
  fadein(){
    for (let i = 0; i < this.data.list.length; i++) {
      this.animate(`.item${i}`, [
        // ease 参考： https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-timing-function
        { translateX: '-200rpx', opacity: 0 },
        { translateX: '0', opacity: 1, ease: 'cubic-bezier(0.2, -2, 0.8, 2)' },
      ], (i)*500 + 2500)
    }
  },
  onItemClick(ev){
    const detail = ev.target.dataset.url
    const url = detail.split(' ')[0]
    wx.navigateTo({
      url: `/pages/${url}/index`,
    })
  }
})
