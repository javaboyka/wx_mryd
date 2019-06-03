//text.js
var util = require('../../utils/util.js')
const jinrishici = require('../../utils/jinrishici.js')
var root = getApp()

Page({
  data: {
    plain: true,
    data: root.globalData.poetry.data,
    icontype: ["info_circle", "info"],
    modalHidden: true,
    modalContent: {}
  },
  onLoad: function () {
    var self = this, tmpPoetry = root.globalData.poetry.data
    this.getPetry()
  },
  //
  getPetry: function(){
    jinrishici.load(result => {
      // 下面是处理逻辑示例
      // console.log(result)
      this.setData({ 
        data: {
          poetryCtx: result.data.origin
        }
        })
    })
  },
  //转发
  onShareAppMessage: function (res) {
    let users = wx.getStorageSync('user');
    if (res.from === 'button') { }
    return {
      title: '转发',
      path: '/pages/poetry/poetry',
      success: function (res) { }
    }
  },
  onRandomTap: function (event) {
    var that = this;
    this.getPetry();
  },

  // 下拉刷新
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var that = this;
    this.getPetry();
    // 隐藏导航栏加载框
    wx.hideNavigationBarLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();
    // var url = "https://api.apiopen.top/recommendPoetry"
    // this.getDate(url)
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
        var content = res.data.result.content.replace(/\|/g, "\n")
        that.setData({
          data: {
            poetryCtx: res.data.result,
            content: content
          }
        })
        // console.log(res.data.result)

        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();

      }
    })
  },
})
