// pages/fenlei/fenlei.js
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "tabView": ['爆款排行榜', 'SUV排行榜', '轿车排行榜'],
    "curNavIndex": 0,
    hideLoading: true,
    shop: true
  },
  tabNavChange: function (res) {
    var that = this;
    let index = res.target.dataset.index;
    that.setData({
      curNavIndex: index
    })
  },
  evt_goto: function (e) {
    let _id = e.currentTarget.dataset.cat_id
    wx.navigateTo({
      url: '/pages/splist/splist?cat_id=' + _id
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    // util.wxRequest({
    //   url: config.BASE_URL + '/m/category.html',
    //   success: function (res) {
    //     // _this.setData({
    //     //   tabView: res.data.category_tree
    //     // });
    //   },
    //   complete: function () {
    //     _this.setData({
    //       hideLoading: true
    //     });
    //   }
    // });
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