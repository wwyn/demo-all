// pages/generate/generate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  toGeneralize: function() {
    wx.navigateTo({
      url: '/pages/generalize/generalize'
    })
  },
  copy: function(e) {
    let address = e.currentTarget.dataset.address;
    wx.setClipboardData({
      data: address,
      success: function(res) {
        wx.getClipboardData({
          success: function(res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
  QRcode: function() {
    var _url = '后台地址';
    wx.request({
      url: _url,
      //请求报文体
      data: [{
        id: agentCode
      }],
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        //为00时表示成功，得到二维码的地址
        if (res.data.code == '00') {
          console.log("成功")
          //下载二维码
          wx.downloadFile({
            url: res.data.body[0].URL,
            success: function(res) {
              //如果二维码中的id为固定值可以将图片保存到本地，否则不用保存
              wx.saveFile({
                tempFilePath: res.tempFilePath,
                success: function(res) {
                  console.log("保存成功")
                  _that.setData({
                    filePath: res.savedFilePath
                  })
                  console.log(res.savedFilePath)
                  try {
                    //id为定值，则将保存的地址存入缓存，非定值则只需要setData就行
                    wx.setStorageSync('filePath', res.savedFilePath)
                  } catch (e) {
                    console.log(e)
                  }
                },
                fail: function(res) {
                  console.log("保存失败")
                  console.log(res)
                }
              })
            },
            fail: function(res) {
              util.msg("错误", "通讯失败")
              console.log(res)
            }
          })
        } else {
          console.log("错误")
          util.msg("错误", res.data.msg)
        }
      },
      fail: function() {
        util.msg("错误", "通讯失败")
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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