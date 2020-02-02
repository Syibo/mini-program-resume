// pages/music/music.js
const app = getApp();
wx.cloud.init();
const db = wx.cloud.database();
const mMgr = wx.getBackgroundAudioManager();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    btuBottom: 0,
    statusBarHeight: 0,
    musicData: [],
    loadingShow: false,
    loadingType: 'end',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      btuBottom: app.globalData.statusBarHeight + "px",
      statusBarHeight: ((app.globalData.statusBarHeight * 2) + 100) + "rpx"
    })
    this.inset();
  },

  inset() {
    db.collection('music').get().then(res => {
      this.setData({
        musicData: res.data,
        loadingShow: true
      })
    }).catch(err => {
      console.log(err)
    })
  },

  previewImage(e) {
    let img = e.currentTarget.dataset.img;
    let index = e.currentTarget.dataset.index;
    wx.previewImage({
      current: img,
      urls: this.data.musicData[index].img
    })
  },

  goBack() {
    wx.navigateBack({
      delta: 1
    })
  },

  checkPlayMusic(e) {
    wx.showLoading({
      title: '加载中',
    })
    const index = e.currentTarget.dataset.index;
    const src = this.data.musicData[index].url;
    const title = this.data.musicData[index].song
    mMgr.title = title;
    mMgr.src = src;
    setTimeout(function () {
      wx.hideLoading()
    }, 1500)
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