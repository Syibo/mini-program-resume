// pages/release/release.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    btuBottom: 0,
    statusBarHeight: 0,
    showConfirmBar: false,
    bottom: '20rpx;',
    value: ''
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

  bindinput(e) {
    this.setData({
      value: e.detail.value
    })
  },

  bindfocus(e) {
    this.setData({
      bottom: `${e.detail.height+5}px`
    })
  },

  bindblur() {
    this.setData({
      bottom: '20rpx'
    })
  },

  goBack() {
    wx.navigateBack({
      delta: 1
    })
  },

  send() {
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
    const openid = wx.getStorageSync('openid') || '';
    if (openid === 'odfMT0eH1klNH3qg-4SkGUTpTo80') {
      // wx.showToast({
      //   title: 'sorry！您暂无权限！',
      //   icon: 'none'
      // })
    } else {
      wx.showToast({
        title: 'sorry！您暂无权限！',
        icon: 'none'
      })
      this.setData({
        value: ''
      })
    }
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