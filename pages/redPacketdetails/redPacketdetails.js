// pages/redPacketdetails/redPacketdetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: false,
    animation: '',
    isparticipate: false,
    participate: '参与抽奖',
    isModel: false,
    isZhong: true,
    wlq: false,
  },
  delModel: function() {
    this.setData({
      isModel: false,
      wlq: true
    })
  },
  zmodel: function() {
    return false
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
  onPageScroll: function() {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'linear',
    })
    this.animation = animation
    animation.opacity(1).step()
    this.setData({
      animationData: animation.export()
    })
    setTimeout(function() {
      this.setData({
        hidden: true
      })
    }.bind(this), 100)

  },
  participate: function() {
    if (this.data.participate == "待开奖") {
      this.setData({
        isModel: true
      })
    }
    this.setData({
      isparticipate: true,
      participate: "待开奖"
    })
  
  },
  sharepeople: function() {

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})