// pages/product/product.js
const app = getApp()
const R = require('../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '', //商品id
    productInfo: {},
    indicatorDots: true,
    autoplay: true,
    interval: 4000,
    duration: 1000,
    circular: true,
    bannerList: [
      '/images/3.jpg',
      '/images/4.jpg'
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
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
  onShow: function (option) {
    this.fetchProductDetail()
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
  fetchProductDetail: function (id = this.data.id) {
    const _this = this;
    R.request({
      url: '/good/detail/' + id,
      method: 'get',
      success: (res) => {
        if (res.data) {
          console.log('/good/detail', res.data)
          const info = {
            ...res.data,
            goodHType: res.data.goodHType ? JSON.parse(res.data.goodHType) : {},
            picture: (Array.isArray(res.data.picture) && res.data.picture.map(i => (app.globalData.apiUrl + app.globalData.imgUrl + i))) || ['/images/3.jpg','/images/4.jpg'],
          };
          console.log(info.picture)
          _this.setData({
            productInfo: info,
            bannerList: info.picture,
          })
        }
      }
    })
  },
  // 支付
  toPayBtn: function () {
    const that = this;
    wx.navigateTo({
      url: '/pages/submit/submit?id=' + that.data.id,
    })
    // wx.showModal({
    //   title: '提示',
    //   content: '确认支付',
    //   success(res) {
    //     if (res.confirm) {
    //       R.request({
    //         url: '/order/insert',
    //         data: {
    //           account: app.globalData.id,
    //           store: '123456',
    //           checkintime: that.data.productInfo.starttime || '2019-5-4 12:19:17',
    //           checkouttime: that.data.productInfo.endtime || '2019-5-4 12:19:17',
    //           day: '1',
    //           money: '234'
    //         },
    //         header: {
    //           'content-type': 'application/json' // 默认值
    //         },
    //         method: 'post',
    //         success(res) {
    //           if (res.success) {
    //             wx.navigateTo({
    //               url: '/pages/success/success'
    //             })
    //           } else {
    //             wx.showToast({
    //               title: '支付失败',
    //               icon: 'none',
    //               duration: 2000
    //             })
    //           }

    //         }
    //       })

    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })
  },
})