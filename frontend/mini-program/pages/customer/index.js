// pages/customer/index'.js
const app = getApp();
const R = require('../../utils/request.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    orderList:[],
    orderUsedList: [],
    orderUnusedList: [],
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
    this.fetchOrderList()
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
  onTabChange: function (event) {
    if (event.detail.index === 0 || event.detail.title === '全部订单'){
      this.fetchOrderList()
    }
  },
  fetchOrderList: function (param = {}) {
    const _this = this;
    R.request({
      url: '/order/list',
      method: 'post',
      data: {
        ...param,
        id: app.globalData.id
      },
      success: (res) => {
        if (Array.isArray(res.data)) {
          const list = res.data;
          const orderUsedList = list.filter(item => item.state === 1);
          const orderUnusedList = list.filter(item => item.state === 0);
          _this.setData({
            orderList: list,
            orderUsedList,
            orderUnusedList
          })
        }
      }
    })
  },
  /** 跳转详情页 */
  toInfoUrl(e) {
    console.log(e.target.id)
    const id = e.target.id;
    const url = '/pages/orderInfo/orderInfo?orderId=' + id;
    wx: wx.navigateTo({
      url
    })
  },
})