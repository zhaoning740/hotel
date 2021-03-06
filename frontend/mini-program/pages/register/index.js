// pages/register/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    type: 0,
    address: '',
    phone: '',
    age: '',
    sex: 0,
    radio: '0'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    //判断下id有没有
    if (!app.globalData.id) {
      wx.showModal({
        title: '提示',
        content: '未获取到登录详细，请返回重试！',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            wx.navigateBack()
          }
        }
      })
    }
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

  },
  onUserNameChange({ detail }) {
    this.setData({
      username: detail,
    })
  },
  onPhoneChange({ detail }) {
    this.setData({
      phone: detail,
    })
  },
  onAddressChange({ detail }) {
    this.setData({
      address: detail,
    })
  },
  onAgeChange({ detail }) {
    this.setData({
      age: detail,
    })
  },
  onSexChange({ detail }) {
    this.setData({
      sex: detail,
    })
  },
  onSubmit() {
    console.log('submit', this.data, app.globalData)
    wx.request({
      url: app.globalData.apiUrl + '/user/register',
      data: {
        id: app.globalData.id,
        ...this.data,
      },
      method: 'post',
      // header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
        console.log('/user/register==>', res)
        const {
          data
        } = res;
        if (data && data.success && data.data) {
          // 调用成功
          // console.log('USER_INFO===>',data.data)
          wx.setStorage({
            key: "USER_INFO",
            data: data.data
          });
          wx.showToast({
            title: '注册成功',
            duration: 2000
          })
          setTimeout(function(){
            wx.switchTab({
              url: '/pages/index/index',
            })
          },2000)
        } else {
          wx.showToast({
            title: '注册失败' + data.message,
            icon: 'none'
          })
          console.warn('登录失败', res.errMsg)
        }
      },
    })
  }
})