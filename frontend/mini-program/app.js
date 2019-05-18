//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // this.ready().then(()=> {
    //   // 获取用户信息
    //   wx.getSetting({
    //     success: res => {
    //       if (res.authSetting['scope.userInfo']) {
    //         // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //         wx.getUserInfo({
    //           success: res => {
    //             // 可以将 res 发送给后台解码出 unionId
    //             console.log('getUserInfo===>', res.userInfo)
    //             this.globalData.userInfo = res.userInfo
    //           }
    //         })
    //       } else {
    //         // this.globalData.showLoginModal = true;
    //       }
    //     }
    //   })
    // }).catch((err) => {
    //   console.warn('ready err', err);
    // })
    // 登录
    
  },
  login() {
    const _this = this;
    wx.login({
      success: function (res) {
        // 登录成功后拿code换客户信息
        console.log('wx.login success ==>', res);
        wx.request({
          url: _this.globalData.apiUrl + '/user/query',
          data: { code: res.code },
          method: 'get',
          success: function (res) {
            console.log('/user/query==>', res)
            const {
              data
            } = res;
            // 不管成没成功，先把id存到globalData
            if (data.data.id) {
              _this.globalData.id = data.data.id;
            }
            if (data && data.success && data.data) {
              // 调用成功
              wx.setStorage({
                key: "USER_INFO",
                data: data.data
              })
            } else {
              console.log('/user/query==>', res)
              wx.showToast({
                // title: '登录失败' + data.message,
                title: '请先注册',
                icon: 'none',
                success: () => {
                  wx.navigateTo({
                    url: '/pages/register/index?type=0',
                  })
                },
                duration: 5000
              })
              console.warn('登录失败', res.errMsg)
            }
          },
          fail: () => {
            console.warn('接口调用失败')
          }
        })

      }
    })
  },
  ready() {
    var _this = this;
    //获取地理位置
    // wx.getLocation({
    //   success: function(res) {
    //     console.log('getLocation', res)
    //   },
    // });
    return new Promise(function (resolve, reject) {
      const userInfo = wx.getStorageSync('USER_INFO')
      console.log('userInfo:', userInfo)
      if (!userInfo.id) {
        console.log('userInfo.id:',userInfo.id)
        _this.login()
        reject('NO USER_INFO id')
      } else {
        _this.globalData.id = userInfo.id;
        _this.globalData.userInfo = userInfo;
        wx.checkSession({
          success(res) {
            console.log('checkSuccess==>', res)
            // session_key 未过期，并且在本生命周期一直有效
            resolve(userInfo)
          },
          fail() {
            // session_key 已经失效，需要重新执行登录流程
            _this.login() // 重新登录
            reject('login err')
          }
        })
      }
      
    })
  },
  globalData: {
    id: '',//用户id
    showLoginModal: false,
    searchParam: {},
    userInfo: {},
    apiUrl: 'http://8bhydv.natappfree.cc',
    imgUrl: '/user/image/'
  }
})