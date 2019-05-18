const app = getApp();
const util = require('../../utils/util.js');
const R = require('../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: '',
    orderInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderId: options.orderId,
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
    this.fetchOrderDetail()
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
  fetchOrderDetail: function (id = this.data.orderId) {
    const _this = this;
    R.request({
      url: '/order/list/',
      method: 'post',
      data: { id: app.globalData.id },
      success: (res) => {
        if (Array.isArray(res.data)) {
          const info = res.data.find(i => i.id == id) || {};
          info.createtime = util.formatUnixtime(info.createtime)
          switch(info.state) {
            case 0:
              info.state = '未使用';
              break;
            case 1:
              info.state = '已使用';
              break;
          }
          console.log('orderInfo', info)
          _this.setData({
            orderInfo: info,
          })
        }
      },
      fail: () => {
        wx.navigateBack({
          delta: 1,
        })
      }
    })
  },
})