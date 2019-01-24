// pages/map/map.js
import bmap from '../../utils/bmap-wx.min.js'
var wxMarkerData = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
      ak: "WW29V94x9bBvUwT6GAHOhQjcWaDveAEU", //填写申请到的ak
      markers: [],
      longitude: '', //经度
      latitude: '', //纬度
      address: '', //地址
      cityInfo: {} //城市信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    /* 获取定位地理位置 */
    // 新建bmap对象
    var BMap = new bmap.BMapWX({
      ak: that.data.ak
    });
    var fail = function (data) {
    };
    var success = function (data) {
      //返回数据内，已经包含经纬度
      //使用wxMarkerData获取数据
      wxMarkerData = data.wxMarkerData;
      //把所有数据放在初始化data内
      that.setData({
        markers: wxMarkerData,
        latitude: wxMarkerData[0].latitude,
        longitude: wxMarkerData[0].longitude,
        address: wxMarkerData[0].address,
        cityInfo: data.originalData.result.addressComponent
      });
    }
    // 发起regeocoding检索请求
    BMap.regeocoding({
      success: success,
      fail: fail
    });
    //  获取当前的地理位置、速度。  
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 18
        })
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