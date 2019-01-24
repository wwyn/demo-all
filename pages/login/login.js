// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yanzhengma: "获取验证码",
    mobile: '',
    countdown: 60,
    disabled: false,
    verification:'',
    hasUserInfo: false,
    userInfo: {},
  },
  verification: function(e) {
    this.setData({
      verification: e.detail.value
    })
  },
  mobileInput: function(e) {
    this.setData({
      mobile: e.detail.value,
      disabled: false,
      countdown: 60,
    })
  },
  getMobile : function(val) {
    let mobile = this.data.mobile;
    if (!this.validatemobile(mobile)) {
      this.setData({
        disabled: true,
      })
      return;
    } 
    let that = this;
    if (this.data.countdown == 0) {
     this.setData({
       disabled: false,
       yanzhengma: "获取验证码",
       countdown: 60
     })
      return false;
    } else {
      this.data.countdown--;
      this.setData({
        disabled: true,
        yanzhengma: "重新获取"+ this.data.countdown,
        countdown: this.data.countdown
      })
    }
    setTimeout(function () {
      that.getMobile(val);
    }, 1000);

  },
  submit: function() {
    if (!this.data.mobile&& this.data.verification)return;
    console.log(this.data.mobile,this.data.verification)
    wx.navigateTo({
      url: '/pages/discounts/discounts',
    })
  },
  // 手机验证
  validatemobile: function (mobile) {
    if (mobile.length == 0) {
      wx.showToast({
        title: '请输入手机号！',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    if (mobile.length != 11) {
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(mobile)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    return true;
  },
  // 登录
  bindGetUserInfo: function (e) {
    console.log(e)
    if (e.detail.userInfo) {
      wx.setStorage({
        key: 'user_info',
        data: e.detail.userInfo,
      })
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: false
      })
    } else {
      this.setData({
        hasUserInfo: true
      })
    }

  },
  // 获取token
  getToken: function () {
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx8961d9b00d5f641f&secret=a7984d64f05542f25b472c3e8f987276',
      success: function(res) {
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          let userInfo = wx.getStorageSync('user_info');
          if (userInfo) {
            this.setData({
              userInfo: userInfo,
              hasUserInfo: false
            });
          } else {
            this.setData({
              hasUserInfo: true
            });
          };
        } else {
          this.setData({
            hasUserInfo: true
          });
        }
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