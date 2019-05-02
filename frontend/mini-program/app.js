//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  ready() {
    var that = this
    return new Promise(function (resolve, reject) {
      var value = wx.getStorageSync('user')
      var timestamp = Date.parse(new Date()) / 1000
      if (value && timestamp < value.end_time) {
        that.globalData.token = value.token
        that.globalData.is_vip = wx.getStorageSync('is_vip')
        resolve();
      } else {
        wx.login({
          success: function (res) {

            wx.request({

              url: that.globalData.apiUrl + '/user/query',
              data: { code: res.code },
              method: 'get',
              header: { "Content-Type": "application/x-www-form-urlencoded" },
              success: function (res) {

                var data = res.data.data
                var iToken = data.token
                var isVip = res.data.is_vip


                that.globalData.token = iToken
                that.globalData.is_vip = isVip
                wx.setStorage({
                  key: "user",
                  data: data
                })

                wx.setStorage({
                  key: "is_vip",
                  data: isVip
                })

                if (res.data.status == 2) {
                  that.globalData.session_key = res.data.data.session_key
                  wx.navigateTo({
                    url: '/pages/login/login'
                  })
                }
                if (res.data.status == 0) {
                  that.globalData.session_key = res.data.data.session_key
                  wx.navigateTo({
                    url: '/pages/login/login'
                  })
                }


                resolve();
              }
            })

          }
        })
      }
    })
  },
  globalData: {
    token: null,
    session_key: null,
    apiUrl: 'http://wkvtqa.natappfree.cc'
  }
})