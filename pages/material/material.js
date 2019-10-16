// pages/material/material.js
import { citys } from '../../utils/city.js';

import { Material } from 'material-model.js';

var material = new Material();

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: [],
    findex: 5,
    pindex:1,
    index: 0,
    temp: [],
    showList: false,
    isShow_01: false,
    hasUserInfo: false,
    showDialog: false,
    phoneNumber: '',
    userInfo: [],
    isHide: false,
    multiIndex: [0, 0],
    label: true,
    presentation: '正在加载....',
    isShow_03: false,
    multiArray: [
      ['广告', '传媒', '市场', '运营'],
      ['媒体投放', '品牌公关', '媒介经理']
    ],
    tag: [],
    userInfo: [],
    isShow_08: false,
    tag_list:[],
    listData_08: citys,
    picker_08_data: ['北京'],
    loadingHidden: false,
    isShow_09: false,
    defaultPickData_09: [{
      code: '110000'
    }, {
        code: '110100'
    }, {
        code: '110101'
    }],
    listData_09: citys,
    picker_09_data: ['北京'],
    isShow_02: false,
    ploform: [],
    isShow_03: false,
    tid_s: [],
    fans: [],
    message: [],
    check_tags:[],
    details: '',
    tag_all:[],
    type:'',
    editorHeight: 300,
    keyboardHeight: 0,
    url: app.globalData.url,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    const platform = wx.getSystemInfoSync().platform
    const isIOS = platform === 'ios'
    this.setData({ isIOS })
    const that = this
    this.updatePosition(0)
    let keyboardHeight = 0
    wx.onKeyboardHeightChange(res => {
      if (res.height === keyboardHeight) return
      const duration = res.height > 0 ? res.duration * 1000 : 0
      keyboardHeight = res.height
    })
  
    var message = JSON.parse(decodeURIComponent(options.message));

    console.log(message)

    var position = wx.getStorageSync('record').position  //职位(暂时未写)

    var tag = wx.getStorageSync('record').tages  //标签

    var ploform = wx.getStorageSync('record').ploform  //领域

    if (ploform){
      ploform.splice(0,1)
    }

    console.log(ploform)
    

    var fans = wx.getStorageSync('record').fans  //粉丝

    var check_tags = message.tags  //后台传的

    var tid_s = that.data.tid_s

    var tag_list = that.data.tag_list

    var tag_all = that.data.tag_all

    if (check_tags ==null || undefined){
        check_tags = [];
    }

    if (message.type == 2){
      
      for (var i = 0; i < tag.length; i++) {
        for (var j = 0; j < check_tags.length; j++) {
          if (tag[i]['id'] == check_tags[j]['id']) {
            tag[i]['check'] = 'check';
            tid_s.push(check_tags[j]['id']);
            tag_list.push(check_tags[j]['title'])
            tag_all.push(check_tags[j])
          }
        }
      }
    }


    that.setData({
      message: message,
      type: message.type,
      tag: tag,
      fans: fans,
      tag_list: tag_list,
      ploform: ploform,
    })
  
  },
