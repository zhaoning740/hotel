//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.ready()
    // 登录
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              console.log('getUserInfo===>', res.userInfo)
              this.globalData.userInfo = res.userInfo
            }
          })
        }
      }
    })
  },
  login() {
    const that = this;
    wx.login({
      success: function (res) {
        // 登录成功后拿code换客户信息
        wx.request({
          url: that.globalData.apiUrl + '/user/query',
          data: { code: res.code },
          method: 'get',
          // header: { "Content-Type": "application/x-www-form-urlencoded" },
          success: function (res) {
            console.log('/user/query==>', res)
            const {
              data
            } = res;
            if (data && data.success) {
              // 调用成功
              wx.setStorage({
                key: "USER_INFO",
                data: data.data
              })
            } else {
              console.warn('登录失败', res.errMsg)
            }
          },
          fail: () => {
            console.warn('接口调用失败')
          }
        })

      }
    })
  },
  ready() {
    var that = this;
    wx.getLocation({
      success: function(res) {
        console.log('getLocation', res)
      },
    });
    return new Promise(function (resolve, reject) {
      var value = wx.getStorageSync('USER_INFO')
      wx.checkSession({
        success(res) {
          console.log('checkSuccess==>', res)
          // session_key 未过期，并且在本生命周期一直有效
          resolve(value)
        },
        fail() {
          // session_key 已经失效，需要重新执行登录流程
          this.login() // 重新登录
          reject()
        }
      })
    })
  },
  globalData: {
    token: null,
    session_key: null,
    userInfo: {},
    apiUrl: 'http://wkvtqa.natappfree.cc'
  }
})