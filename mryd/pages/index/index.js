//text.js
var util = require('../../utils/util.js')
var root = getApp()
var todayURL = "https://interface.meiriyiwen.com/article/today?dev=1"
var randomURL = "https://interface.meiriyiwen.com/article/random?dev=1"

Page({
  data: {
    plain: true,
    data: root.globalData.poetry.result,
    icontype: ["info_circle", "info"],
    modalHidden: true,
    modalContent: {}
  },
  onLoad: function () {
    var self = this
    this.getDate(todayURL)

  },
  //转发
  onShareAppMessage: function (res) {
    let users = wx.getStorageSync('user');
    if (res.from === 'button') { }
    return {
      title: '转发',
      path: '/pages/index/index',
      success: function (res) { }
    }
  },
  onRandomTap: function (event) {
    var that = this;
    this.getDate(randomURL)
  },

  // 下拉刷新
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var that = this;
    this.getDate(todayURL)
  },
  /**
  * 网络请求的函数：接收一个URL参数
  */
  getDate: function (URL) {
    var that = this;
    // 申请一个网络请求
    wx.request({
      url: URL,
      method: 'GET',
      // 请求成功的回调
      success: function (res) {
        var cnt = res.data.data.content.replace(/<.*?>/ig, "\n")
        that.setData({
          data: {
            mContent: res.data.data,
            cnt: cnt
          }
        })
        // console.log(res.data.data)

        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();

      }
    })
  },
})