/*
数据保存
*/
  formSubmit: function (e) {

  

    var that = this
    var type = that.data.type   //类型 
    var msg = e.detail.value    //根据类型 判断

    var phone =   msg['phone']
    var wx_name = msg['wx_name']

   


    // if (phone == undefined || phone == '') {
    //   wx.showToast({
    //     title: "手机号不能为空",
    //     icon: 'none',
    //     duration: 1200,
    //     mask: true
    //   });
    //   return false;
    // } 
    if (wx_name == undefined || wx_name == '') {
      wx.showToast({
        title: "微信号不能为空",
        icon: 'none',
        duration: 1200,
        mask: true
      });
      return false;
    }

    // if (email == undefined || email == '') {
    //   wx.showToast({
    //     title: "邮箱不能为空",
    //     icon: 'none',
    //     duration: 1200,
    //     mask: true
    //   });
    //   return false;
    // }

    if (type == 1) {
      
      msg.type = 1;
      material.saveData(msg, (data) => {

        var data = JSON.parse(data);
        console.log(data)

        if (data.code == 200) {
          //保存成功
          var that = this;
          let pages = getCurrentPages(); //页面栈
          let currPage = pages[pages.length - 2]; //当前页面

          //品牌
          msg.brand = msg.moc
          //公司
            msg.company = msg.compony
          //职位
          msg.position_code = msg.hangye
          //行业
          msg.industry = msg.position
          //无信号
          msg.wx_name = wx_name
          msg.status = 1

          currPage.setData({
              showList: true,
              counter_mark: 'HUB',
              column_title: '我发布的栏目',
              message: msg,
              follow_title: '关注的达人',
  
          })
          wx.navigateBack({
            delta: 1  // 返回上一级页面。
          })

        } else {
          console.log(data.data)
          wx.showToast({
            title: '请完善资料！',
            icon: 'none',
            duration: 1000,
            mask: true,
          })
     
        }
      })
    } else {

      var details = that.data.details  //简介

      msg.city = e.detail.value.kol_city
      msg.province = e.detail.value.kol_province
      msg.city_code = e.detail.value.kol_city_code
      msg.province_code = e.detail.value.kol_province_code
      msg.details = details
      var tid_s = this.data.tid_s
      var kol_territory = tid_s.join(',');

      msg.kol_territory = kol_territory
      msg.type = 2
      msg.status = 1
      msg.mcn_organization = msg.kol_mcn //机构
      msg.mcn_company = msg.kol_compony  //公司
      msg.fs_title = msg.kol_fsname  //粉丝
      msg.account = msg.kol_account  //账号
      msg.wx_name = msg.wx_name   //微信姓名
      //标签
      msg.tags = this.data.tag_all  //标签

      var tag_list = this.data.tag_list.join('#');
  
      msg.tag_list = tag_list  

      console.log(msg.tags)

   



      material.saveData(msg, (data) => {
      var data = JSON.parse(data);

      if (data.code == 200) {
        let pages = getCurrentPages(); //页面栈
        let currPage = pages[pages.length - 2]; //当前页面

        msg.profile = msg.details

        //保存成功
        currPage.setData({
          showList: true,
          counter_mark: 'KOL',
          column_title: '我报名的栏目',
          follow_title: '关注的栏目',
          message: msg,
          tag_list: tag_list
        })
        wx.navigateBack({
          delta: 1  // 返回上一级页面。
        })
     
        } else {

          console.log(data)

          wx.showToast({
            title: '请完善资料！',
            icon: 'none',
            duration: 1200,
            mask: true,
          })
        
        }
      })
    }
  },


  getPhoneNumber: function (e) {
    var that = this
    //获取用户手机号
    var errMsg = e.detail.errMsg
    var msg = e.detail
    wx.login({
      success: function (res) {
        msg.code = res.code
        if (errMsg == 'getPhoneNumber:ok') {
          material.getPhone(msg, (data) => {
            var data = JSON.parse(data);
            console.log(data)
            if (data.code == 201) {
              var data = JSON.parse(data.msg);
              that.setData({
                phoneNumber: data.phoneNumber
              })
            }
          })
        }
      }
    })
  },


  /*
     显示城市
  */
  showPicker_09: function () {
    this.setData({
      isShow_09: true
    })
  },
  showPicker_08: function () {

    this.setData({
      isShow_08: true
    })
  },
  sureCallBack_08(e) {

    this.setData({
      isShow_08: false,
      picker_08_data: e.detail.choosedData,
      picker_08_index: JSON.stringify(e.detail.choosedIndexArr)
    })
  },
  cancleCallBack_08() {
    this.setData({
      isShow_08: false,
    })
  },
  cancleCallBack_03() {
    this.setData({
      isShow_03: false,
    })
  },
  sureCallBack_09(e) {
    console.log(e.detail.choosedDat)
    this.setData({
      isShow_09: false,
      picker_09_data: e.detail.choosedData,
      picker_09_index: JSON.stringify(e.detail.choosedIndexArr)
    })
  },
  cancleCallBack_09() {
    this.setData({
      isShow_09: false,
    })
  },



  /*
   职位
  */
  bindMultiPickerChange: function (e) {
      this.setData({
      multiIndex: e.detail.value,
      position:false
      })
  },
  bindMultiPickerColumnChange: function (e) {
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    console.log(data)
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['市场推广', '产品推广', '新媒体推广'];
            break;
          case 1:
            data.multiArray[1] = ['电商传媒', '活动传媒', '网络传媒'];
            break;
          case 2:
            data.multiArray[1] = ['活动市场', '产品市场', '销售市场'];
            break;
          case 3:
            data.multiArray[1] = ['活动运营', '电商运营', '新媒体运营'];
            break;
        }
    }
    this.setData(data);
  },

