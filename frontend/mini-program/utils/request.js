/** 封装下wx.request, 加下loading和app.ready校验 */
const app = getApp()
const defaultConfig = {
  url: '',
  data: {},
  method: 'get',
  success: function (res) {
  },
  fail: function () {
  },
  complete: function () {
  },
  loading: true
}

function request(config = defaultConfig) {
  const requestHandler = { ...defaultConfig, ...config };
  const data = requestHandler.data;
  const url = app.globalData.apiUrl + requestHandler.url;
  const method = requestHandler.method;
  if (requestHandler.loading) {
    wx.showLoading({
      title: '加载中',
    })
  }
  app.ready().then((userInfo) => {
    console.log('ready done', userInfo)
    wx.request({
      url:  url,
      data: data,
      method: method,
      success: function (res) {
        console.log('req', res)
        if (res.statusCode === 200 && res.data.success) {
          requestHandler.success(res.data)
        } else {
          wx.showToast({
            title: '请求出错了！',
            icon: 'none',
          })
        }
      },
      fail: function () {
        requestHandler.fail();
      },
      complete: function () {
        if (requestHandler.loading) {
          wx.hideLoading();
        }
      }
    })
  }).catch((err) => {
    console.warn('ready err', err)
    if (requestHandler.loading) {
      wx.hideLoading();
    }
  });
}

module.exports = {
  request: request
}