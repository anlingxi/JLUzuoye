// pages/dingdan/dingdan.js
wx.cloud.init({
  env: 'cloud1-7gqu17bd5d688661',
  traceUser: true,
})
const db = wx.cloud.database()
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msgList: "",
    userid: '',
    username: "",
    openid: '',
    rmb: ''
  },
  showsq: function () {
    wx.switchTab({
      url: '../my/my',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const app = getApp()
    var userid = app.globalData.userid
    this.setData({
      openid: userid,
    })
    wx.cloud.callFunction({
      name: 'lookup',
      data: {
        userid: app.globalData.userid
      },
      complete: res => {
        console.log(res.result.list)
        this.setData({
          rmb: res.result.list
        })
      }
    })
  },
  getUserInfo(e) {
    console.log(e);
    this.setData({
      username: e.detail.userInfo.nickName
    })
  },
  getopenid() {
    var that = this;
    wx.cloud.callFunction({
      name: 'open',
      success: (res) => {
        var usid = res.result.openid
        console.log(usid)
        this.setData({
          openid: res.result.openid,
        })
        getApp().globalData.userid = res.result.openid

      },
      fail(res) {
        console.log("获取失败", res);
      }
    })
  },
  binqc: function (e) {
    console.log(e.currentTarget.id)
    db.collection('dd').doc(e.currentTarget.id).remove({
      success: function (res) {
       
      }
    })
    wx.cloud.callFunction({
      name: 'lookup',
      data: {
        userid: app.globalData.userid
      },
      complete: res => {
        console.log(res.result.list)
        this.setData({
          rmb: res.result.list
        })
      }
    })
  },
  binxd: function (e) {
    db.collection('dd').doc(e.currentTarget.id).update({
      // data 传入需要局部更新的数据
      data: {
        // 表示将 done 字段置为 true
        xd: 1 
      },
      success: function(res) {
        wx.showToast({
          title: '下单成功',
          icon: 'success',
          duration: 2000
      })
      }
    })
    wx.cloud.callFunction({
      name: 'lookup',
      data: {
        userid: app.globalData.userid
      },
      complete: res => {
        console.log(res.result.list)
        this.setData({
          rmb: res.result.list
        })
      }
    })
  },
  xd: function (e) {
    wx.navigateTo({
      url: '/pages/xd/xd',
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
sxxxx(e) {
  wx.cloud.callFunction({
    name: 'lookup',
    data: {
      userid: app.globalData.userid
    },
    complete: res => {
      console.log(res.result.list)
      this.setData({
        rmb: res.result.list
      })
    }
  })
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