/*
平台
*/
  showPicker_02: function (e) {

    this.setData({
      isShow_02: true
    })
  },

  cancleCallBack_02(e) {
    this.setData({
      isShow_02: false,
    })
  },
  sureCallBack_02(e) {
    let data = e.detail
    var listData_02 = this.data.listData_02
    console.log(e.detail.choosedIndexArr)
    
    

    this.setData({
      isShow_02: false,
      picker_02_data: e.detail.choosedData,
      picker_02_index: JSON.stringify(e.detail.choosedIndexArr),

    })
  },

  showPicker_03: function() {
    this.setData({
      isShow_03: true
    })
  },

 
  check: function (e) {
    var that = this
    var t_id = e.currentTarget.dataset.id
    var tags = this.data.tag
    var index = e.currentTarget.dataset.index
    var tid_s = that.data.tid_s;
    var chek = tags[index];
    var tag_list = that.data.tag_list;
    var tag_all = that.data.tag_all;


    if (chek['check'] == 'check') {
      chek['check'] = 'none'
      for (var i = 0; i < tid_s.length; i++) {
        if (tid_s[i] == t_id) {
       
          tid_s.splice(i, 1);
          tag_list.splice(i, 1);
          tag_all.splice(i,1)
        }
      }
      that.setData({
        tid_s: tid_s,
        tag_list: tag_list,
        tag_all: tag_all
      })
    } else {

      if (tid_s.length >= 3) {
        wx.showToast({
          title: "最多选择三个标签哦",
          icon: 'none',
          duration: 800,
          mask: true
        });
        return false;
      }

      chek['check'] = 'check'
      tag_list.push(chek.title);
      tid_s.push(t_id)
      tag_all.push(chek);

      console.log(tag_all)
      that.setData({
        tid_s: tid_s,
        tag_list: tag_list,
        tag_all: tag_all
      })
    }



      that.setData({
        tag: tags,
        tid_s: tid_s,
      })



  },

  /*
   粉丝量
  */
  bindCheckfollow(e) {
    var that = this

    that.setData({
      findex: e.detail.value
    })
  },

  bindCheckplatform(e){
    var that = this
    console.log(e)
    that.setData({
      pindex: e.detail.value
    })
  },
  
  sureCallBack_02(e) {
    let data = e.detail
    console.log(JSON.stringify(e.detail.choosedIndexArr))
    this.setData({
      isShow_02: false,
      picker_02_data: e.detail.choosedData,
      picker_02_index: JSON.stringify(e.detail.choosedIndexArr),

    })
  },

  cancleCallBack_02(e) {
    this.setData({
      isShow_02: false,
    })
  },



  /*
  文本组件
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
    console.log(123)
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
      var describe = that.data.message.profile

      console.log(describe)

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
    console.log(info)

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
      count: 9,
      success: function (res) {
        var image = res.tempFilePaths[0];
        var url = that.data.url

        wx.uploadFile({
          url: url + "/v1/alioss/index",
          filePath: image,
          name: 'file',
          header: {
            "Content-Type": "multipart/form-data",
            'accept': 'application/json'
          },
          success: function (res) {
            console.log(res.data)
            that.editorCtx.insertImage({
              src: res.data,
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
    var that = this
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              var userInfo = res.userInfo
    
              that.setData({
                userInfo: userInfo,
                isHide: false,
                loadingHidden: true,
                showDialog: true
              })
            }
          })
        } else {
          that.setData({
            isHide: true,
            loadingHidden: true
          })
        }
      }
    })

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