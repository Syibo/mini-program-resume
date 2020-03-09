// pages/nanhua/nanhua.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btuBottom: 0,
    statusBarHeight: 0,
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    img1: [
      "../../images/xianyu/1.png",
      "../../images/xianyu/2.png",
      "../../images/xianyu/3.png",
    ]
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
  goBack() {
    wx.navigateBack()
  },

  previewImage(e) {
    let img = e.currentTarget.dataset.src;
    let index = e.currentTarget.dataset.index;
    console.log(e)
    console.log(img)
    console.log(index)
    wx.previewImage({
      current: img,
      urls: this.img1[index]
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