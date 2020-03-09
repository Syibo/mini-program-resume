//index.js
//获取应用实例
const app = getApp()
wx.cloud.init();
const db = wx.cloud.database();
const util = require('../../utils/util.js')
var wxCharts = require('../../utils/wxcharts.js')

Page({
  data: {
    btuBottom: 0,
    statusBarHeight: 0,
    login: false,
    defaultimg: '../../images/index/sbb.jpg',
    avatarUrl: '',
    nickName: '',
    loginDiv: false,
  },
  onLoad: function () {
    this.setData({
      btuBottom: app.globalData.statusBarHeight + "px",
      statusBarHeight: ((app.globalData.statusBarHeight * 2) + 100) + "rpx"
    })
    let openid = wx.getStorageSync('openid') || '';
    if (openid === ''){} else {
      this.setData({
        nickName: wx.getStorageSync('nickName'),
        avatarUrl: wx.getStorageSync('avatarUrl'),
        loginDiv: true
      })
      setTimeout(function () {
        wx.showLoading({
          title: '加载中',
        })
      }, 300)
      let _this = this
      setTimeout(function () {
        wx.hideLoading()
        _this.setData({
          login: true
        })
      }, 1500)
    }
  },

  getUserInfo(e) {
    const _this = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: "login"
    }).then(res => {
      db.collection('user').add({
        data: {
          openid: res.result.openid,
          nickName: e.detail.userInfo.nickName,
          startDate: util.formatTime(),
          avatarUrl: e.detail.userInfo.avatarUrl,
        }
      }).then( res2=> {
        wx.setStorage({ key: "openid", data: res.result.openid });
        wx.setStorage({ key: "nickName", data: e.detail.userInfo.nickName });
        wx.setStorage({ key: "avatarUrl", data: e.detail.userInfo.avatarUrl });
        app.globalData.openid = res.result.openid;
        _this.setData({
          nickName: e.detail.userInfo.nickName,
          avatarUrl: e.detail.userInfo.avatarUrl,
          loginDiv: true
        })
        setTimeout(function () {
          wx.hideLoading()
          _this.setData({
            login: true
          })
        }, 1000)
      }).catch( err=> {
        wx.hideLoading()
      })
    }).catch(err2 => {
      wx.hideLoading()
    })
  },

  copyWechat () {
    wx.setClipboardData({
      data: '18720573255',
      success(res) {
        wx.getClipboardData({
          success(res) {}
        })
      }
    })
  },

  copyEmail() {
    wx.setClipboardData({
      data: '1335638583@qq.com',
      success(res) {
        wx.getClipboardData({
          success(res) {
            wx.showToast({
              title: 'qq邮箱已复制',
            })
          }
        })
      }
    })
  },

  copyGit() {
    wx.setClipboardData({
      data: 'https://github.com/Syibo',
      success(res) {
        wx.getClipboardData({
          success(res) { }
        })
      }
    })
  },

  copyIns() {
    wx.setClipboardData({
      data: 'chenyibo60',
      success(res) {
        wx.getClipboardData({
          success(res) { }
        })
      }
    })
  },

  goDiary() {
    wx.navigateTo({
      url: '/pages/diary/diary',
    })
  },
  goMusic() {
    wx.navigateTo({
      url: '/pages/music/music',
    })
  },
  goMessage() {
    wx.navigateTo({
      url: '/pages/message/message',
    })
  },
  goRelease() {
    wx.navigateTo({
      url: '/pages/release/release',
    })
  },
  goXianyu() {
    wx.navigateTo({
      url: '/pages/xianyu/xianyu',
    })
  },
  goNanhua() {
    wx.navigateTo({
      url: '/pages/nanhua/nanhua',
    })
  },

  KoaTest() {
    wx.login({
      success: (res) => {
        if (res.code) {
          wx.request({
            url: 'http://localhost:3000/v1/token',
            method: 'POST',
            data: {
              account: res.code,
              type: 100
            },
            success: (res) => {
              console.log(res.data)
              const code = res.statusCode.toString()
              if (code.startsWith('2')) {
                wx.setStorageSync('token', res.data.token)
              }
            }
          })
        }
      }
    })
  },

  onReady: function (e) {
    var windowWidth = 335;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    let ringChart = new wxCharts({
      animation: true,
      canvasId: 'ringCanvas',
      type: 'ring',
      title: {
        name: '80%',
        color: '#7cb5ec',
        fontSize: 20
      },
      subtitle: {
        name: 'web develop',
        color: '#666666',
        fontSize: 15,
        offsetX: 10
      },
      series: [{
        name: '成交量1',
        data: 20,
        stroke: false
      }, {
        name: '成交量2',
        data: 80,
        stroke: false
      }],
      disablePieStroke: true,
      width: windowWidth,
      height: 175,
      dataLabel: false,
      legend: false,
      background: '#fff',
      extra: {
        ringWidth: 5
      },
    });
    let web = new wxCharts({
      animation: true,
      canvasId: 'web',
      type: 'ring',
      title: {
        name: '60%',
        color: '#7cb5ec',
        fontSize: 20
      },
      subtitle: {
        name: 'App develop',
        color: '#666666',
        fontSize: 15,
        offsetX: 10
      },
      series: [{
        name: '成交量1',
        data: 40,
        stroke: false
      }, {
        name: '成交量2',
        data: 60,
        stroke: false
      }],
      disablePieStroke: true,
      width: windowWidth,
      height: 175,
      dataLabel: false,
      legend: false,
      background: '#fff',
      extra: {
        ringWidth: 5
      },
    })
  }
})
