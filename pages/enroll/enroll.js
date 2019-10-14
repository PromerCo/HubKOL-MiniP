
import { Enroll } from 'enroll-model.js';

var enroll = new Enroll(); //实例化 首页 对象

Page({
  /**
   * 页面的初始数据
   */
  data: {
    arr: [],
    list: [
       { "id": '性别' }, { "id": '手机号' }, { "id": '平台' }, { "id": '微信号' }, { "id": '粉丝' }
    ],
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var push_id = options.push_id
    enroll.partake(push_id, (data) => {
      var message = JSON.parse(data); 

      console.log(message)

      that.setData({
         arr: message.data
       })

    })
  
  },
  copy:function(e){

    wx.setClipboardData({
      data: e.currentTarget.dataset.info,
      success: function (res) {
    
      }
   });

  },



    downloadFile: function() {
      wx.downloadFile({
        url: "",
        success: function (res) {
      
          var rr = res.tempFilePath;
      
          wx.saveImageToPhotosAlbum({
            filePath: rr,
            success(res) {
              wx.showToast({
                title: '保存成功',
                icon: 'success',
                duration: 2000
              })
            }
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