// pages/kolrse/kolrse.js
var app = getApp();

import { Kolrse } from 'kolrse-model.js';

var kolrse = new Kolrse(); //实例化 首页 对象

Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden:false,
    url: app.globalData.url,
    list:[],
    editorHeight: 300,
    keyboardHeight: 0,
    invite_number:0,
    details: '',
    invite:[],
    replace:'去邀请',
    follow:'关注',
    status:0,
    follow_number:0,
    readOnly:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    var pro_id = options.pro_id

    console.log(pro_id)  

    kolrse.koldelite(pro_id, (data) => {

    var message = JSON.parse(data);  

   console.log(message.data)


    if (message.data.invite){
        var invite = JSON.parse(JSON.parse(message.data.invite));   
     }else{
        var invite = [];
     }

      if (message.data.status == 1){
       that.setData({
         follow:'取消关注',
    
         status:0
       })
      }else{
       that.setData({
         follow: '关注',
         status: 1
       })
     }

    that.setData({
         list: message.data,
         follow_number: message.data.follow_number,
         invite: invite,
         invite_number: message.data.invite_number,
         loadingHidden:true
    })
  

    })
 

  },

 /*
 跳转KOL
 */
  navCategory:function(){
    wx.switchTab({
      url: '/pages/category/category'
    })
  },

  /*
   邀请
  */
  invite:function(e){

    var that = this
  
    var kol_id = e.currentTarget.dataset.kol_id

    var invite_number = that.data.invite_number



    var image_list = that.data.invite

    kolrse.invite(kol_id, (data) => {
      var result = JSON.parse(data); 
      console.log(result)

      if (result.code == 201){
        invite_number = parseInt(invite_number) + 1



        var img = { 'avatar_url': result.data };

        image_list.push(img)

        that.setData({
          invite: image_list,
          invite_number: invite_number,
          replace: '已邀请'
        })
      } else if (result.code = 412){

        wx.showModal({
          title: result.msg,
          content: '确定跳转到身份切换页面吗？',
          showCancel: true,//是否显示取消按钮
          success: function (res) {
            if (res.cancel) {

              console.log('取消')
            } else {

              wx.switchTab({
                url: '/pages/my/my'
              })

            }
          },
          fail: function (res) { },//接口调用失败的回调函数
          complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
        })
      }

      else{
        wx.showToast({
          title: result.msg,
          icon: 'none',
          duration: 1000,
          mask: true,
        })
      }

    })
   
  },

/*
  关注
*/
  concern:function(e){
    //网红KOL
    var that = this
    var user_id = e.currentTarget.dataset.user_id
    var status = e.currentTarget.dataset.status
    var follow_number = that.data.follow_number
    var msg = [];
    msg['user_id'] = user_id
    msg['status'] = status

    kolrse.follow(msg, (data) => {
    var result = JSON.parse(data); 
      if (result.code == 201){
        var status = result.data
        if (status == 1) {
          that.setData({
            status: 0,
            follow_number: parseInt(follow_number)+1,
            follow: '取消关注'
          })
        } else {
          that.setData({
            status: 1,
            follow_number: parseInt(follow_number)-1,
            follow: '关注'
          })
        }
      }else{
        wx.showToast({
          title: result.msg,
          icon: 'none',
          duration: 1000,
          mask: true,
        })
      }


    })
  },

  /*
   编辑器
  */
  updatePosition(keyboardHeight) {
    const toolbarHeight = 100
    const { windowHeight, platform } = wx.getSystemInfoSync()
    let editorHeight = keyboardHeight > 0 ? (windowHeight - keyboardHeight - toolbarHeight) : windowHeight
    this.setData({ editorHeight, keyboardHeight })
  },
  calNavigationBarAndStatusBar() {
    const systemInfo = wx.getSystemInfoSync()
    const { statusBarHeight, platform } = systemInfo
    const isIOS = platform === 'ios'
    const navigationBarHeight = isIOS ? 44 : 48
    return statusBarHeight + navigationBarHeight
  },

  onEditorReady() {

    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
    that.editorCtx = res.context
    var describe = that.data.list['profile']
 
    that.editorCtx.setContents({
    html: describe,
    success: (res) => {
    console.log(res)
    },
    fail: (res) => {
    console.log(res)
    }
      })

    }).exec()
  },


  bindinput: function (e) {
    var that = this
    var info = e.detail.html
    that.setData({
      details: info
    })

  },

  bindfocus: function (e) {
    var that = this
    var info = e.detail.html
    that.setData({
      details: info
    })
  },


  blur() {
    this.editorCtx.blur()
  },
  format(e) {
    console.log(e)
    let { name, value } = e.target.dataset
    if (!name) return
    console.log('format', name, value)

    this.editorCtx.format(name, value)

  },
  onStatusChange(e) {
    const formats = e.detail
    console.log(formats)

    this.setData({ formats })
  },
  insertDivider() {
    this.editorCtx.insertDivider({
      success: function () {
        console.log('insert divider success')
      }
    })
  },
  clear() {
    this.editorCtx.clear({
      success: function (res) {
        console.log("clear success")
      }
    })
  },
  removeFormat() {
    this.editorCtx.removeFormat()
  },
  insertDate() {
    const date = new Date()
    const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    this.editorCtx.insertText({
      text: formatDate
    })
  },
  insertImage() {
    const that = this
    wx.chooseImage({
      count: 1,
      success: function (res) {

        that.editorCtx.insertImage({
          src: res.tempFilePaths[0],
          data: {
            id: 'abcd',
            role: 'god'
          },
          width: '100%',
          success: function (e) {
            console.log(e)

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