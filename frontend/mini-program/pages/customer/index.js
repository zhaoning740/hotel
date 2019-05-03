// pages/customer/index'.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    orderList:[
      {
        id: 12,
        num:  1,
        price: 125,
        desc: '独立房间·1卧1床1卫',
        title: '安德里北街地铁+限女生+吃货天堂+独立公寓+独立公寓',
        imageURL: 'http://www.heyjuice.cn//Public/Wap/images/qxqt_00001.jpg'
      },
      {
        id: 13,
        num: 2,
        price: 345,
        desc: '独立房间·1卧1床1卫',
        title: '安德里北街地铁+限女生+吃货天堂+独立公寓+独立公寓',
        imageURL: 'http://www.heyjuice.cn//Public/Wap/images/qxqt_00001.jpg'
      },
      {
        id: 14,
        num: 3,
        price: 225,
        desc: '独立房间·1卧1床1卫',
        title: '安德里北街地铁+限女生+吃货天堂+独立公寓+独立公寓',
        imageURL: 'http://www.heyjuice.cn//Public/Wap/images/qxqt_00001.jpg'
      }
    ],
    orderUsedList: [
      {
        id: 15,
        num: 1,
        price: 125,
        desc: '独立房间·1卧1床1卫',
        title: '安德里北街地铁+限女生+吃货天堂+独立公寓+独立公寓',
        imageURL: 'http://www.heyjuice.cn//Public/Wap/images/qxqt_00001.jpg'
      },
      {
        id: 17,
        num: 2,
        price: 345,
        desc: '独立房间·1卧1床1卫',
        title: '安德里北街地铁+限女生+吃货天堂+独立公寓+独立公寓',
        imageURL: 'http://www.heyjuice.cn//Public/Wap/images/qxqt_00001.jpg'
      },
      {
        id: 18,
        num: 3,
        price: 225,
        desc: '独立房间·1卧1床1卫',
        title: '安德里北街地铁+限女生+吃货天堂+独立公寓+独立公寓',
        imageURL: 'http://www.heyjuice.cn//Public/Wap/images/qxqt_00001.jpg'
      }
    ],
    orderUnusedList: [
      {
        id: 14,
        num: 1,
        price: 125,
        desc: '独立房间·1卧1床1卫',
        title: '安德里北街地铁+限女生+吃货天堂+独立公寓+独立公寓',
        imageURL: 'http://www.heyjuice.cn//Public/Wap/images/qxqt_00001.jpg'
      },
      {
        id: 13,
        num: 2,
        price: 345,
        desc: '独立房间·1卧1床1卫',
        title: '安德里北街地铁+限女生+吃货天堂+独立公寓+独立公寓',
        imageURL: 'http://www.heyjuice.cn//Public/Wap/images/qxqt_00001.jpg'
      },
      {
        id: 17,
        num: 3,
        price: 225,
        desc: '独立房间·1卧1床1卫',
        title: '安德里北街地铁+限女生+吃货天堂+独立公寓+独立公寓',
        imageURL: 'http://www.heyjuice.cn//Public/Wap/images/qxqt_00001.jpg'
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.ready().then(() => {
      if (app.globalData.userInfo) {
        this.setData({
          userInfo: app.globalData.userInfo,
        })
      }
    })
  },
  // 跳转详情页
  toInfoUrl(e){
    console.log(e.target.id)
    const id = e.target.id;
    const url = '/pages/orderInfo/orderInfo?id=' + id;
    wx:wx.navigateTo({
      url
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

  }
})