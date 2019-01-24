// pages/shopping/shopping.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAllSelect: false,
    totalMoney: 0,
    // 商品详情介绍
    carts: [{
        pic: "http://mz.djmall.xmisp.cn/files/product/20161201/148058328876.jpg",
        name: "日本资生堂洗颜",
        price: 200,
        isSelect: false,
        // 数据设定
        count: {
          quantity: 2,
          min: 1,
          max: 20
        },
      },
      {
        pic: 'http://mz.djmall.xmisp.cn/files/product/20161201/148058301941.jpg',
        name: "倩碧焕妍活力精华露",
        price: 340,
        isSelect: false,
        // 数据设定
        count: {
          quantity: 1,
          min: 1,
          max: 20
        },
      },
      {
        pic: 'http://mz.djmall.xmisp.cn/files/product/20161201/14805828016.jpg',
        name: "特效润肤露",
        price: 390,
        isSelect: false,
        // 数据设定
        count: {
          quantity: 3,
          min: 1,
          max: 20
        },
      },
      {
        pic: 'http://mz.djmall.xmisp.cn/files/product/20161201/148058228431.jpg',
        name: "倩碧水嫩保湿精华面霜",
        price: 490,
        isSelect: false,
        // 数据设定
        count: {
          quantity: 1,
          min: 1,
          max: 20
        },
      },
      {
        pic: 'http://mz.djmall.xmisp.cn/files/product/20161201/148057953326.jpg',
        name: "兰蔻清莹柔肤爽肤水",
        price: 289,
        isSelect: false,
        // 数据设定
        count: {
          quantity: 10,
          min: 1,
          max: 20
        },
      },
      {
        pic: "http://mz.djmall.xmisp.cn/files/product/20161201/148057921620_middle.jpg",
        name: "LANCOME兰蔻小黑瓶精华",
        price: 230,
        isSelect: false,
        // 数据设定
        count: {
          quantity: 1,
          min: 1,
          max: 20
        },
      },
    ],
  },
  
  switchSelect: function(e) {
    let Allprice = 0;
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    this.data.carts[index].isSelect = !this.data.carts[index].isSelect;
    if (this.data.carts[index].isSelect) {
      this.data.totalMoney += this.data.carts[index].price
    } else {
      this.data.totalMoney -= this.data.carts[index].price
    }
    for(var i = 0;i <this.data.carts.length;i++) {
     Allprice += this.data.carts[i].price;
    }
    if (Allprice==this.data.totalMoney) {
      this.data.isAllSelect = true;
    } else {
      this.data.isAllSelect = false;
    }
    this.setData({
      carts: this.data.carts,
      totalMoney: this.data.totalMoney,
      isAllSelect: this.data.isAllSelect
    })
  },
  allSelect: function() {
    if(!this.data.isAllSelect) {
      this.setData({
        totalMoney: 0
      })
      for(var i=0;i<this.data.carts.length; i++) {
        this.data.carts[i].isSelect = true;
        this.data.totalMoney += this.data.carts[i].price;
      }
    } else {
      for (var i = 0; i < this.data.carts.length; i++) {
        this.data.carts[i].isSelect = false;
      }
      this.data.totalMoney = 0;
    }
    this.setData({
      carts: this.data.carts,
      totalMoney: this.data.totalMoney,
      isAllSelect: !this.data.isAllSelect,
    })
  },
  // 支付按钮点击事件
  toBuy: function () {
    
  },
  onGotUserInfo: function(e) {
    console.log(e,'111')
    if (e.detail.userInfo) {
      wx.setStorage({
        key: 'user_info',
        data: e.detail.userInfo,
      })
      this.setData({
        userInfo: e.detail.userInfo,
      })
    } else {
      this.setData({
      })
    }
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