// pages/product/product.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    proList: [
      {
        id: 1,
        desc: '独立房间·1卧1床1卫',
        adress: '安德里北街地铁+限女生+吃货天堂+独立公寓',
        image: 'http://static.heyjuice.cn/Public/Wap/images/9_03.jpg',
        money: 189
      },
      {
        id: 2,
        desc: '独立公寓·2卧2床1卫',
        adress: '西局地铁口XX大厦北行560m',
        image: 'http://static.heyjuice.cn/Public/Wap/images/2_520_21.jpg',
        money: 268
      }
    ]
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
    app.ready().then(() => {
      this.fetchAll()
    }).catch();
  },
  //请求列表
  fetchAll() {

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

  }
})