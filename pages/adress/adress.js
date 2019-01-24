// pages/adress/adress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    adress:{},
    region: ['广东省', '广州市', '海珠区'],
    NumberList: ['你好','行吧','嗯嗯嗯','该配合演出的我你视而不见','那些说分不开的都不见得']
  },
 
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)

    wx.navigateTo({
      url: '/pages/my/my?name=' + e.detail.value.name + '&phone=' + e.detail.value.phone + '&adress=' + e.detail.value.adress,
    })
  },
  bindRegionChange: function (e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.obj!==undefined) {
      var queryBean = JSON.parse(options.obj);
      let arr = queryBean.adress.split(',');
      console.log(arr,'arr')
      console.log(queryBean);
      this.setData({
        adress: queryBean,
        region: arr
      })
    } else{
      this.setData({
        adress: {}
      })
    }
    
  },
  upTop: function(e) {
    let index = e.currentTarget.dataset.index;
    if(index ==0)return;
    let NumberList = this.data.NumberList;
    let temp = '';
    temp = NumberList[index];
    NumberList[index] = NumberList[index - 1];
    NumberList[index - 1] = temp;
    this.setData({
      NumberList
    })
  },
  shiftDown:function(e) {
    let index = e.currentTarget.dataset.index;
    let NumberList = this.data.NumberList;
    if (index == NumberList.length - 1) return;
    let temp = '';
    temp = NumberList[index];
    NumberList[index] = NumberList[index + 1];
    NumberList[index + 1] = temp;
    this.setData({
      NumberList
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