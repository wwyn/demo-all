// pages/card/card.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [{
      name: 'jt',
      value: '精通业务'
    },
    {
      name: 'xl',
      value: '值得信赖',
      checked: true
    },
    {
      name: 'kk',
      value: '专业可靠'
    },
    {
      name: 'dn',
      value: '行业大牛'
    },
    ],
    tag:'',
    hiddenmodalput: true,  
    headImg:'../../img/bbbb.png'
  },
  inputVal: function(e) {
    this.setData({
      tag: e.detail.value
    })
  },
  // 添加标签
  addTitle: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  //取消按钮  
  cancel: function () {
    this.setData({
      tag: '',
      hiddenmodalput: true
    });
  },
  //确认  
  confirm: function () {
    let items = this.data.items;
    items.push({ name: this.data.tag, value: this.data.tag})
    this.setData({
      items,
      tag: '',
      hiddenmodalput: true,
    })
  }  ,
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  checkboxChange: function (e) {
    let checkeds = e.detail.value;
    let list = this.data.items;
    list.forEach((item, index) => {
      let click = checkeds.some(v => v === item.name);
      if (click) {
        list[index].checked = true;
      } else {
        list[index].checked = false;
      }
    })
    this.setData({
      items: list
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 更换头像
  addImg: function () {
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilesSize = res.tempFiles[0].size; //获取图片的大小，单位B
        if (tempFilesSize <= 1000000) { //图片小于或者等于1M时 可以执行获取图片
          var tempFilePaths = res.tempFilePaths[0]; //获取图片
          // upload(that, tempFilePaths);
          that.setData({
            headImg: tempFilePaths,
          })
        } else { //图片大于1M，弹出一个提示框
          wx.showToast({
            title: '上传图片不能大于1M!', //标题
            icon: 'none' //图标 none不使用图标，详情看官方文档
          })
        }
      }
    })
  },
  upload: function (page, path) {
    wx.showToast({
      icon: "loading",
      title: "正在上传"
    }),
      wx.uploadFile({
        url: config.SERVER_URL + "", //后台接口
        filePath: path,
        name: 'file',
        header: {
          "Content-Type": "multipart/form-data"
        },
        formData: {
          //和服务器约定的token, 一般也可以放在header中
          // 'session_token': wx.getStorageSync('session_token')
        },
        success: function (res) {
          if (res.statusCode != 200) {
            wx.showModal({
              title: '提示',
              content: '上传失败',
              showCancel: false
            })
            return;
          }
          var data = res.data
          this.setData({ //上传成功
            IDurl: data,
          })
        },
        fail: function (e) {
          wx.showModal({
            title: '提示',
            content: '上传失败',
            showCancel: false
          })
        },
        complete: function () { }
      })
  },

 
})