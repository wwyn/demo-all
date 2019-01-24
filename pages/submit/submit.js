// pages/submit/submit.js
const util = require('../../utils/util.js');
import WxValidate from '../../utils/WxValidate.js';
import WxParse from '../../wxParse/wxParse.js';
var Validate = ""
Page({

  /**
   * 页面的初始数据
   */

  data: {
    leftLooks: '20',
    topLooks: '20',
    userInfo: [],
    form_info: '',
    show: false,
    showcanvas: false,
    min: 10,
    maxtext: 100,
    number: 0,
    carsList: [{
        name: "宝马"
      },
      {
        name: "奔驰"
      },
      {
        name: "丰田"
      },
      {
        name: "大众"
      },
      {
        name: "现代"
      },
      {
        name: "本田"
      },
      {
        name: "马自达"
      },
      {
        name: "沃尔沃"
      },
      {
        name: "奥迪"
      },
      {
        name: "东风"
      }, {
        name: "三菱"
      },

    ],
    isExpand: false,
    max: 5,
    prurl:''
  },
  imagetouchmove: function (e) {
    var self = this;
    self.setData({
      leftLooks: e.touches[0].clientX - 60,
      topLooks: e.touches[0].clientY - 60
    })
  },
  lookMore: function(e) {
    this.setData({
      isExpand: true
    })
  },
  xiaoshi: function(e) {
    this.setData({
      show: false
    })
  },
  zuzhi: function(e) {
    e.stopPropagation();
  },

  del: function(e) {
    let index = e.target.dataset.index;
    let newUser = this.data.userInfo;
    newUser.splice(index, 1);
    this.setData({
      userInfo: newUser
    })
  },

  createImg: function() {
    this.setData({
      show: true
    })
  },
  draw: function() {
    
    let promise1 = new Promise(function (resolve, reject) {

      /* 获得要在画布上绘制的图片 */
      wx.getImageInfo({
        src: '../../img/Bitmap.png',
        success: function (res) {
          console.log(res)
          resolve(res);
        }
      })
    });
    let promise2 = new Promise(function (resolve, reject) {
      wx.getImageInfo({
        src: '../../img/Bitmap.png',
        success: function (res) {
          console.log(res)
          resolve(res);
        }
      })
    });
    Promise.all(
      [promise1, promise2]
    ).then(res => {
      /* 创建 canvas 画布 */
      console.log('1111')
      const ctx = wx.createCanvasContext('shareImg')

      /* 绘制图像到画布  图片的位置你自己计算好就行 参数的含义看文档 */
      /* ps: 网络图片的话 就不用加../../路径了 反正我这里路径得加 */
      ctx.drawImage(res[0].path, 158, 190, 210, 210)
      ctx.drawImage(res[1].path, 0, 0, 545, 771)

      /* 绘制文字 位置自己计算 参数自己看文档 */
      ctx.setTextAlign('center')                        //  位置
      ctx.setFillStyle('#ffffff')                       //  颜色
      ctx.setFontSize(22)                               //  字号
      ctx.fillText('分享文字描述', 545 / 2, 130)         //  内容  不会自己换行 需手动换行
      ctx.fillText('分享文字描述', 545 / 2, 160)         //  内容

      /* 绘制 */
      ctx.stroke()
      ctx.draw()
    }).then( res=> {
      this.tupian()
    }).then(res => {
     
    })
    },
  tupian: function() {
    var that = this;
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 545,
      height: 771,
      destWidth: 545,
      destHeight: 771,
      canvasId: 'shareCanvas',
      success: function (res) {
        console.log(res, 'woshinidaye')
        that.setData({
          prurl: res.tempFilePath,
        })
        wx.saveImageToPhotosAlbum({
          filePath: that.data.prurl,
          success(res) {
            console.log(that.data.prurl, 'zw')
            wx.showModal({
              content: '图片已保存到相册，赶紧晒一下吧~',
              showCancel: false,
              confirmText: '好的',
              confirmColor: '#333',
              success: function (res) {
                if (res.confirm) {
                  that.setData({
                    show: false
                  })
                  console.log('用户点击确定');
                }
              }
            })
          }
        })

      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  
  saveImageToPhoto: function() {
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              console.log('授权成功')
            }
          })
        }
      }
    })
    this.draw();      
  },
  // 手机验证
  validatemobile: function(mobile) {
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
  // 领取优惠卷
  receive: function() {
    wx.showModal({
      title: '领取成功',
      content: '已经领取一张优惠卷',
    })
    this.setData({
      number: this.data.number + 1
    })
    wx.navigateTo({
      url: '/pages/redPacket/redPacket'
    })

  },
  tiaozhuan: function() {
    wx.navigateTo({
      url: '/pages/ranking/ranking'
    })

  },
  tiaozhuanh5: function() {
    wx.navigateTo({
      url: '/pages/tzh5/tzh5'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var article = '<div>我是HTML代码</div>';
    var that = this;
    WxParse.wxParse('article', 'html', article, that, 5);
    //数据进行校验
    const rules = {
      mobile: {
        required: true,
        tel: true,
      },
      consignee: {
        required: true,
      },
      address: {
        required: true,
        minlength: 2,
      },
      zipcode: {
        digits: true,
      }
    }
    // 验证字段的提示信息，若不传则调用默认的信息
    const messages = {
      mobile: {
        required: '请输入手机号码',
        tel: '请输入正确的手机号码',
      },
      consignee: {
        required: '请输入收货人',
      },
      address: {
        required: '请输入收货地址',
        minlength: '请输入正确的收货地址',
      },
      zipcode: {
        digits: '请输入正确的邮编'
      }
    }
    Validate = new WxValidate(rules, messages)

  },
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },

  formSubmit: function(e) {
    let mobile = e.detail.value.mobile;
    if (!this.validatemobile(mobile)) {
      return;
    }
    const params = e.detail.value
    // 传入表单数据，调用验证方法
    if (!Validate.checkForm(e)) {
      const error = Validate.errorList;
      console.log(error)
    }

    // let arr = e.detail.value;
    let newUser = this.data.userInfo
    newUser.push(params);
    this.setData({
      userInfo: newUser,
      form_info: ''
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})