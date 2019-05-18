// pages/product/product.js
const app = getApp()
const util = require('../../utils/util.js')
const R = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    proList: []
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
    const param = app.globalData.searchParam;
    this.fetchGoodList(param)
  },
  //请求列表
  fetchAll() {
    console.log('liebiao ')
  },
  // 跳转详情页
  tapProInfo(e) {
    const id = e.currentTarget.id;
    const url = '/pages/product/product?id=' + id;
    wx.navigateTo({
      url,
    })
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
  /** 请求商品列表 */
  fetchGoodList(data = {}) {
    var _this = this
    R.request({
      url: '/good/list',
      method: 'post',
      data: data,
      success: (res) => {
        if (Array.isArray(res.data)) {
          const list = res.data.map(item => ({
            ...item,
            picture: (Array.isArray(item.picture) && item.picture.map(i => (app.globalData.apiUrl + app.globalData.imgUrl + i))) || ['/images/1.jpg'],
          }))
          _this.setData({
            proList: list
          })
        }
      }
    })
  },
})