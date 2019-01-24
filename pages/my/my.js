// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isnum: true,
    liquanList:[
      {url:'../../img/Group9.png',name:'待支付'},
      { url: '../../img/Group11.png', name: '可使用' },
      { url: '../../img/Group12.png', name: '已使用' },
      { url: '../../img/Group13.png', name: '已失效' }
    ] , 
    myAdress:[
      { name: '诺诺', phone: '13866552782', adress: '闵行区漕宝路', checked:false}

    ]
  },
  addAdress: function() {
      wx.navigateTo({
        url: '/pages/adress/adress',
      })
  },
  radioChange: function(e) {
    let checkeds = e.detail.value;
    let list = this.data.myAdress;
    list.forEach((item, index) => {
      let click = checkeds=== item.name;
      if (click) {
        list[index].checked = true;
      } else {
        list[index].checked = false;
      }
    })
    this.setData({
      myAdress: list
    })
  },
  editor: function(e) {
    let obj = e.target.dataset.adress;
    let queryBean = JSON.stringify(obj);
    wx.navigateTo({
      url: '/pages/adress/adress?obj=' + queryBean,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let name = options || {};
      console.log(name.name);

    if (name.name !== undefined) {
      this.data.myAdress.push(name)
    }
    this.setData({
      myAdress: this.data.myAdress
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