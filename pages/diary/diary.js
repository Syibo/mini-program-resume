// pages/diary/diary.js
const app = getApp();
wx.cloud.init();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btuBottom: 0,
    statusBarHeight: 0,
    diaryData: [],
    bottom: '-355rpx',
    mask: true,
    yesSrc: '../../images/index/likered.png',
    noSrc: '../../images/index/like.png',
    inpValue: '',
    loadingShow: false,
    loadingType: 'end',
  },
  onLoad: function () {
    this.setData({
      btuBottom: app.globalData.statusBarHeight + "px",
      statusBarHeight: ((app.globalData.statusBarHeight * 2) + 100) + "rpx"
    })
    this.inset();
  },

  inset() {
    db.collection('diary').orderBy('timestamp', 'desc').get().then( res => {
      this.setData({
        diaryData: res.data,
        loadingShow: true
      })
    }).catch(err => {
      console.log(err)
    })
  },

  previewImage(e) {
    const img = e.currentTarget.dataset.img;
    const urls = [];
    urls.push(img);
    wx.previewImage({
      current: img,
      urls
    })
  },

  share() {
    this.setData({
      bottom: 0,
      mask: false,
    })
  },

  caleMask() {
    this.setData({
      bottom: '-355rpx',
      mask: true
    })
  },

  goBack() {
    wx.navigateBack({
      delta: 1
    })
  },

  checkLikeFun(e) {
    let index = e.currentTarget.dataset.index;
    let showConObj = 'diaryData[' + index + '].isLike';
    this.setData({
      [showConObj]: !this.data.diaryData[index].isLike
    })
  },

  checkMessage(e) {
    let index = e.currentTarget.dataset.index;
    let showConObj = 'diaryData[' + index + '].isComment';
    this.setData({
      [showConObj]: !this.data.diaryData[index].isComment
    })
  },

  search(e) {
    if (e.detail.value == '') {
      wx.showToast({
        title: '请输入内容',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    wx.showToast({
      title: '我已收到你的评论',
      icon: 'success',
      duration: 2000
    })
    this.setData({
      inpValue: ''
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
    return {
      title: 'sbb',
      path: '/pages/diary/diary',
      imageUrl: "",
      success: (res) => {

      }
    }
  }
})