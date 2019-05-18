// pages/submit/submit.js
const app = getApp();
const util = require('../../utils/util.js');
const R = require('../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '', //商品id
    userInfo: app.globalData.userInfo,
    showStart: false,
    showBeginTime: util.formatUnixtime(+new Date()),
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return `${value}日`;
    },
    productInfo: {
      price: 100,
    },
    submitInfo: {
      account: app.globalData.id,
      phone: '',
      store: '123456',
      checkintime: util.formatTime(new Date()),
      checkouttime: util.formatTime(new Date()),
      day: 1,
      money: 0.00
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      submitInfo: {
        ...this.data.submitInfo,
        goodId: options.id,
      }
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
            picture: (Array.isArray(res.data.picture) && res.data.picture.map(i => (app.globalData.apiUrl + app.globalData.imgUrl + i))) || ['/images/3.jpg', '/images/4.jpg'],
          };
          _this.setData({
            productInfo: info,
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
  onChangeStartTime: function () {
    this.setData({
      showStart: true
    })
  },
  onCancelTime() {
    this.setData({
      showStart: false
    })
  },
  onConfirmTime(event) {
    this.setData({
      currentDate: event.detail,
      showStart: false,
      showBeginTime: util.formatUnixtime(event.detail),
      submitInfo: {
        ...this.data.submitInfo,
        checkintime: util.formatTime(new Date(event.detail)),
      }
    });

  },
  onDayChange(event) {
    this.setData({
      submitInfo: {
        ...this.data.submitInfo,
        day: event.detail,
        checkouttime: util.getDateString(this.data.submitInfo.checkintime, event.detail),
        money: event.detail * this.data.productInfo.price,
      }
    })
  },
  onPhoneChange: function(event) {
    this.setData({
      submitInfo: {
        ...this.data.submitInfo,
        phone: event.detail
      }
    })
  },
  // 支付
  onSubmit: function () {
    const that = this;
    wx.showModal({
      title: '提示',
      content: '确认支付',
      success(res) {
        if (res.confirm) {
          R.request({
            url: '/order/insert',
            data: that.data.submitInfo,
            header: {
              'content-type': 'application/json' // 默认值
            },
            method: 'post',
            success(res) {
              if (res.success) {
                wx.navigateTo({
                  url: '/pages/success/success?orderId=' + res.data
                })
              } else {
                wx.showToast({
                  title: '支付失败',
                  icon: 'none',
                  duration: 2000
                })
              }

            }
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
})