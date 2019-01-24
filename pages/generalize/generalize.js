// pages/generalize/generalize.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   isLeft: false,
   isRight: false
  },
  click: function (e) {
    let selected = e.currentTarget.dataset.click;
    if (selected == "1") {
      this.setData({
        isLeft: true,
        isRight: false
      })
    } else {
      this.setData({
        isLeft: false,
        isRight: true
      })
    }
  },
  // 保存到相册
  savePhoto: function () {
    console.log(0)
     //获取相册授权
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
    var imgSrc = "http://yijiao.oss-cn-qingdao.aliyuncs.com/images/http://tmp/wx1b4e5e756cd48af1.o6zAJsws4grEQvYrWTjBigy-6QaU.0llhudiKSF2V955a1c48350d9328ef064b4d36d12746.jpg"
    wx.downloadFile({
      url: imgSrc,
      success: function (res) {
        console.log(res);
        //图片保存到本地
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (data) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail: function (err) {
            console.log(err);

          },
          complete(res) {
            console.log(res);
          }
        })
      }
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true
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
    //  转发
  onShareAppMessage: function (res) {
    console.log(res)
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/user'
    }
  },
})