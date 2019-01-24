// import wxCharts from '../../utils/wxcharts.js'
// let chart = new wxCharts({
//   canvasId: 'columnCanvas',
//   type: 'column',
//   animation: true,
//   categories: ['2012', '2013', '2014', '2015'],
//   series: [{
//     name: '成交量',
//     data: [10,20,30,40],
//     format: function (val, name) {
//       return val.toFixed(2) + '万';
//     }
//   }],
//   yAxis: {
//     format: function (val) {
//       return val + '万';
//     },
//     title: 'Column',
//     min: 0
//   },
//   xAxis: {
//     disableGrid: false,
//     type: 'calibration'
//   },
//   extra: {
//     column: {
//       width: 15
//     }
//   },
//   width: 300,
//   height: 200,
// });
 
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bgImg: '../../img/bbbb.png',
        addText: false,
        inputVal: '',
        addTextList: [],
        addValue: '',
        ballTop: '',
        ballLeft: '',
        screenHeight: 220,
        screenWidth: 0,
        selectIndex: -1,
    },
 

    // 复制
    clone: function() {
        var self = this;
        let v = '2';
        console.log(v, 'wxp')
        wx.setClipboardData({
            data: v,
            success: function(res) {
                wx.getClipboardData({
                    success: function(res) {
                        console.log(res.data) // data
                    }
                })
            }
        })
    },
    // 删除
  delete: function(e) {
    let { addTextList, selectIndex } = this.data;
    console.log(addTextList, selectIndex,'qq')
    addTextList.splice(selectIndex,1)
    this.setData({
      addTextList
    })
  },
    // 拖拽
    ballMoveEvent: function(e) {
      // this.setData({
      //   selectIndex: e.target.dataset.index
      // })
        console.log(e, '我被拖动了....')
        var touchs = e.touches[0];
        var pageX = touchs.pageX;
        var pageY = touchs.pageY;
        console.log('pageX: ' + pageX)
        console.log('pageY: ' + pageY)
        //防止坐标越界,view宽高的一般  
        if (pageX < 0) return;
        if (pageX > this.data.screenWidth - 40) return;
        if (this.data.screenHeight - pageY <= 20) return;
        if (pageY <= 0) return;
        // console.log('x: ' + x)
        // console.log('y: ' + y)
        const index = e.target.dataset.index;
        const item = this.data.addTextList[index];
        item.left = pageX;
        item.top = pageY;
        this.setData({
            addTextList: this.data.addTextList
        });
    },
    stop: function(e) {
        this.setData({
            selectIndex: e.target.dataset.index
        })
        // e.preventDefault();
        // e.stopPropagation()
    },
    inputText: function(e) {
        let value = e.detail.value;
        this.setData({
            inputVal: value,
        })
    },
    affirm: function() {
        let iptv = this.data.inputVal;
        if (iptv.trim() == '') return;
        this.data.addTextList.push({
            text: iptv,
            left: 0,
            top: 0,
            classList: {
                textAlign: 'left',
                styles: [],
            },
        });
        this.setData({
            addTextList: this.data.addTextList,
            inputVal: '',
        })

    },
    setClass(e) {
        const { addTextList, selectIndex } = this.data;
        const item = addTextList[selectIndex];
        item.classList.textAlign = e.target.dataset.class;
        this.setData({ addTextList });
    },
    setStyles(e) {
        const { addTextList, selectIndex } = this.data;
        const item = addTextList[selectIndex];
        const className = e.target.dataset.class;
        const is = item.classList.styles.find(item => item === className);
        if (is) return;
        item.classList.styles.push(className);
        this.setData({ addTextList });
    },
    addImg: function() {
        let that = this;
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function(res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var tempFilesSize = res.tempFiles[0].size; //获取图片的大小，单位B
                if (tempFilesSize <= 1000000) { //图片小于或者等于1M时 可以执行获取图片
                    var tempFilePaths = res.tempFilePaths[0]; //获取图片
                    // upload(that, tempFilePaths);
                    that.setData({
                        bgImg: tempFilePaths,
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
    upload: function(page, path) {
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
                success: function(res) {
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
                fail: function(e) {
                    wx.showModal({
                        title: '提示',
                        content: '上传失败',
                        showCancel: false
                    })
                },
                complete: function() {}
            })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var _this = this;
        wx.getSystemInfo({
            success: function(res) {
                console.log(res, 'ww')
                _this.setData({
                    screenWidth: res.windowWidth,
                });
            }
        });
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