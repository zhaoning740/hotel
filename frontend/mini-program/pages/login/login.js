var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_token: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    var _this = this
    this.setData({
      user_token: app.globalData.token
    })
    wx.getSetting({

      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            data: { withCredentials: true },
            success: function (res) {
              wx.request({
                url: app.globalData.apiUrl + 'WechatAuth/WXBizData',
                method: 'GET',
                data: { encryptedData: res.encryptedData, iv: res.iv, session_key: app.globalData.session_key },
                header: {
                  'Content-Type': 'application/json'
                },
                success: function (res) {

                  _this.setData({
                    user_token: res.data.data.token
                  })
                }
              })
            }
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onGotUserInfo: function () {

    wx.getSetting({

      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            data: { withCredentials: true },
            success: function (res) {
              wx.request({
                url: app.globalData.apiUrl + 'WechatAuth/WXBizData',
                method: 'GET',
                data: { encryptedData: res.encryptedData, iv: res.iv, session_key: app.globalData.session_key, token: app.globalData.token },
                header: {
                  'Content-Type': 'application/json'
                },
                success: function (res) {
                  wx.navigateBack({
                    delta: 1
                  })

                }
              })
            }
          })
        }
      }
    })

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