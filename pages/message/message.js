// pages/message/message.js
const app = getApp();
wx.cloud.init();
const db = wx.cloud.database();
const util = require('../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    btuBottom: 0,
    statusBarHeight: 0,
    value: ''
  },

  goBack() {
    wx.navigateBack({
      delta: 1
    })
  },

  bindinput(e) {
    this.setData({
      value: e.detail.value
    })
  },

  sublimt() {
    if (this.data.value.trim() === '') {
      wx.showToast({
        title: '请输入内容',
        icon: 'none',
        duration: 2000
      })
      this.setData({
        value: ''
      })
      return false
    }
    db.collection('message').add({
      data: {
        content: this.data.value,
        startDate: util.formatTime(),
        nickName: wx.getStorageSync('nickName')
      }
    }).then( res => {
      this.setData({
        value: ''
      })
      wx.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 2000
      })
    }).catch( err=> {
      wx.showToast({
        title: '未知错误',
        icon: 'none',
        duration: 2000
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      btuBottom: app.globalData.statusBarHeight + "px",
      statusBarHeight: ((app.globalData.statusBarHeight * 2) + 100) + "rpx"
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})