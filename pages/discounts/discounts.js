// pages/discounts/discounts.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 0,
    youhuiList:[
      '待支付','可使用','已使用','已失效'
    ],
    content: '123'
  },
  tabDiscounts: function(e) {
    let index = e.currentTarget.dataset.idx;
    if(index==0) {
      this.setData({
        content: '123'
      })
    } else if(index == 1) {
      this.setData({
        content: '456'
      })
    }
    else if (index == 2) {
      this.setData({
        content: '789'
      })
    } else {
      this.setData({
        content: '10'
      })
    }
    this.setData({
      count: index
    })
  },
  toDetail: function() {
    wx.navigateTo({
      url: '/pages/detail/detail',
    })
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